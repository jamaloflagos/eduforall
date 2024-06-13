require('dotenv').config();
const http = require('http');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const express = require('express');
const path = require('path')
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const errorHandler = require('./src/middlewares/errorHandler');
const { logEvents, logger} = require('./src/middlewares/logger');
const Connect_Mongo = require('./src/db/mongo');
const PORT = process.env.PORT || 3500;

const app = express();
const server = http.createServer(app);

Connect_Mongo();

// settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
// middeware 
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

var storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage: storage });

// routes 
app.post('/api/upload', upload.single('answer'), (req, res) => {
    res.send("Assignment uploaded successfully!")
});
app.use('/api/v1/student', require('./src/routes/apis/student'));
app.use('/api/v1/entrance-exam', require('./src/routes/apis/entranceExam'));

app.use('/api/v1/lessons');
app.use('/api/v1/quizzes');
app.use('/api/v1/assignments');
app.use('/api/v1/grades');
app.use('/api/v1/submissions');
app.use('/api/v1/students');
app.use('/api/v1/auth');

app.use(errorHandler);

mongoose.connection.once('open', () => {
    conn = mongoose.connection
    let gfs = new Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
    server.listen(PORT, () => console.log(`Connected to MongoDB and Server listening on port ${PORT}`));
})

mongoose.connection.on('error', (err) => {
    logEvents(`${err.name}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLogs.txt');
})