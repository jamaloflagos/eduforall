const express = require('express');
const router = express.Router();
const {
    getAllStudents,
    getStudentById
} = require('../../controllers/studentsController')

router.route('/')
    .get(getAllStudents)

router.route('/:id')
    .get(getStudentById)

module.exports = router