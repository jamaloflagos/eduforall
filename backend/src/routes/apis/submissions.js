const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const {
    getAllSubmissions,
    getSubmissionById,
    postSubmissionGrade
    } = require('../../controllers/submissionsController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .get(getAllSubmissions);

router.route('/:id')
    .get(getSubmissionById);

router.route('/:id/grade')
    .post(postSubmissionGrade);

module.exports = router