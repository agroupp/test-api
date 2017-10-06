'use strict';

const usersCoolection = require('./db').users;
const USERS_MOCK_DATA = require('./USERS_MOCK_DATA');

/**
 * Initialize Database
 * @function dbInit
 * @returns {void}
 */
module.exports = () => {
    usersCoolection.deleteAll();
    USERS_MOCK_DATA.forEach(d => usersCoolection.insert(d));
}