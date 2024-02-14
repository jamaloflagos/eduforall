const pool = require('../db/postgres');
const register = require('../db/queries');
const asyncHandler = require('express-async-handler'); 
const registerStudent = asyncHandler( async (req: any, res: any) => {
    console.log('register student recieved', __dirname);
    const { first_name, middle_name, last_name, gender, DOB, class_id } = req.body;

    if (!first_name || !middle_name || !last_name || !gender || !DOB || !class_id) {
        return res.status(400).send('All input fields required!');
    };

    await pool.query(register, [first_name, middle_name, last_name, gender, DOB, class_id], (err: any, results: any) => {
        if (err) throw err;
        res.status(201).send('Student registered succesfully');
    });

});

module.exports = registerStudent