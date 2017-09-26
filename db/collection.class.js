'use strict';

/** Class representing in-memory database collection */
class Collection {
    constructor() {
        /** Init private data array property */
        this._data = [];
    }

    /**
     * Searches the collection according query object
     * @param {Object} q 
     * @param {Object} options {skip: number; limit: number}
     * @return {array}
     */
    find(q, options) {
        let result = [];
        let limit = 0;
        let skip = 0;
        if (options && typeof options === 'object') {
            limit = options.limit || 0;
            skip = options.skip || 0;
        }
        if (q && typeof q === 'object') {
            const key = Object.keys(q)[0];
            result = this._data.filter(d => d[key] === q[key])
        } else {
            result = this._data;
        }
        if (skip > 0 && skip <= result.length) {
            if (limit > 0) {
                let end = ((skip + limit) <= result.length) ? (skip + limit) : result.length;
                result = result.slice(skip, end);
            } else {
                result = result.slice(skip);
            }
        } else if (limit > 0 && limit < result.length) {
            result = result.slice(0, limit);
        }
        
        return result;
    }

    /**
     * Inserts new record into collection and sets its id
     * @param {Object} obj 
     * @return {number | null} id of new inserted record
     */
    insert(obj) {
        let result = null;
        if (obj && typeof obj === 'object') {
            obj.id = this._data.length + 1
            this._data.push(obj);
            result = obj.id;
        }
        return result;
    }

    /**
     * Deletes record with provided id
     * @param {number} id 
     */
    delete(id) {
        if (id && Number.isInteger(id)) {
            let d = this._data.filter(d => d.id !== id);
            this._data = d;
        }
    }

    /**
     * Deletes all records from collection
     */
    deleteAll() {
        this._data = [];
    }

    /**
     * Updates record or specified fields in record
     * @param {Object} query 
     * @param {Object} body 
     */
    update(query, body) {
        let obj = this.find(query)[0];
        this.delete(obj.id);
        body.id = obj.id;
        Object.assign(obj, body);
        this._data.push(obj);
    }
}

module.exports = Collection;