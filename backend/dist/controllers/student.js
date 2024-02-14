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
const register = require('../db/queries');
const asyncHandler = require('express-async-handler');
const registerStudent = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register student recieved', __dirname);
    const { first_name, middle_name, last_name, gender, DOB, class_id } = req.body;
    if (!first_name || !middle_name || !last_name || !gender || !DOB || !class_id) {
        return res.status(400).send('All input fields required!');
    }
    ;
    yield pool.query(register, [first_name, middle_name, last_name, gender, DOB, class_id], (err, results) => {
        if (err)
            throw err;
        res.status(201).send('Student registered succesfully');
    });
}));
module.exports = registerStudent;
