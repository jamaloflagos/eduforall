const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');
const {
    S3,
} = require('@aws-sdk/client-s3');

const s3 = new S3({
    region: process.env.AWS_REGION,
});

/** 
 * Get all students
 * @route GET /api/students
*/
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await pool.query('SELECT email, firstname, lastname FROM users WHERE role = $1', ['student']);

    if (!students) {
        return res.status(500).json({message: `Can't get students!`})
    }

    if (students.rows.length === 0) {
        return res.status(404).json({message: 'No students have registered'})
    }

    res.status(200).json({students: students.rows});
});

/** 
 * Get a single student by ID
 * @route GET /api/students/:id
*/
const getStudentById = asyncHandler(async (req, res) => {
    // const student_id = req.user.id
    const { id } = req.params
    const student = await pool.query('SELECT * FROM users WHERE id = $1 AND role = $2', [id, 'student']);

    if (!student) {
        return res.status(500).json({message: `Can't fetch student`});
    }

    res.status(200).json({student: student.rows[0]});

});

const getStudentProfilePicture = asyncHandler(async (req, res) => {
    console.log('gotten')
    const { id } = req.params
    const studentProfilePicture = await pool.query('SELECT profile_picture_location FROM users WHERE id = $1 AND role = $2', [id, 'student']);

    if (!studentProfilePicture) {
        return res.status(500).json({message: `Error fetching your profile picture`});
    }

    if (studentProfilePicture && studentProfilePicture.rows[0].profile_picture_location === null) {
        return res.status(500).json({message: `You did not upload a picture`});
    }
  
    const profile_picture = studentProfilePicture.rows[0].profile_picture_location
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: profile_picture
    };
    const command = new GetObjectCommand(params);
    const { Body, ContentType } = await s3Client.send(command);

    res.setHeader('Content-Type', ContentType);
    Body.pipe(res);
})

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentProfilePicture
}