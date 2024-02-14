"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const logEvents = require('./middlewares/logger');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'toyinjamal@gmail.com',
        pass: 'ocfdxvqusxrzybyf'
    }
});
const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logEvents(`Error occurred: ${err.message}`, 'sendEmailErr.txt');
            console.log('Error occurred:', err.message);
            return;
        }
        console.log('Email sent successfully:', info.messageId);
    });
};
module.exports = sendMail;
