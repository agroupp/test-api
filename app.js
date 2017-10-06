/**
 * @module App Main Application Module 
 */
'use strict';

const express = require('express');
const app = express();
const isInDev = (process.env.dev) ? true : false;
const cors = require('./cors/cors');

/** The client’s IP address is understood as the left-most entry in the X-Forwarded-* header. */
app.set('trust proxy', true);

/** Disable the "X-Powered-By: Express" HTTP header. */
app.set('x-powered-by', false);

/** Activate Cors */
app.use(cors);

/** Static web site */
app.use('/', express.static('public'));

/** /echo route */
const echoRoutes = require('./echo/echo.router');
app.use('/echo', echoRoutes);

/** /rest route */
const restRoutes = require('./rest/rest.router');
app.use('/rest', restRoutes);

/** Users Block Initialization every 24 hours */
require('./db/db-init')();
setInterval(require('./db/db-init'), 1000*60*60*24);

/**
 * Error Handler
 */
app.use((req, res, next) => {
    res.status(404).json({ status: 404, statusText: 'Route not found'});
});
app.use((err, req, res, next) => {
    if (isInDev) console.log(err);
    res.status(500).json({ status: 500, statusText: 'Critical error'});
});
module.exports = app;