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
     * @returns {object} {success: boolean, id: number}
     */
    create: (user) => {
        if (user && typeof user === 'object'){
            if (user.firstName && user.firstName.length > 3
                && user.lastName && user.lastName.length > 3
                && user.email && user.email.length > 3
                && (user.gender === 'Male' || user.gender === 'Female')) {
                    if (usersCoolection.find({email: user.email}).length === 0) {
                        return { success: true, id: usersCoolection.insert(user)};
                    } else {
                        return {success: false, error: 'user with this email already exists'};
                    }
                } else {
                    return {success: false, error: 'not all required fields exist and filled'};
                }
        }
    }
};

module.exports = usersModel;