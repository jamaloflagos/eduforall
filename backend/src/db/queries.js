const register = 'INSERT INTO newstudent (first_name, middle_name, last_name, gender, date_of_birth, email) VALUES ($1, $2, $3, $4, $5, $6)';
const getEntranceExam = 'SELECT * FROM entranceexam';
const getEntranceExamAnswers = 'SELECT id, correct_option FROM entranceexam';
const checkExistingEmail = 'SELECT email from newstudent WHERE email = $1';

module.exports = { register, getEntranceExam, checkExistingEmail, getEntranceExamAnswers };  