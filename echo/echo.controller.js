'use strict';
const requestsCounter = require('../request-counter');

/**
 * @module EchoController
 */
module.exports = (request, response) => {
    /**
     * Response object
     * Must implement interface
     * @interface ResponseObject
     * interface ResponseObject {
     *      success: boolean;
     *      method: string;
     *      queryParams?: Map<string,string>
     *      body?: {}
     * }
     */
    let responseObject = {};
    
    requestsCounter.next();

    /** Request method */
    responseObject.method = request.method;
    
    /** Query params in request */
    let query = request.query;
    let queryParams = new Map();

    /** Request body */
    let body = request.body;

    /** 
     * Check if there is query params
     * and if they are add queryParams map
     * to responseObject
     */
    if (query && Object.keys(query).length > 0){
        for(let k in query){
            queryParams.set(k, query[k]);
        }
        responseObject.queryParams = Array.from(queryParams);
    }

    /**
     * Check if there is a body in request
     * and add it to response object
     */
    if (body && Object.keys(body).length > 0) {
        responseObject.body = body;
    }

    /** Everything is ok, add success true */
    responseObject.success = true;

    /** Set response headers */
    response.set({
        'Allow': 'GET,POST,PUT,DELETE,PATCH',
        'X-Request-No': requestsCounter.counter()
    });

    /** Response */
    response.json(responseObject);
}