const asyncHandler = require('express-async-handler');
const pool = require('../db/postgres');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: process.env.AWS_REGION });
/** 
 * Create a new lesson
 * @route POST /api/lessons
*/
const createLesson = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files uploaded.');
    }

    const { title, objectives} = req.body
    const {key, mimetype} = req.file;
    const query = `INSERT INTO lessons (title, content_type, content_location) 
    VALUES ($1, $2, $3) RETURNING *`
    const value = [title, mimetype, key]
    const createLessonResult = await pool.query(query, value);
    if (createLessonResult) {
        const query = `INSERT INTO objectives (lesson_id, description) VALUES ($1, $2) RETURNING *`
        const createObjectivesResult = await pool.query(query, [createLessonResult.rows[0].id, JSON.parse(objectives)]);
        console.log('created objectives: ', createObjectivesResult);
        
        if (createObjectivesResult) {
            res.status(200).json({message: 'Lesson uploaded succesfully', lesson_id: createLessonResult.rows[0].id});
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
    const { id } = req.params
    const result = await pool.query('SELECT content_location FROM lessons WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({message: 'Lesson not found'});
    }

    const { content_location } = result.rows[0];
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: content_location 
    };

    const command = new GetObjectCommand(params);
    const { Body, ContentType } = await s3Client.send(command);

    res.setHeader('Content-Type', ContentType);
    Body.pipe(res);
});

/** 
 * Get a lesson objectives by its ID
 * @route GET /api/lessons/:id/objectives
*/
const getLessonObjectivesById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const objectives = await pool.query('SELECT description FROM objectives WHERE lesson_id = $1', [id]);
    console.log('objectives: ', objectives.rows[0].description);
    if (!objectives) {
        return res.status(500).send(`Can't get objectives`)
    }

    if (objectives.rows[0].description.length === 0) {
        return res.status(404).send('No objectives for this lesson')
    } 

    res.status(200).json({objectives: objectives.rows[0].description})    
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
