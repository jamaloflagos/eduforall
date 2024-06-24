const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const verifyJWT = asyncHandler(async (req, res, next) => {
    const {authorization, role} = req.headers
    if (role === 'tutor') {
        next();
        return; 
    }
    
    if(!authorization) {
        return res.status(400).json({message: 'You are not authorised'});
    }

    const token = authorization.split(" ")[1];
   
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            console.log(err) 
            return res.status(403).json({message: 'Authentication failed'})
        }
        const {id, role} = decoded
        req.user_id = id
        req.user_role = role
        next();
    })
});

module.exports = verifyJWT