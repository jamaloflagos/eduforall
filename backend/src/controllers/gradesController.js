const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres')

/** 
 * Create a new user
 * @route GET /api/grades
*/
const getAllGrades = asyncHandler(async (req, res) => {
    const {student_id} = req.body
    const query = `SELECT g.grade, g.feedback, g.submission_id, s.assignment_id, a.description
                    FROM grades_feedback g
                    JOIN submissions s ON g.submission_id = s.id
                    JOIN assignments a ON s.assignment_id = a.id  
                    WHERE s.student_id = $1`
    const grades = await pool.query(query, [student_id]);
    console.log(grades)
    if (!grades) {
        return res.status(500).json({message: `Cannot fetch grades`});
    }

    if (grades.rows.length === 0) {
        return res.status(204).json({messgae: 'No grades administered'});
    }
    console.log(grades.rows);
    

    res.status(200).json({grades: grades.rows});
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