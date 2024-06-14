const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres')

/** 
 * Create a new user
 * @route GET /api/grades
*/
const getAllGrades = asyncHandler(async (req, res) => {
    const student_id = req.user.id
    const query = `SELECT g.grade, g.feedback, s.assignment_id, a.description
                    FROM grades g
                    JOIN submissions s ON g.submission_id = s.id
                    JOIN assignments a ON s.assignment_id = a.id  
                    WHERE s.student_id = $1`
    const grades = await pool.query(query, [student_id]);

    if (!grades) {
        res.status(500).send(`Cannot fetch grades`);
    }

    if (grades.rows.length === 0) {
        res.status(204).send('No grades administered')
    }

    res.status(200).json({grades})
});

/** 
 * Get a grade by ID
 * @route POST /api/grades/:id
*/
const getGradeById = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllGrades,
    getGradeById 
}