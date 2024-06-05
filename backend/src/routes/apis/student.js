const express = require('express');
const router = express.Router();
const { registerStudent, registerStudentPage } = require('../../controllers/student');

router.route('/register')
    .post(registerStudent) //register a student
    .get(registerStudentPage) // get register student page

router.route('/:id')
    .get() // get a single student by Id
    .patch() //update a student info
    .delete() // delete a student

module.exports = router