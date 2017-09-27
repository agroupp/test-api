'use strict';
const request = require('supertest');
const app = require('../app');

describe('/rest', function(){
    it('should respond to clear get with success true', (done) => {
        request(app).get('/rest')
        .expect('Content-Type', /json/)
        .expect(200, { success: true, method: 'GET' }, done);
    });

    it('should respond with cors headers on options request', (done) => {
        request(app).options('/rest')
        .expect('Access-Control-Allow-Origin', '*')
        .expect('Access-Control-Allow-Methods', /GET,POST,PUT,DELETE,PATCH/)
        .expect('Access-Control-Allow-Headers', /content-type/i)
        .expect('Access-Control-Max-Age', '3600')
        .expect('Access-Control-Allow-Credentials', 'true')
        .expect(200, done)
    });
    it('should respond with 405 to POST', (done) => {
        request(app).post('/rest')
        .expect(405, done);
    });
});