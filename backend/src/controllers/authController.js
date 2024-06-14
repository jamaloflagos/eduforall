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
        return res.status(400).send('All input fields required!');
    }
    const existingEmail = await pool.query(checkExistingEmail, [email]);
    if (existingEmail) {
        if (existingEmail.rows.length > 0 && existingEmail.rows[0].email === email) {
            console.log(existingEmail);
            return res.status(400).send('Email already exists, try another username!');
        } else {
            const createUserResult = await pool.query(query, values); 
            if (createUserResult){
                return res.send('You have succesfully registered!')
            } else {
                return res.status(500).send('You are not succesfully registered, try again later');
            }
        }
    } else {
        return res.status(500).send('You are not succesfully registered, try again later');
    }

});

/** 
 * Authenticate a user
 * @route POST /api/auth/login
*/
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body 
    if (!email || !password) {
        return res.status(400).send('Enter all credentials')
    }
    if(!validator.validate(email)) {
        return res.status(400).send('Enter a valid email')
    } 
    const userExists = await pool.query('SELECT email, password, id, role, firstname FROM users WHERE email = $1', [email])
    if (userExists && userExists.rows.length > 0) {
        const userPassword = userExists.rows.password
        if (userPassword === password) {
            const payload = {
                id: userExists.rows,
                 role: userExists.rows.role
                }
            jwt.sign(payload, process.env.SECRET, {expiresIn: '15m'}, (err, token) => {
                if (err) return res.status(500).send('Login failed')
                res.status(200).json({token, username: userExists.rows.firstname})
            })
        } else {
            res.status(401).send('Incorrect password!')
        }
    } else {
        res.status(404).send('You are not registerd go ahead and register')
    }


});

module.exports = {
    register,
    login
}