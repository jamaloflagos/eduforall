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
const { register, checkExistingEmail } = require('../db/queries');
const asyncHandler = require('express-async-handler');
const sendMail = require('../email');
const entranceExamURL = 'http://localhost:4000/api/v1/entrance-exam';
const registerStudent = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register student recieved', __dirname);
    const { first_name, middle_name, last_name, gender, DOB, email } = req.body;
    if (!first_name || !middle_name || !last_name || !gender || !DOB || !email) {
        return res.status(400).send('All input fields required!');
    }
    ;
    const existingEmail = yield pool.query(checkExistingEmail, [email]);
    if (existingEmail) {
        if (existingEmail.rows.length > 0 && existingEmail.rows[0].email === email) {
            return res.status(400).send('Email already exists');
        }
    }
    else {
        return res.status(500).send('Internal server error');
    }
    const registerStudentResult = yield pool.query(register, [first_name, middle_name, last_name, gender, DOB, email]);
    if (registerStudentResult) {
        const mailOptions = {
            from: 'toyinjamal@gmail.com',
            to: email,
            subject: 'Successful registration',
            text: `Plaese take your entrance exam using this link: ${entranceExamURL}`
        };
        yield sendMail(mailOptions);
        res.status(201).send('Student registered succesfully');
    }
    else {
        res.status(500).send('Registration failed');
    }
}));
module.exports = registerStudent;
