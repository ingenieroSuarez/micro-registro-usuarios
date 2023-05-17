const express = require('express');
const router = express.Router();

router.use('/usuarios', require('./usuarios'));

module.exports= router