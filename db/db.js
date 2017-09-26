'use strict';

const Collection = require('./collection.class');
const usersData = require('./MOCK_DATA');

/**
 * Exports Database with collection
 */
module.exports = {
    users: new Collection(usersData)
}
