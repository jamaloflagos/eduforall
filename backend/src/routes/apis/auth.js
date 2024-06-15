const express = require('express');
const upload = require('../../middlewares/multer-s3');
const router = express.Router();
const {
    register,
    login
} = require('../../controllers/authController');

router.route('/login')
    .post(login)

router.route('/register')
    .post(upload.single('profile_picture'),register)

module.exports = router