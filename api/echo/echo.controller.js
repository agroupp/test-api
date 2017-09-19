'use strict';
/**
 * @module EchoController
 */
module.exports = (request, response) => {
    let responseObject = {};
    let query = request.query;
    let queryParams = {};

    /** 
     * Check if there is query params
     * and if they are add queryParams object
     * to responseObject
     */
    if (query && Object.keys(query).length > 0){
        for(let k in query){
            queryParams[k] = query[k];
        }
        responseObject.queryParams = queryParams;
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