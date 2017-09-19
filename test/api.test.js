'use strict';
const request = require('supertest');
const app = require('../app');

describe('/api', function(){
    it('should respond with json and success true', (done) => {
        request(app).get('/api')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (res.body.success) {
                done();
            } else {
                done({error: err, body: res.body })
            }
        });
    });
});

describe('/api/echo', function(){
    it('should respond to clear get with success true', (done) => {
        request(app).get('/api/echo')
        .expect('Content-Type', /json/)
        .expect(200, { success: true }, done);
    });
    
    it('should respond to get with query params with success true and queryParams object', (done) => {
        request(app).get('/api/echo?param1=value1&param2=value2&param3=value3')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            let success = res.body.success;
            let queryParams = res.body.queryParams;
            if (success && queryParams 
                && queryParams.param1 === 'value1' 
                && queryParams.param2 === 'value2' 
                && queryParams.param3 === 'value3') {
                done();
            } else {
                done({error: err, body: res.body })
            }            
        });
    });
    it('should respond to post with success true and body object');
})