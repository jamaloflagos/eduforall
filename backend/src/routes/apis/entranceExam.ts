const express = require('express');
const router = express.Router();
const { entranceExam, gradeEntranceExam } = require('../../controllers/entranceExam')

router.route('/:email')
    .get(entranceExam);
router.route('/')
    .post(gradeEntranceExam);
module.exports = router