const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: process.env.AWS_REGION });


/** 
 * Get all submissions by assignment ID
 * @route GET /api/submissions
*/
const getAllSubmissions = asyncHandler(async (req, res) => {
    const { assignment_id } = req.params
    const query = `SELECT u.firstname, u.lastname, s.* 
                    FROM submissions s
                    JOIN users u ON s.student_id = u.id
                    WHERE u.role = $1 
                    AND s.assignment_id = $2;`
    const submissions = await pool.query(query, ['student', assignment_id]);
    
    if (!submissions) {
        return res.status(500).json({message: `Can't fetch submissions for this assignment`});
    }

    if (submissions.rows.length === 0) {
        return res.sendStatus(204);
    }

    res.status(200).json({submissions: submissions.rows});
});

/** 
 * Get a single submission by ID and student ID
 * @route GET /api/submissions/:id
*/
const getSubmissionById = asyncHandler(async (req, res) => {
    const { submission_id, student_id } = req.params
    const submission = await pool.query('SELECT code_location FROM submissions WHERE id = $1 AND student_id = $2', [submission_id, student_id]);
    
    if (!submission) {
        return res.status(500).json({message: `Can't fetch the file for this submission`})
    }
    
    const file_location = submission.rows[0].code_location
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file_location
      };
    const command = new GetObjectCommand(params);
    const { Body, ContentType } = await s3Client.send(command);

    res.setHeader('Content-Type', ContentType);
    Body.pipe();
});

/** 
 * Create a single submission grade by ID
 * @route POST /api/submissions/:id/grade
*/
const postSubmissionGrade = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { grade, feedback, tutor_id } = req.body
    const query = `INSERT INTO grades_feedback (submission_id, tutor_id, grade, feedback) VALUES ($1, $2, $3, $4) RETURNING *`
    const createSubmissionGradeResult = await pool.query(query, [id, tutor_id, grade, feedback]);

    if (createSubmissionGradeResult.rows[0].submission_id === id) {
        return res.status(500).json({messgae: `You have graded this submission`});
    }

    if (!createSubmissionGradeResult) {
        return res.status(500).json({messgae: `Couldn't succesfullly add grades`});
    }

    res.status(200).json({messgae: 'Successfully graded'});
});

module.exports = {
    getAllSubmissions,
    getSubmissionById,
    postSubmissionGrade
}