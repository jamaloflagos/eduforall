require('dotenv').config()
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3'); // Multer storage engine for S3
// Configure AWS SDK (using environment variables)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3(); // Create S3 client
// Set up Multer with S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      let folder = '';
      if (file.mimetype.startsWith('text/html')) {
        folder = 'html/';
      } else if (file.mimetype.startsWith('application/javascript')) {
        folder = 'js/';
      } else if (file.mimetype.startsWith('text/css')) {
        folder = 'css/';
      } else if (file.mimetype.startsWith('image/')) {
        folder = 'profile_pictures/';
      } else {
        folder = 'submissions/';
      }
      cb(null, folder + Date.now() + '-' + file.originalname); // Unique filename within the folder
    }
  })
});


module.exports = upload