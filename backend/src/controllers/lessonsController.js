const asyncHandler = require('express-async-handler');

/** 
 * Create a new lesson
 * @route POST /api/lessons
*/
const createLesson = asyncHandler(async (req, res) => {

});

/** 
 * Get all lessons
 * @route GET /api/lessons
*/
const getAllLessons = asyncHandler(async (req, res) => {

});

/** 
 * Create a single lesson by ID
 * @route GET /api/lessons/:id
*/
const getLessonById = asyncHandler(async (req, res) => {

});

/** 
 * Delete a single lesson by ID
 * @route DELETE /api/lessons/:id
*/
const deleteLesson = asyncHandler(async (req, res) => {

});

/** 
 * Update a single lesson by ID
 * @route PUT /api/lessons/:id
*/
const updateLesson = asyncHandler(async (req, res) => {

});

module.exports = {
    createLesson,
    getAllLessons,
    deleteLesson,
    updateLesson,
    getLessonById
}