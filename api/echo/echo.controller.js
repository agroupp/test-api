'use strict';

module.exports = (request, response) => {
    let responseObject = {};
    let query = request.query;
    let queryParams = {};
    if (query && query !== {}){
        for(let k in query){
            queryParams[k] = query[k];
        }
        responseObject.queryParams = queryParams;
    }
    responseObject.success = true;
    response.set({
        'Allow': 'GET',
        'Server': 'Test API'
    });
    response.json(responseObject);
}