const asyncHandler = require('express-async-handler');

/** 
 * Get all students
 * @route GET /api/students
*/
const getAllStudents = asyncHandler(async (req, res) => {

});

/** 
 * Get a single student by ID
 * @route GET /api/quizzes/:id
*/
const getStudentById = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllStudents,
    getStudentById
}