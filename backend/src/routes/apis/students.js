const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const {
    getAllStudents,
    getStudentById
    } = require('../../controllers/studentsController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .get(getAllStudents)

router.route('/:id')
    .get(getStudentById)

module.exports = router