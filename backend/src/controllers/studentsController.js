const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');

/** 
 * Get all students
 * @route GET /api/students
*/
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await pool.query('SELECT * FROM users WHERE role = student');

    if (!students) {
        return res.status(500).json({message: `Can't get students!`})
    }

    if (students.rows.length === 0) {
        return res.status(404).json({message: 'No students have registered'})
    }

    res.status(200).json({students});
});

/** 
 * Get a single student by ID
 * @route GET /api/students/:id
*/
const getStudentById = asyncHandler(async (req, res) => {
    const student_id = req.user.id
    const student = await pool.query('SELECT * FROM users WHERE id = $1 AND role = student', [student_id]);

    if (!student) {
        return res.status(500).json({message: `Can't fetch student`});
    }

    res.status(200).json({student});

});

module.exports = {
    getAllStudents,
    getStudentById
}