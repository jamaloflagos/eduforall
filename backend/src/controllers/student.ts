const pool = require('../db/postgres');
const { register, checkExistingEmail } = require('../db/queries');
const asyncHandler = require('express-async-handler'); 
const sendMail = require('../email');
const entranceExamURL = 'http://localhost:4000/api/v1/entrance-exam'

interface mailOptionType {
    from: string,
    to: string,
    subject: string | string[],
    text: string
}

const registerStudent = asyncHandler( async (req: any, res: any) => {
    console.log('register student recieved', __dirname);
    const { first_name, middle_name, last_name, gender, DOB, email } = req.body;
    
    if (!first_name || !middle_name || !last_name || !gender || !DOB || !email) {
        return res.status(400).send('All input fields required!');
    };

    const existingEmail = await pool.query(checkExistingEmail, [email]);
    if (existingEmail) {
        if (existingEmail.rows.length > 0 && existingEmail.rows[0].email === email) {
            return res.status(400).send('Email already exists');
        }
    } else {
        return res.status(500).send('Internal server error');
    }

    const registerStudentResult = await pool.query(register, [first_name, middle_name, last_name, gender, DOB, email]);
    
    if (registerStudentResult) {
        const mailOptions: mailOptionType = {
            from: 'toyinjamal@gmail.com',
            to: email,
            subject: 'Successful registration',
            text: `Plaese take your entrance exam using this link: ${entranceExamURL}`
        };

        await sendMail(mailOptions);
        res.status(201).send('Student registered succesfully');
    } else {
        res.status(500).send('Registration failed');
    }

});

module.exports = registerStudent