const express = require('express');
const router = express.Router();
const {
    createAssignment,
    getAssignmentById,
    deleteAssignment,
    updateAssignment,
    submitAssignment
} = require('../../controllers/assignmentsController');

router.route('/')
    .post(createAssignment)

router.route('/:id')
    .get(getAssignmentById)
    .put(updateAssignment)
    .delete(deleteAssignment)

router.route('/:id/submit')
    .post(submitAssignment)

module.exports = router
