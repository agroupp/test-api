'use strict';

const express = require('express');
const router = express.Router();
const echoController = require('./echo.controller');

router.route('/')
    .get(echoController)

module.exports = router;