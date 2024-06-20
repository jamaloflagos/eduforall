const ROLES_LIST = require('../../config/roles_list');
const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const upload = require('../../middlewares/multer-s3');
const {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    deleteAssignment,
    updateAssignment,
    submitAssignment
    } = require('../../controllers/assignmentsController');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .post(createAssignment)
    .get(getAllAssignments)

router.route('/:id')
    .get(getAssignmentById)
    .put(updateAssignment)
    .delete(deleteAssignment)

router.route('/:id/submit')
    .post(upload.single('assignment_answer'), submitAssignment)

module.exports = router
