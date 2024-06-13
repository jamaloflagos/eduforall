const asyncHandler = require('express-async-handler');

/** 
 * Create a new assignment
 * @route POST /api/assignments
*/ 
const createAssignment = asyncHandler(async (req, res) => {

});

/** 
 * Get a single assignment by ID
 * @route GET /api/assignments/:id
*/ 
const getAssignmentById = asyncHandler(async (req, res) => {

});

/** 
 * Delete an single assignment by ID
 * @route DELETE /api/assignments/:id
*/ 
const deleteAssignment = asyncHandler(async (req, res) => {

});

/** 
 * Update an single assignment by ID
 * @route PUT /api/assignments/:id
*/ 
const updateAssignment = asyncHandler(async (req, res) => {

});

/** 
 * Submit an assignment answer
 * @route POST /api/assignments/:id/submit
*/ 
const submitAssignment = asyncHandler(async (req, res) => {

});

module.exports = {
    createAssignment,
    getAssignmentById,
    deleteAssignment,
    updateAssignment,
    submitAssignment
}