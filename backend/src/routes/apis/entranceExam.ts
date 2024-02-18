const express = require('express');
const router = express.Router();
const entranceExam = require('../../controllers/entranceExam')

router.route('/:email')
    .get(entranceExam);

module.exports = router