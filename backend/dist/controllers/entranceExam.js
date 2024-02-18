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
const { getEntranceExam } = require('../db/queries');
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
    // get the score and percentage
    // send it with email
}));
module.exports = entranceExam;
