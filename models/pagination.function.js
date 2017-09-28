'use strict';

/**
 * Function that makes requests and returns result with pagination
 * @function pagination
 * @param collection Database collection
 * @param {Object} query Search query object
 * @param {number} pageIndex Zero based number of page
 * @param {number} pageSize Number of items per page
 * @returns {Object}
 */
module.exports = (collection, query, pageIndex, pageSize) => {
    let result = {};
    let length = 0;
    if (query && typeof query === 'object'){
        length = collection.find(query).length;
        if (pageSize && pageSize > 0) {
            let totalPages = Math.floor(length / pageSize);
            let skip = (pageIndex < totalPages) ? pageIndex * pageSize : totalPages * pageSize;
            let limit = (skip === totalPages) ? (length - totalPages * pageSize) : pageSize;
            result.items = collection.find(query, {limit: limit, skip: skip});
            result.length = length;
            result.totalPages = totalPages;
        } else {
            result.items = collection.find(query);
            result.length = length;
        }
    } else {
        result.items = collection.find();
        result.length = result.items.length;
    }
    return result;
}