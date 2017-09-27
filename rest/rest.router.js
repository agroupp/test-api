'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodNotAllowed = require('../method-not-allowed');
const requestsCounter = require('../request-counter');

function rootController(req, res) {
    res.set({
        'Allow': 'GET,POST,PUT,DELETE,PATCH',
        'X-Request-No': requestsCounter.counter()
    });
    res.json({ success: true, method: req.method });
}

router.route('/')
    .get(rootController)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .patch(methodNotAllowed)
    .delete(methodNotAllowed);

module.exports = router;