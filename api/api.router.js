'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.set({
        'Allow': 'GET',
        'Server': 'Test API'
    });
    res.set('X-Test-API-Request-Id', '12345');
    res.type('json');
    res.json({
        success: true,
        message: 'Test API',
        requestMethod: 'GET',
        requestHostname: req.hostname,
        requestIp: req.ip
    })
})    

module.exports = router;