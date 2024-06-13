const express = require('express');
const router = express.Router();
const {
    createQuiz,
    getQuizById,
    deleteQuiz,
    updateQuiz,
    submitQuizAnswer
} = require('../../controllers/quizzesController');

router.route('/')
    .post(createQuiz)

router.route('/:id')
    .get(getQuizById)
    .put(updateQuiz)
    .delete(deleteQuiz)

router.route('/:id/submit')
    post(submitQuizAnswer)

module.exports = router
