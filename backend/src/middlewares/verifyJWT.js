const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const verifyJWT = asyncHandler(async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization) {
        res.status(400).send('You are not authorised');
    }

    const token = authorization.split(" ")[1]
    jwt.verify(token, process.env, (err, decoded) => {
        if(err) return res.status(403).send('Authentication failed')
        const {id, role} = decoded
        req.user_id = id
        req.user_role = role
        next()
    })
});

module.exports = verifyJWT