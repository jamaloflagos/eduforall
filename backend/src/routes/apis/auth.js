const express = require('express');
const upload = require('../../middlewares/multer-s3');
const router = express.Router();
const {
    register,
    login,
    refreshToken,
    logout
} = require('../../controllers/authController');

router.route('/login')
    .post(login)

router.route('/register')
    .post(upload.single('profile_picture'), register)

router.route('/refresh')
    .post(refreshToken)

router.route('/logout')
    .post(logout)

module.exports = router