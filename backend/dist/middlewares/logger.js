"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const logEvents = (message, logFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = format(new Date(), 'yyyy-mm-dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            yield fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
        }
        yield fsPromise.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    }
    catch (err) {
        console.log(err);
    }
});
const logger = (req, res, next) => {
    logEvents(`${req.method} ${req.url} ${req.headers.origin}`, 'reqLogs.txt');
    next();
};
module.exports = { logger, logEvents };
