const pool = require('../db/postgres');
const asyncHandler = require('express-async-handler');

const entranceExam = asyncHandler(async (req: any, res: any) => {
    await pool.query('SELECT * FROM entrance', (err: any, results: any) => {
        if (err) throw err;
        console.log(results)
        res.render('entrance-exam', {questions: results})
    })
})

module.exports = entranceExam