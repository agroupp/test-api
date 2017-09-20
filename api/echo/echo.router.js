'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const echoController = require('./echo.controller');

router.route('/')
    .get(echoController)
    .post(bodyParser.json(), echoController)
    .put(bodyParser.json(), echoController)
    .patch(bodyParser.json(), echoController)
    .delete(echoController);

module.exports = router;