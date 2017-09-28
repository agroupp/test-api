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

describe('/rest/users', function() {
    it('should return 1000 objects on request with no params', (done) => {
        request(app).get('/rest/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            //console.log(res.body);
            if (res.body.success && res.body.items.length === 1000) {
                done();
            } else {
                done(res.body.items.length);
            }
        });
    });
    it('should return 30 objects on request with 30 items per page on first page', (done) => {
        request(app).get('/rest/users?page_index=0&page_size=30')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let response = res.body;
            if (response.success 
                && response.items.length === 30 
                && response.items[0].id === 1
                && response.items[response.items.length - 1].id === 30
            ) {
                done();
            } else {
                done(res.body.items.length);
            }
        });
    });
    it('should return 10 objects on request with 30 items per page on last (33) page', (done) => {
        request(app).get('/rest/users?page_index=33&page_size=30')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let response = res.body;
            if (response.success 
                && response.items.length === 10 
                && response.items[0].id === 991
                && response.items[response.items.length - 1].id === 1000
            ) {
                done();
            } else {
                done(res.body.items.length);
            }
        });
    });    
});