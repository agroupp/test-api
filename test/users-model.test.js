'use strict';

const expect = require('chai').expect;
const usersModel = require('../models/users.model');

describe('Users Model Read', function(){
    it('should read all records', () => {
        let res = usersModel.read();
        expect(res.length).equal(1000);
        expect(res.items).to.have.lengthOf(1000);
    });
    it('should read record according to query', () => {
        let res = usersModel.read({id: 472});
        expect(res.items).to.have.lengthOf(1);
        expect(res.items[0].email).equal('braikerd3@sohu.com');
    });
    describe('Pagination', () => {
        it('should read records on page 0 with 30 items per page', () => {
            let res = usersModel.read({}, 0, 30);
            expect(res.items).to.have.lengthOf(30);
            expect(res.items[0].id).equal(1);
            expect(res.items[res.items.length - 1].id).equal(30);
        });    
        it('should read records on page 33 (last one) with 30 items per page (last 10 items)', () => {
            let res = usersModel.read({}, 33, 30);
            expect(res.items).to.have.lengthOf(10);
            expect(res.items[0].id).equal(991);
            expect(res.items[res.items.length - 1].id).equal(1000);
        });
    })
})