const express = require('express');
const router = express.Router();
const entranceExam = require('../../controllers/entranceExam')

router.route('/')
    .get(entranceExam);

module.exports = router