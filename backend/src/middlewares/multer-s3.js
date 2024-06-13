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
    bucket: process.env.S3_BUCKET_NAME, // Your S3 bucket name
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
  })
});

module.exports = upload