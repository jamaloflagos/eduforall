require('dotenv').config()
const AWS = require('aws-sdk');

const {
  S3,
} = require('@aws-sdk/client-s3');

const multer = require('multer');
const multerS3 = require('multer-s3'); // Multer storage engine for S3
// Configure AWS SDK (using environment variables)
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  region: process.env.AWS_REGION,
}); // Create S3 client
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
      } else {
        folder = 'submissions/';
      }
      cb(null, folder + Date.now() + '-' + file.originalname); // Unique filename within the folder
    }
  })
});

module.exports = upload