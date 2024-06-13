const asyncHandler = require('express-async-handler');

/** 
 * Get all submissions
 * @route GET /api/submissions
*/
const getAllSubmissions = asyncHandler(async (req, res) => {

});

/** 
 * Get a single submission by ID
 * @route GET /api/submissions/:id
*/
const getSubmissionById = asyncHandler(async (req, res) => {

});

/** 
 * Create a single submission grade by ID
 * @route POST /api/submissions/:id/grade
*/
const postSubmissionGrade = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllSubmissions,
    getSubmissionById,
    postSubmissionGrade
}