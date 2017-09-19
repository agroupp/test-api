/**
 * @module App Main Application Module 
 */
'use strict';

const express = require('express');
const app = express();

/**
 * The client’s IP address is understood as the left-most entry in the X-Forwarded-* header.
 */
app.set('trust proxy', true);

/**
 * Disable the "X-Powered-By: Express" HTTP header.
 */
app.set('x-powered-by', false);

const api = require('./api/api.router');

app.use('/', express.static('public'));
app.use('/api', api);

module.exports = app;