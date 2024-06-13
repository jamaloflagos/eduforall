const asyncHandler = require('express-async-handler');

/** 
 * Create a new quiz
 * @route POST /api/quizzes
*/
const createQuiz = asyncHandler(async (req, res) => {

});

/** 
 * Get a single quiz by ID
 * @route GET /api/quizzes/:id
*/
const getQuizById = asyncHandler(async (req, res) => {

});

/** 
 * Delete a single quiz by ID
 * @route DELETE /api/quizzes/:id
*/
const deleteQuiz = asyncHandler(async (req, res) => {

});

/** 
 * Update a single quiz by ID
 * @route UPDATE /api/quizzes/:id
*/
const updateQuiz = asyncHandler(async (req, res) => {

});

/** 
 * Submit a single quiz answer by ID
 * @route POST /api/quizzes/:id/submit
*/
const submitQuizAnswer = asyncHandler(async (req, res) => {

});

module.exports = {
    createQuiz,
    getQuizById,
    deleteQuiz,
    updateQuiz,
    submitQuizAnswer
}