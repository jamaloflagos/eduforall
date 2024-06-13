const express = require('express');
const router = express.Router();
const {
    getAllGrades,
    getGradeById 
} = require('../../controllers/gradesController');

router.route('/')
    .get(getAllGrades)

router.route('/:id')
    .get(getGradeById)

module.exports = router
