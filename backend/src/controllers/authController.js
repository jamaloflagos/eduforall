const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const pool = require('../db/postgres');

const generateJWT = (payload) => {
    jwt.sign(payload, process.env.SECRET, {expiresIn: '15m'}, (err, token) => {

    })
}

/** 
 * Create a new user
 * @route POST /api/auth/register
*/ 
const register = asyncHandler(async (req, res) => {
    let profile_picture_location = null
    const { 
        email, password, role, firstname, lastname, middlename, location
    } = req.body
    if(req.file) {
        profile_picture_location = req.file.location
    }
    const values = [
        email, password, role, firstname, lastname, middlename, profile_picture_location, location
    ];
    const query = `INSERT INTO users (email, password, role, firstname, lastname, middlename, profile_picture_location, location) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    if (!firstname || !lastname || !email || !password || !role) {
        return res.status(400).json({error: 'All input fields required!'});
    }
    const existingEmail = await pool.query(checkExistingEmail, [email]);
    if (existingEmail) {
        if (existingEmail.rows.length > 0 && existingEmail.rows[0].email === email) {
            console.log(existingEmail);
            return res.status(400).json({error: 'Email already exists, try another username!'});
        } else {
            const createUserResult = await pool.query(query, values); 
            if (createUserResult){
                return res.send('You have succesfully registered!')
            } else {
                return res.status(500).json({error: 'You are not succesfully registered, try again later'});
            }
        }
    } else {
        return res.status(500).json({error: 'You are not succesfully registered, try again later'});
    }

});

/** 
 * Authenticate a user
 * @route POST /api/auth/login
*/
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body 
    if (!email || !password) {
        return res.status(400).json({error: 'Enter all credentials'})
    }
    if(!validator.validate(email)) {
        return res.status(400).json({error: 'Enter a valid email'})
    } 
    const userExists = await pool.query('SELECT email, password, id, role, firstname FROM users WHERE email = $1', [email])
    if (userExists && userExists.rows.length > 0) {
        const userPassword = userExists.rows.password
        if (userPassword === password) {
            const payload = {
                id: userExists.rows,
                role: userExists.rows.role,
                user_name: userExists.rows.firstname
            }
            jwt.sign(payload, process.env.SECRET, {expiresIn: '15m'}, (err, token) => {
                if (err) return res.status(500).json({error: 'Login failed'});
                
                jwt.sign(payload, process.env.SECRET, {expiresIn: '60m'}, (err, token) => {
                    if (err) return res.status(500).json({error: 'Login failed'});
                    res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
                });

                res.status(200).json({accessToken: token});
            })
        } else {
            res.status(401).json({error: 'Incorrect password!'})
        }
    } else {
        res.status(404).json({error: 'You are not registerd go ahead and register'})
    }


});

const refreshToken = async(req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    

    if (!cookies && !cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) return res.sendStatus(403)

            const foundUser = pool.query('SELECT * FROM users WHERE id = $1', [decoded.id])

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