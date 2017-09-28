'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodNotAllowed = require('../method-not-allowed');
const requestsCounter = require('../request-counter');

function rootController(req, res) {
    requestsCounter.next();
    res.set({
        'Allow': 'GET,POST,PUT,DELETE,PATCH',
        'X-Request-No': requestsCounter.counter()
    });
    res.json({ success: true, method: req.method });
}

/** Common Block */
router.route('/')
    .get(rootController)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .patch(methodNotAllowed)
    .delete(methodNotAllowed);

/** Users Block */
const usersController = require('./users.controller');
router.route('/users')
    .get(usersController)

module.exports = router;