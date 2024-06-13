const asyncHandler = require('express-async-handler');

/** 
 * Create a new user
 * @route POST /api/auth/register
*/ 
const register = asyncHandler(async (req, res) => {

});

/** 
 * Authenticate a user
 * @route POST /api/auth/login
*/
const login = asyncHandler(async (req, res) => {

});

module.exports = {
    register,
    login
}