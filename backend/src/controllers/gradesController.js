const asyncHandler = require('express-async-handler');

/** 
 * Create a new user
 * @route GET /api/grades
*/
const getAllGrades = asyncHandler(async (req, res) => {

});

/** 
 * Get a grade by ID
 * @route POST /api/grades/:id
*/
const getGradeById = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllGrades,
    getGradeById 
}