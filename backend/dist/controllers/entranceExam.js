"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require('../db/postgres');
const asyncHandler = require('express-async-handler');
const sendMail = require('../email');
const { getEntranceExam, getEntranceExamAnswers } = require('../db/queries');
const entranceExam = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    console.log(email, 'entrance exam');
    const entranceExamQuestions = yield pool.query(getEntranceExam);
    console.log(entranceExamQuestions.rows);
    if (entranceExamQuestions.rows.length > 0) {
        res.render('entrance-exam', { questions: entranceExamQuestions.rows, email });
    }
    else {
        res.status(500).send('Internal server error');
    }
}));
const gradeEntranceExam = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, answers } = req.body;
    if (!email || !answers) {
        return res.sendStatus(404);
    }
    const entranceExamAnswers = yield pool.query(getEntranceExamAnswers);
    if (entranceExamAnswers.rows.length > 0) {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
            for (let j = 0; j < entranceExamAnswers.rows.length; j++) {
                if (answers[i].id === Number(entranceExamAnswers.rows[j].id)) {
                    if (answers[i].selectedAnswer === entranceExamAnswers.rows[j].correct_option) {
                        score++;
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        const percentage = (score / entranceExamAnswers.rows.length) * 100;
        console.log(percentage);
        const mailOptions = {
            from: 'toyinjamal@gmail.com',
            to: email,
            subject: 'Update on your entrance exam',
            text: ``
        };
        if (percentage >= 70) {
            mailOptions.text = `Congratulations, you scored ${score}/${entranceExamAnswers.rows.length} which is ${percentage}%, the required cut off mark.`;
        }
        else {
            mailOptions.text = `Sorry, you scored ${score}/${entranceExamAnswers.rows.length} which is ${percentage}%, it doesn't meet the required cut off mark.`;
        }
        yield sendMail(mailOptions);
        res.send('You have successfully submitted your answers');
    }
}));
module.exports = { entranceExam, gradeEntranceExam };
