const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');

function calculateScore(questions, selectedAnswers) {
    let score = 0;
    const questionFeedback = []; // Array to store feedback for each question
  
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const selectedOption = selectedAnswers[i];
  
      if (selectedOption !== null && selectedOption === question.answer) {
        score++;
        questionFeedback.push({ question: question.question, correct: true }); // Correct
      } else {
        questionFeedback.push({ question: question.question, correct: false, correctAnswerIndex: question.answer }); // Incorrect
      }
    }
  
    return {
      score,
      totalQuestions: questions.length,
      questionFeedback
    };
  }
  

/** 
 * Create a new quiz
 * @route POST /api/quizzes
*/
const createQuiz = asyncHandler(async (req, res) => {
    const { lesson_id, questions } = req.body
    const quiz = JSON.stringify(Array.from(questions))
    const query = `INSERT INTO quizzes (lesson_id, questions) VALUES($1, $2) RETURNING *`
    const createQuizResult = await pool.query(query, [lesson_id, quiz]);  
    
    if (!createQuizResult) {
        return res.status(500).json({message: `Can't create quiz`});
    }

    res.status(200).json({message: 'Quiz created succesfully', lesson_id: lesson_id})
});

/** 
 * Get a single quiz by lesson ID
 * @route GET /api/quizzes/:id
*/
const getQuizById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const quiz = await pool.query(`SELECT * FROM quizzes WHERE lesson_id = $1`, [id]);
    if (!quiz) {
        res.status(500).json({message: `Can't fetch quiz`});
    }

    if (quiz.rows.length === 0) {
        res.status(400).json({message: 'No quiz for this lesson!'})
    }

    res.status(200).json({quiz_data: quiz.rows[0].questions})
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
    const { quiz_id } = req.params
    const { answers, lesson_id } = req.body

    if (!answers) {
        res.status(400).send('Please provide answers');
    }

    const query = `SELECT * FROM quizzes WHERE id = $1 AND lesson_id = $2`
    const questions = await pool.query(query, [quiz_id, lesson_id]);

    if (!questions || questions.rows.length === 0) {
        return res.status(500).send(`Can't process your answers at the moment, attempt quiz again`);
    }

    const { score, totalQuestions, questionFeedback } = calculateScore(questions, answers);
    if (score && totalQuestions && questionFeedback) {
        const text = `You score ${score}/${totalQuestions}`
        const feedback = questionFeedback
        res.status(200).json({text, feedback});
    }

});

module.exports = {
    createQuiz,
    getQuizById,
    deleteQuiz,
    updateQuiz,
    submitQuizAnswer
}