'use strict';
const requestsCounter = require('../request-counter');
const usersCoolection = require('../db/db').users;
const usersModel = require('../models/users.model');

/**
 * @module UsersController
 * @param {object} request Http request object
 * @param {object} response Http response object
 */
module.exports = (request, response) => {
    let responseObject = {};
    const queryParams = request.query;
    let pageIndex, pageSize;
    if (queryParams && queryParams['page_index'] && queryParams['page_size']) {
        pageIndex = +queryParams['page_index'] || 0;
        pageSize = +queryParams['page_size'] || 0;
        responseObject = usersModel.read({}, pageIndex, pageSize);
    } else {
        responseObject = usersModel.read({});
    }

    responseObject.success = true;
    requestsCounter.next();
    response.set({
        'Allow': 'GET,POST',
        'X-Request-No': requestsCounter.counter()
    });
    response.json(responseObject);
}