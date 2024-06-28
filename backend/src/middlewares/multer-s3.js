require('dotenv').config();
const {
  S3,
} = require('@aws-sdk/client-s3');

const multer = require('multer');
const multerS3 = require('multer-s3'); // Multer storage engine for S3

const s3 = new S3({region: process.env.AWS_REGION}); // Create S3 client
// Set up Multer with S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log(req.files);
      let folder = '';
      if (file.mimetype.startsWith('text/html')) {
        folder = 'html/';
      } else if (file.mimetype.startsWith('image/')) {
        folder - 'profile-pictures/'
      } else {
        folder = 'submissions/';
      }
      cb(null, folder + Date.now() + '-' + file.originalname); // Unique filename within the folder
    }
  })
});

module.exports = upload