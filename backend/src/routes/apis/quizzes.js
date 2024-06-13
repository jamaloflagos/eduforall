const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const {
    createQuiz,
    getQuizById,
    deleteQuiz,
    updateQuiz,
    submitQuizAnswer
    } = require('../../controllers/quizzesController');
    
const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .post(createQuiz)

router.route('/:id')
    .get(getQuizById)
    .put(updateQuiz)
    .delete(deleteQuiz)

router.route('/:id/submit')
    post(submitQuizAnswer)

module.exports = router
