'use strict';

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const allowedHeaders = [
    'content-type', 
    'authorization', 
    'x-access-token', 
    'x-auth-token', 
    'accept', 
    'accept-language', 
    'content-language'
];

module.exports = (req, res, next) => {
    let responseHeaders = {
        'Access-Control-Allow-Origin': '*'
    };

    if (req.method === 'OPTIONS') {
        responseHeaders['Access-Control-Allow-Methods'] = allowedMethods.join(',');
        responseHeaders['Access-Control-Allow-Headers'] = allowedHeaders.join(',');
        /** How long the results of a preflight request can be cached (in seconds) */
        responseHeaders['Access-Control-Max-Age'] = 60 *60;
        /** Allow sending coockies */
        responseHeaders['Access-Control-Allow-Credentials'] = true;
    }

    res.set(responseHeaders);
    next();
}