const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const {
    getAllGrades,
    getGradeById 
    } = require('../../controllers/gradesController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .get(getAllGrades)

router.route('/:id')
    .get(getGradeById)

module.exports = router
