/**
 * @module App Main Application Module 
 */
'use strict';

const express = require('express');
const app = express();
const cors = require('./cors/cors');

/**
 * The client’s IP address is understood as the left-most entry in the X-Forwarded-* header.
 */
app.set('trust proxy', true);

/**
 * Disable the "X-Powered-By: Express" HTTP header.
 */
app.set('x-powered-by', false);

/**
 * Activate Cors
 */
app.use(cors);

const api = require('./api/api.router');

app.use('/', express.static('public'));
app.use('/api', api);

/**
 * Error Handler
 */
app.use((req, res, next) => {
    res.status(404).json({ status: 404, statusText: 'Route not found'});
});
app.use((err, req, res, next) => {
    res.status(500).json({ status: 500, statusText: 'Critical error'});
});
module.exports = app;