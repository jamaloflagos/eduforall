const express = require('express');
const router = express.Router();
const { registerStudent, registerStudentPage } = require('../../controllers/student');

router.route('/')
    .get(); // get students

router.route('/:id')
    .get(); 
    

module.exports = router