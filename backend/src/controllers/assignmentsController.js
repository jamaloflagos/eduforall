const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');

/** 
 * Create a new assignment
 * @route POST /api/v1/assignments
*/ 
const createAssignment = asyncHandler(async (req, res) => {
    const { lesson_id, description, due_date } = req.body;
    console.log(lesson_id, description, due_date);
    if (!lesson_id || !description || !due_date) {
        return res.status(400).send('All input field required');
    }

    const query = `INSERT INTO assignments (lesson_id, description, due_date) VALUES ($1, $2, $3) RETURNING *`
    const createAssignmentResult = await pool.query(query, [lesson_id, description, due_date]);

    if (!createAssignmentResult) {
        res.status(500).send('Assignment not created succesfully');
    }

    res.status(200).json({message: 'Assignment created succesfully', lesson_id});

});

/** 
 * Get all assignment
 * @route GET /api/assignments
*/ 

const getAllAssignments = asyncHandler(async (req, res) => {
    const assignments = await pool.query('SELECT * FROM assignments');
    if (!assignments) {
        return res.status(500).send(`Can't fetch assignment at this moment`);
    }

    if (assignments.rows.length === 0) {
        return res.sendStatus(204);
    }

    res.status(200).json({assignments: assignments.rows});
});

/** 
 * Get a single assignment by lesson ID
 * @route GET /api/assignments/:id
*/ 
const getAssignmentById = asyncHandler(async (req, res) => {
    const { id } = req.params 
    const assignment = await pool.query('SELECT * FROM assignments WHERE lesson_id = $1', [id]);
    if (!assignment) {
        return res.status(500).json({message: `Can't fetch assignment for this lesson`});
    }

    if (assignment.rows.length === 0) {
       
        return res.sendStatus(204)
    }

    res.status(200).json({assignment: assignment.rows[0]});
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
    const { id } = req.params
    const student_id = req.user_id
    const { size, originalname, mimetype, key } = req.file
    const query = `INSERT INTO submissions (student_id, assignment_id, file_name, file_type, file_size, code_location)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING student_id, assignment_id`
    const values = [student_id, id, originalname, mimetype, size, key]
    const submitAssignmentResult = await pool.query(query, values);

    if (!submitAssignmentResult) {
        return res.status(500).send('Assignment not submitted succesfully try again');
    }

    res.status(200).send('Assignment submitted successfully')
});

/** 
 * Check if student have submit
 * @route POST /api/assignments/:id/submission-status
*/ 
const checkAssignmentSubmitted = asyncHandler(async (req, res) => {
    console.log('check recieved')
    const { id } = req.params;
    const student_id = req.user_id; // Assuming you have authentication middleware
    console.log(id)
          // Check if the user has submitted for this assignment
    const result = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM submissions WHERE assignment_id = $1 AND student_id = $2)',
        [id, student_id]
    );

    console.log(result);
    const hasSubmitted = result.rows[0].exists; // true or false
    console.log(hasSubmitted);
    if (hasSubmitted) {
        return res.status(200).json({ hasSubmitted });
    }

    if (!hasSubmitted) {
        console.log(hasSubmitted)
        return res.status(200).json({ hasSubmitted})
    }
      
    res.status(500).json({ message: 'Internal server error' });
      
});

module.exports = {
    createAssignment,
    getAssignmentById,
    getAllAssignments,
    deleteAssignment,
    updateAssignment,
    submitAssignment,
    checkAssignmentSubmitted
}