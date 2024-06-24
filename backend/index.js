require('dotenv').config();
const http = require('http');
// const Grid = require('gridfs-stream');
const express = require('express');
const path = require('path')
const cors = require('cors');
// const multer = require('multer');
// const mongoose = require('mongoose');
const errorHandler = require('./src/middlewares/errorHandler');
const { logEvents, logger} = require('./src/middlewares/logger');
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
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/student', require('./src/routes/apis/student'));
app.use('/api/v1/entrance-exam', require('./src/routes/apis/entranceExam'));
app.get('/', (req, res) => {
    console.log('gotten')
    res.send('Request gotten')
})

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