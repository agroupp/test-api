'use strict';
const requestsCounter = require('../request-counter');
const usersModel = require('../models/users.model');

/**
 * @module CreateUserController
 * @param {object} request Http request object
 * @param {object} response Http response object
 */
module.exports = (request, response) => {
    let user = request.body;
    requestsCounter.next();
    response.set({
        'Allow': 'GET,POST',
        'X-Request-No': requestsCounter.counter()
    });
    response.json(usersModel.create(user));
}