const ROLES_LIST = require('../../config/roles_list');
const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const upload = require('../../middlewares/multer-s3');
const {
    createAssignment,
    getAssignmentById,
    deleteAssignment,
    updateAssignment,
    submitAssignment
    } = require('../../controllers/assignmentsController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .post(verifyRoles(ROLES_LIST.Tutor),createAssignment)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Tutor, ROLES_LIST.Student),getAssignmentById)
    .put(verifyRoles(ROLES_LIST.Tutor),updateAssignment)
    .delete(verifyRoles(ROLES_LIST.Tutor),deleteAssignment)

router.route('/:id/submit')
    .post(verifyRoles(ROLES_LIST.Student),upload.single('assignment_answer'), submitAssignment)

module.exports = router
