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
const exposeHeaders = [
    'content-type',
    'content-length',
    'connection',
    'allow',
    'date',
    'etag',
    'x-request-no'
]

module.exports = (req, res, next) => {
    let responseHeaders = {
        'Access-Control-Allow-Origin': '*',
        /** 
         * The Access-Control-Expose-Headers response header indicates which headers 
         * can be exposed as part of the response by listing their names.
         */
        'Access-Control-Expose-Headers': exposeHeaders.join(',')
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