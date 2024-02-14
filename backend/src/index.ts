require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const { logEvents, logger} = require('./middlewares/logger');
const Connect_Mongo = require('./db/mongo');
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
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/root'));
app.use('/api/v1/student', require('./routes/apis/student'));
app.use('/api/v1/entrance-exam', require('./routes/apis/entranceExam'));




app.use(errorHandler)

mongoose.connection.once('open', () => {
    server.listen(PORT, () => console.log(`Connected to MongoDB and Server listening on port ${PORT}`));
})

mongoose.connection.on('error', (err: any) => {
    logEvents(`${err.name}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLogs.txt');
})