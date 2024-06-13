const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const {
    createAssignment,
    getAssignmentById,
    deleteAssignment,
    updateAssignment,
    submitAssignment
    } = require('../../controllers/assignmentsController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .post(createAssignment)

router.route('/:id')
    .get(getAssignmentById)
    .put(updateAssignment)
    .delete(deleteAssignment)

router.route('/:id/submit')
    .post(submitAssignment)

module.exports = router
