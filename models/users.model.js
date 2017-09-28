'use strict';

const usersCoolection = require('../db/db').users;
const pagination = require('./pagination.function');

/**
 * Users model
 * @module UsersModel
 */
const usersModel = {
    /** 
     * Read method with pagination 
     * @param {object} query Search query object
     * @param {number} pageIndex Zero based number of page
     * @param {number} pageSize Number of items per page
     */
    read: (query, pageIndex, pageSize) => {
        return pagination(usersCoolection, query, pageIndex, pageSize);
    },
    /** 
     * Create method
     * @param {object} user
     */
    create: (user) => {

    }
};

module.exports = usersModel;