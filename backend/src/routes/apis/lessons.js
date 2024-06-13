const express = require('express');
const upload = require('../../middlewares/multer-s3')
const verifyJWT = require('../../middlewares/verifyJWT');
const  {
    createLesson,
    getAllLessons,
    deleteLesson,
    updateLesson,
    getLessonById
    } = require('../../controllers/lessonsController');
const router = express.Router();
router.use(verifyJWT);
    
router.route('/')
    .get(getAllLessons)
    .post(upload.array('lesson_upload', 3), createLesson)

router.route('/:id')
    .get(getLessonById)
    .put(updateLesson)
    .delete(deleteLesson)

module.exports = router
