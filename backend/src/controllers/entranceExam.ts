const pool = require('../db/postgres');
const asyncHandler = require('express-async-handler');
const { getEntranceExam } = require('../db/queries')

const entranceExam = asyncHandler(async (req: any, res: any) => {
    await pool.query(getEntranceExam, (err: any, results: any) => {
        if (err) throw err;
        console.log(results)
        res.render('entrance-exam', {questions: results})
    })
})

module.exports = entranceExam