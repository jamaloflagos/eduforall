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
 * Create a new lesson
 * @route POST /api/lessons
*/
const createLesson = asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    
    const { title, week, objectives} = req.body
    const uploadedFiles = req.files;
    let content_location = null;
    let js_location = null;
    let css_location = null;
    let content_type = null

    uploadedFiles.forEach(file => {
        const fileType = file.contentType.split('/')[0];
        const fileLocation = file.location; 

        if (fileType === 'text' && file.contentType.includes('html')) {
            content_location = fileLocation;
            content_type = file.contentType
        } else if (fileType === 'application' && file.contentType.includes('javascript')) {
            js_location = fileLocation;
        } else if (fileType === 'text' && file.contentType.includes('css')) {
            css_location = fileLocation;
        }
    });

    if (!content_location) {
        return res.status(400).send('HTML file is required!');
    }

    const query = `INSERT INTO lessons (title, content_type, week, content_location, js_location, css_loaction) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
    const value = [title, content_type, week, content_location, js_location, css_location]
    const createLessonResult = await pool.query(query, value);
    if (createLessonResult) {
        const query = `INSERT INTO objectives VALUES (lesson_id, description) VALUES ($1, $2)`
        const createObjectivesResult = await pool.query(query, [createLessonResult.id, objectives]);

        if (createObjectivesResult) {
            res.status(200).json({message: 'Lesson uploaded succesfully'});
        }
    }
});

/** 
 * Get all lessons
 * @route GET /api/lessons
*/
const getAllLessons = asyncHandler(async (req, res) => {
    const allLessons = await pool.query('SELECT title, id, week FROM lessons')

    if (allLessons.rows.length === 0) {
        return res.status(204).json({message: 'No lessons available'});
    }

    res.status(200).json({lessons: allLessons.rows});
});

/** 
 * Create a single lesson by ID
 * @route GET /api/lessons/:id
*/
const getLessonById = asyncHandler(async (req, res) => {
    const { lesson_id } = req.params
    const result = await pool.query('SELECT content_location, js_location, css_location FROM lessons WHERE id = $1', [lesson_id]);

    if (result.rows.length === 0) {
        return res.status(404).json({message: 'Lesson not found'});
    }
    const { content_location, js_location, css_location } = result.rows[0];

    const filePromises = [
        s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: content_location }).promise(),
        s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: js_location }).promise(),
        s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: css_location }).promise()
    ];

    const [htmlData, jsData, cssData] = await Promise.all(filePromises);
    
    const combinedContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Lesson Content</title>
        <style>${cssData.Body.toString()}</style>
    </head>
    <body>
        ${htmlData.Body.toString()}
        <script>${jsData.Body.toString()}</script>
    </body>
    </html>
`;

    res.set('Content-Type', 'text/html');
    res.send(combinedContent);
});

/** 
 * Get a lesson objectives by its ID
 * @route GET /api/lessons/:id/objectives
*/
const getLessonObjectivesById = asyncHandler(async (req, res) => {
    const { lesson_id } = req.params
    const objectives = await pool.query('SELECT description FROM objectives WHERE id = $1', [lesson_id]);

    if (!objectives) {
        return res.status(500).send(`Can't get objectives`)
    }

    if (objectives.rows.description.length === 0) {
        return res.status(404).send('No objectives for this content')
    } 

    res.status(200).json({objectives: objectives.rows})    
});


/** 
 * Delete a single lesson by ID
 * @route DELETE /api/lessons/:id
*/
const deleteLesson = asyncHandler(async (req, res) => {

});

/** 
 * Update a single lesson by ID
 * @route PUT /api/lessons/:id
*/
const updateLesson = asyncHandler(async (req, res) => {

});

module.exports = {
    createLesson,
    getAllLessons,
    deleteLesson,
    updateLesson,
    getLessonById,
    getLessonObjectivesById
}