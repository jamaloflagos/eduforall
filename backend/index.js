require('dotenv').config();
const http = require('http');
const pool = require('./src/db/postgres');
// const Grid = require('gridfs-stream');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const multer = require('multer');
// const mongoose = require('mongoose');
const errorHandler = require('./src/middlewares/errorHandler');
const { logEvents, logger} = require('./src/middlewares/logger');
// const corsOption = require('./src/config/corsOption');
// const Connect_Mongo = require('./src/db/mongo');
const PORT = process.env.PORT || 3500;

const app = express();
const server = http.createServer(app);

// Connect_Mongo();

// settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  
 
// middeware 
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000']; // List of allowed origins
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers
    next();
  });
  


app.use('/api/v1/student', require('./src/routes/apis/student'));
app.use('/api/v1/entrance-exam', require('./src/routes/apis/entranceExam'));
// app.get('/', async (req, res) => {
//     const query = await pool.query(`CREATE SEQUENCE lesson_week_incrementing_number_seq;`)
// console.log(query);
// res.json({query})
// })

app.use('/api/v1/auth', require('./src/routes/apis/auth'));
app.use('/api/v1/lessons', require('./src/routes/apis/lessons'));
app.use('/api/v1/quizzes', require('./src/routes/apis/quizzes'));
app.use('/api/v1/assignments', require('./src/routes/apis/assignments'));
app.use('/api/v1/grades', require('./src/routes/apis/grades'));
app.use('/api/v1/submissions', require('./src/routes/apis/submissions'));
app.use('/api/v1/students', require('./src/routes/apis/students'));

app.use(errorHandler);

// mongoose.connection.once('open', () => {
//     conn = mongoose.connection
//     let gfs = new Grid(conn.db, mongoose.mongo)
//     gfs.collection('uploads')
    server.listen(PORT, () => console.log(`Connected to MongoDB and Server listening on port ${PORT}`));
// })

// mongoose.connection.on('error', (err) => {
//     logEvents(`${err.name}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLogs.txt');
// })