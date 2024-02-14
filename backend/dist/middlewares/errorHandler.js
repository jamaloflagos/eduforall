"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { logEvents } = require('../middlewares/logger');
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers}`);
    const status = res.status ? res.status : 500;
    res.status(status);
    res.json({ message: err.message, isError: true });
};
module.exports = errorHandler;
