'use strict';
/**
 * Counts all requests to API
 * @module 
 */
let _counter = 0;

module.exports = {
    next: () => _counter++,
    counter: () => { return _counter; } 
}