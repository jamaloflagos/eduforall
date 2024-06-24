const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const {
    getAllStudents,
    getStudentById,
    getStudentProfilePicture
    } = require('../../controllers/studentsController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .get(getAllStudents)

router.route('/:id')
    .get(getStudentById)

router.route('/:id/profile_picture')
    .get(getStudentProfilePicture)

module.exports = router