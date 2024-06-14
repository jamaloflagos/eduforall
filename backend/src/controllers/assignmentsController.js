const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');

/** 
 * Create a new assignment
 * @route POST /api/assignments
*/ 
const createAssignment = asyncHandler(async (req, res) => {
    const { lesson_id, description, due_date } = req.body
    if (!lesson_id || !description || !due_date) {
        return res.status(400).send('All input field required');
    }

    const query = `INSERT INTO assignments (lesson_id, description, due_date) VALUES ($1, $2, $3)`
    const createAssignmentResult = await pool.query(query, [lesson_id, description, due_date]);

    if (!createAssignmentResult) {
        res.status(500).send('Assignment not created succesfully');
    }

    res.status(200).send('Assignment created succesfully');

});

/** 
 * Get all assignment
 * @route GET /api/assignments
*/ 

const getAllAssignments = asyncHandler(async (req, res) => {
    const assignments = await pool.query('SELECT * FROM assignmnets');
    if (!assignments) {
        return res.status(500).send(`Can't fetch assignment at this moment`);
    }

    if (assignments.rows.length === 0) {
        return res.status(400).send('No assignments')
    }

    res.status(200).json({assignments})
});

/** 
 * Get a single assignment by lesson ID
 * @route GET /api/assignments/:id
*/ 
const getAssignmentById = asyncHandler(async (req, res) => {
    const { lesson_id } = req.params 
    const assignment = await pool.query('SELECT * FROM assignments WHERE lesson_id = $1', [lesson_id]);
    if (!assignment) {
        res.status(500).send(`Can't fetch assignment for this lesson`);
    }

    if (assignment.rows.length === 0) {
        res.status(404).send('No assignment for this lesson')
    }

    res.status(200).json({assignment: assignment.rows.description})
});

/** 
 * Delete an single assignment by ID
 * @route DELETE /api/assignments/:id
*/ 
const deleteAssignment = asyncHandler(async (req, res) => {

});

/** 
 * Update an single assignment by ID
 * @route PUT /api/assignments/:id
*/ 
const updateAssignment = asyncHandler(async (req, res) => {

});

/** 
 * Submit an assignment answer
 * @route POST /api/assignments/:id/submit
*/ 
const submitAssignment = asyncHandler(async (req, res) => {
    const { assignment_id } = req.params
    const student_id = req.user.id
    const { size, key, contentType, location } = req.file
    const query = `INSERT INTO submissions (student_id, assignment_id, file_name, file_type, file_size, file_location)
    VALUES ($1, $2, $3, $4, $5, $6)`
    const values = [student_id, assignment_id, key, contentType,size, location]
    const submitAssignmentResult = await pool.query(query, values);

    if (!submitAssignmentResult) {
        return res.status(500).send('Assignment not submitted succesfully try again');
    }

    res.status(200).send('Assignment submitted successfully')
});

module.exports = {
    createAssignment,
    getAssignmentById,
    getAllAssignments,
    deleteAssignment,
    updateAssignment,
    submitAssignment
}