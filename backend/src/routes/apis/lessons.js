const express = require('express');
const upload = require('../../middlewares/multer-s3')
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const  {
    createLesson,
    getAllLessons,
    deleteLesson,
    updateLesson,
    getLessonById
    } = require('../../controllers/lessonsController');
const ROLES_LIST = require('../../config/roles_list');
const router = express.Router();
router.use(verifyJWT);
    
router.route('/')
    .get(getAllLessons)
    .post(upload.array('lesson_content', 3), createLesson)

router.route('/:id')
    .get(getLessonById)
    .put(updateLesson)
    .delete(deleteLesson)

module.exports = router
