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
const pool = require('../db/postgres');
const asyncHandler = require('express-async-handler');
const { getEntranceExam } = require('../db/queries');
const entranceExam = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(getEntranceExam, (err, results) => {
        if (err)
            throw err;
        console.log(results);
        res.render('entrance-exam', { questions: results });
    });
}));
module.exports = entranceExam;
