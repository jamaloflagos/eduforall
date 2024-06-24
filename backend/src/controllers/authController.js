const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const pool = require('../db/postgres');


/** 
 * Create a new user
 * @route POST /api/auth/register
*/ 
const register = asyncHandler(async (req, res) => {
    console.log('create user requested');
    let profile_picture_location = null
    const { 
        email, password, role, firstname, lastname, middlename, location
    } = req.body

    if(req.file) {
        profile_picture_location = req.file.key
    }

    if (!firstname || !lastname || !email || !password || !role) {
        return res.status(400).json({message: 'All input fields required!'});
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({message: 'Enter a valid email'});
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({message: 'Enter a strong pass'});
    }

    const existingEmail = await pool.query('SELECT email from users WHERE email = $1', [email]);

    if (existingEmail) {
        if (existingEmail.rows.length > 0 && existingEmail.rows[0].email === email) {
            console.log(existingEmail);
            return res.status(400).json({message: 'Email already exists, try another username!'});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const values = [
                    email, hashedPassword, role, firstname, lastname, middlename, profile_picture_location, location
                ];
            const query = `INSERT INTO users (email, password, role, firstname, lastname, middlename, profile_picture_location, location) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

            const createUserResult = await pool.query(query, values); 
            // console.log(createUserResult);
            
            if (createUserResult){
                console.log("Logs after response sent");
                return res.json({message: 'You have succesfully registered!'})
            } else {
                return res.status(500).json({message: 'You are not succesfully registered, try again later'});
            }
        }
    } else {
        return res.status(500).json({message: 'You are not succesfully registered, try again later'});
    }

});

/** 
 * Authenticate a user
 * @route POST /api/auth/login
*/
const login = asyncHandler(async (req, res) => {
    console.log('login recieved');
    const {email, password} = req.body 
    if (!email || !password) {
        return res.status(400).json({error: 'Enter all credentials'})
    }
    if(!validator.isEmail(email)) {
        return res.status(400).json({error: 'Enter a valid email'})
    } 

    const userExists = await pool.query('SELECT email, password, id, role, firstname FROM users WHERE email = $1', [email]);
    
    if (userExists && userExists.rows.length > 0) {
        const user = userExists.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({message: 'Incorrect password!'});
        }

        const payload = {
            id: user.id,
            role: user.role,
            user_name: user.firstname
         }

        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,  (err, token) => {
            if (err) return res.status(500).json({message: 'Login failed'});
            res.status(200).json({accessToken: token});
        });
    } else {
        console.log('not found');
        res.status(404).json({message: 'You are not registerd go ahead and register'});
    }

});

const refreshToken = async(req, res) => {
    const cookies = req.cookies;
    console.log('refesh: ', cookies);

    if (!cookies && !cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) return res.sendStatus(403)

            const foundUser = pool.query('SELECT id FROM users WHERE id = $1', [decoded.id])

            if(!foundUser) return refreshToken.sendStatus(401);

            const payload = {
                id: foundUser.id,
                role: foundUser.role,
                user_name: userExists.rows.firstname
            }

            jwt.sign(payload, process.env.SECRET, {expiresIn: '15m'}, (err, token) => {
                res.json({token});
            });

    })
}

const logout = (req, res) => {
    const cookies = req.cookies

    if (!cookies && !cookies.jwt) return res.sendStatus(204);

    res.clearCokkies("jwt", {httpOnly: true, sameSite: "None", secure: true});
    res.json();

}

module.exports = {
    register,
    login,
    refreshToken,
    logout
}