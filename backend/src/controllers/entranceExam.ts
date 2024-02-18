const pool = require('../db/postgres');
const asyncHandler = require('express-async-handler');
const { getEntranceExam } = require('../db/queries');

const entranceExam = asyncHandler(async (req: any, res: any) => {
    const { email } = req.params;
    console.log(email, 'entrance exam')
    const entranceExamQuestions = await pool.query(getEntranceExam);
    console.log(entranceExamQuestions.rows)

    if (entranceExamQuestions.rows.length > 0) {
        res.render('entrance-exam', { questions: entranceExamQuestions.rows, email });
    } else {
        res.status(500).send('Internal server error');
    }  
});

const gradeEntranceExam = asyncHandler(async (req: any, res: any) => {
    // get the score and percentage
    // send it with email



});

module.exports = entranceExam