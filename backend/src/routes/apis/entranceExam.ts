const express = require('express');
const router = express.Router();
const entranceExam = require('../../controllers/entranceExam')

router.route('/entrance-exam')
    .get(entranceExam);

module.exports = router