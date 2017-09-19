'use strict';
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
     *      queryParams?: Map<string,string>
     *      body?: {}
     * }
     */
    let responseObject = {};
    
    let query = request.query;
    let queryParams = new Map();

    let body = request.body;

    /** 
     * Check if there is query params
     * and if they are add queryParams object
     * to responseObject
     */
    if (query && Object.keys(query).length > 0){
        for(let k in query){
            // queryParams[k] = query[k];
            queryParams.set(k, query[k]);
        }
        responseObject.queryParams = Array.from(queryParams);
    }

    /**
     * Check if there is a body in request
     * 
     */
    if (body && Object.keys(body).length > 0) {
        responseObject.body = body;
    }

    /** Everything is ok, add success true */
    responseObject.success = true;

    /** Set response headers */
    response.set({
        'Allow': 'GET',
        'Server': 'Test API'
    });

    /** Response */
    response.json(responseObject);
}