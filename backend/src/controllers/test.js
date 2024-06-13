const express = require('express');
const AWS = require('aws-sdk');
const pool = require('../db'); // PostgreSQL connection pool

// ... (AWS SDK Configuration remains the same)

// Controller function
const getLessonContent = async (req, res) => {
    const lessonId = req.params.lessonId;

    try {
        // 1. Fetch lesson details from the database
        const result = await pool.query('SELECT lesson_location, js_location, css_location FROM lessons WHERE id = $1', [lessonId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        const { lesson_location, js_location, css_location } = result.rows[0];

        // 2. Retrieve files from S3 in parallel using Promise.all
        const filePromises = [
            s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: content_location }).promise(),
            s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: js_location }).promise(),
            s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: css_location }).promise()
        ];

        const [htmlData, jsData, cssData] = await Promise.all(filePromises);

        // 3. Combine the HTML, CSS, and JavaScript content
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

        // 4. Send the combined content as a response
        res.set('Content-Type', 'text/html');
        res.send(combinedContent);

    } catch (error) {
        console.error('Error fetching lesson:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
  getLessonContent,
};
