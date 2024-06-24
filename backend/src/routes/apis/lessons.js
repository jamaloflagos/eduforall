const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const upload = require('../../middlewares/multer-s3');
const verifyRoles = require('../../middlewares/verifyRoles');
const  {
    createLesson,
    getAllLessons,
    deleteLesson,
    updateLesson,
    getLessonById,
    getLessonObjectivesById
    } = require('../../controllers/lessonsController');
const ROLES_LIST = require('../../config/roles_list');
const router = express.Router();
router.use(verifyJWT);
    
router.route('/')
    .get(getAllLessons)
    .post(upload.single('lesson_content'), createLesson)

router.route('/:id')
    .get(getLessonById)
    .put(updateLesson)
    .delete(deleteLesson)

    router.route('/:id/objectives')
        .get(getLessonObjectivesById)

module.exports = router
