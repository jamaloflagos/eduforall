const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
/** 
 * Get all submissions
 * @route GET /api/submissions
*/
const getAllSubmissions = asyncHandler(async (req, res) => {
    const { assignment_id } = req.body
    const query = `SELECT u.firstname, u.lastname, s.* 
                    FROM submissions s
                    JOIN users u ON s.student_id = u.id
                    WHERE u.role = $1; 
                    AND s.assignment_id = $2;`
    const submissions = pool.query(query, ['student', assignment_id]);
    
    if (!submissions) {
        res.status(500).send(`Can't fetch submissions for this assignment`);
    }

    if (submissions.rows.length === 0) {
        res.status(400).send('No submission for this assignment yet');
    }

    res.status(200).json({submissions});
});

/** 
 * Get a single submission by ID
 * @route GET /api/submissions/:id
*/
const getSubmissionById = asyncHandler(async (req, res) => {
    const { submission_id } = req.params
    const student_id = req.user.id
    const submission = await pool.query('SELECT file_location FROM submissions WHERE submission_id = $1 ND student_id = $2', [submission_id, student_id]);
    if (!submission) {
        res.status(500).send(`Can't fetch the file for this submission`)
    }

    const file_location = submission.rows.file_location
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file_location
      };
      s3.getObject(params, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.attachment(file_location); 
        res.send(data.Body);      
    });
});

/** 
 * Create a single submission grade by ID
 * @route POST /api/submissions/:id/grade
*/
const postSubmissionGrade = asyncHandler(async (req, res) => {
    const { submission_id } = req.params
    const { grade, feedback, tutor_id } = req.body
    const query = `INSERT INTO grade (submission_id, tutor_id, grade, feedback) VALUES ($1, $2, $3, $4)`
    const createSubmissionGradeResult = await pool.query(query, [submission_id, tutor_id, grade, feedback]);

    if (!createSubmissionGradeResult) {
        res.status(500).send(`Couldn't succesfullly add grades`)
    }

    res.status(200).send('Successfully graded')
});

module.exports = {
    getAllSubmissions,
    getSubmissionById,
    postSubmissionGrade
}