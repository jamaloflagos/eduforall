"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const router = express.Router();
router.get('^/$|/index.html', (req, res) => {
    res.render('index');
});
module.exports = router;
