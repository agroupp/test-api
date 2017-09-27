'use strict';
const request = require('supertest');
const app = require('../app');

describe('/echo', function(){
    it('should respond to clear get with success true', (done) => {
        request(app).get('/echo')
        .expect('Content-Type', /json/)
        .expect(200, { success: true, method: 'GET' }, done);
    });

    it('should respond with cors headers on options request', (done) => {
        request(app).options('/echo')
        .expect('Access-Control-Allow-Origin', '*')
        .expect('Access-Control-Allow-Methods', /GET,POST,PUT,DELETE,PATCH/)
        .expect('Access-Control-Allow-Headers', /content-type/i)
        .expect('Access-Control-Max-Age', '3600')
        .expect('Access-Control-Allow-Credentials', 'true')
        .expect(200, done)
    });

    it('should respond to get with query params with success true and queryParams object', (done) => {
        request(app).get('/echo?param1=value1&param2=value2&param3=value3')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            let success = res.body.success;
            let queryParams = res.body.queryParams;
            if (success && queryParams) {
                const qp = new Map(queryParams);
                if (qp.size === 3 
                    && qp.get('param1') === 'value1'
                    && qp.get('param2') === 'value2'
                    && qp.get('param3') === 'value3'
                ) {
                    done();
                } else {
                    done({ body: res.body });
                }
            } else {
                done({error: err, body: res.body });
            }            
        });
    });

    it('should respond to post with success true and body object', (done) => {
        request(app).post('/echo')
        .set('Content-Type', 'application/json')
        .send({ "body1": "value1", "body2": "value2" })
        .expect(200)
        .end((err, res) => {
            let success = res.body.success;
            let body = res.body.body;
            if (success && body.body1 === 'value1' && body.body2 === 'value2' ) {
                done();
            } else {
                done({error: err, body: res.body });
            }
        })
    });
})