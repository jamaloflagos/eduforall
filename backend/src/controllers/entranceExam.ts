const pool = require('../db/postgres');
const asyncHandler = require('express-async-handler');
const sendMail = require('../email');
const { getEntranceExam, getEntranceExamAnswers } = require('../db/queries');

interface mailOptionType {
    from: string,
    to: string,
    subject: string | string[],
    text: string
}

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
    const { email, answers } = req.body;
    if (!email || !answers) {
        return res.sendStatus(404);
    }
    const entranceExamAnswers = await pool.query(getEntranceExamAnswers);
    if (entranceExamAnswers.rows.length > 0) {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
            for (let j = 0; j < entranceExamAnswers.rows.length; j++) {
                if (answers[i].id === Number(entranceExamAnswers.rows[j].id)) {
                    if (answers[i].selectedAnswer === entranceExamAnswers.rows[j].correct_option) {
                        score++;
                    };
                }; 
            };
        };
        const percentage = (score / entranceExamAnswers.rows.length) * 100;
        console.log(percentage);
        const mailOptions: mailOptionType = {
            from: 'toyinjamal@gmail.com',
            to: email,
            subject: 'Update on your entrance exam',
            text: ``
        };
        if (percentage >= 70) {
            mailOptions.text = `Congratulations, you scored ${score}/${entranceExamAnswers.rows.length} which is ${percentage}%, the required cut off mark.`
        } else {
            mailOptions.text = `Sorry, you scored ${score}/${entranceExamAnswers.rows.length} which is ${percentage}%, it doesn't meet the required cut off mark.`
        }

        await sendMail(mailOptions);
        res.send('You have successfully submitted your answers');
    } 
});

module.exports = { entranceExam, gradeEntranceExam }