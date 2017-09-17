/**
 * @module App Main Application Module 
 */
'use strict';

const express = require('express');
const app = express();
const api = require('./api/api.router');

app.use('/', express.static('public'));
app.use('/api', api);

module.exports = app;