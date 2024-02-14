"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const registerStudent = require('../../controllers/student');
router.route('/')
    .post(registerStudent) //register a student
    .get(); // get all the students
router.route('/:id')
    .get() // get a single student by Id
    .patch() //update a student info
    .delete(); // delete a student
module.exports = router;
