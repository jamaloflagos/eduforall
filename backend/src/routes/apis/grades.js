const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');
const {
    getAllGrades,
    getGradeById 
    } = require('../../controllers/gradesController');
const ROLES_LIST = require('../../config/roles_list');

const router = express.Router();
router.use(verifyJWT);

router.route('/')
    .get(getAllGrades)

router.route('/:id')
    .get(getGradeById)

module.exports = router
