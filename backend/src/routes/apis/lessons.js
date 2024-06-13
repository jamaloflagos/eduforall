const express = require('express');
const router = express.Router();
const  {
    createLesson,
    getAllLessons,
    deleteLesson,
    updateLesson,
    getLessonById
} = require('../../controllers/lessonsController')

router.route('/')
    .get(getAllLessons)
    .post(createLesson)

router.route('/:id')
    .get(getLessonById)
    .put(updateLesson)
    .delete(deleteLesson)

module.exports = router
