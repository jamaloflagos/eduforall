const express = require('express');
const router = express.Router();
const {
    getAllSubmissions,
    getSubmissionById,
    postSubmissionGrade
} = require('../../controllers/submissionsController');

router.route('/')
    .get(getAllSubmissions);

router.route('/:id')
    .get(getSubmissionById);

router.route('/:id/grade')
    .post(postSubmissionGrade);

module.exports = router