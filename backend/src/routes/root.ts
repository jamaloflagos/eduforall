const express = require('express');
const path = require('path');
const router = express.Router();

router.get('^/$|/index.html', (req: any, res: any) => {
    res.render('index');
});

module.exports = router;