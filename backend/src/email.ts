const nodemailer = require('nodemailer');
const logEvents = require('./middlewares/logger');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'toyinjamal@gmail.com',
        pass: 'ocfdxvqusxrzybyf'
    }
});

interface mailOptionType {
    from: string,
    to: string,
    subject: string | string[],
    text: string
}


const sendMail = (mailOptions: mailOptionType): void => {
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if (err) {
            logEvents(`Error occurred: ${err.message}`, 'sendEmailErr.txt');
            console.log('Error occurred:', err.message);
            return;
        }
        console.log('Email sent successfully:', info.messageId);
    })
}

module.exports = sendMail