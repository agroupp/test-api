'use strict';

const expect = require('chai').expect;
const db = require('../db/db.js');
const MOCK_DATA = require('../db/MOCK_DATA.js');

describe('InMemory database', function(){
    beforeEach(() => {
        db.users.deleteAll();
        MOCK_DATA.forEach(d => db.users.insert(d));
    });

    it('should find 1000 records', () => {
        expect(db.users.find().length).to.equal(1000);
    });
    it('should delete all records', () => {
        db.users.deleteAll();
        expect(db.users.find().length).to.equal(0);
    })
    it('should be able to delete records', () => {
        db.users.delete(450);
        expect(db.users.find().length).to.equal(999);
        db.users.delete(712);
        expect(db.users.find().length).to.equal(998);
    })
    it('should be able to update records', () => {
        expect(db.users.find({id: 472})[0].gender).to.equal('Female');
        db.users.update({id: 472}, {gender: 'Male'});
        expect(db.users.find({id: 472})[0].gender).to.equal('Male');
    });
    it('should skip 25 records', () => {
        expect(db.users.find({}, {skip: 25})[0].id).to.equal(26);
    });
    it('should limit results to 5 records', () => {
        expect(db.users.find({}, {limit: 5}).length).to.equal(5);
    });
    it('should return 25 records starting from 250', () => {
        let result = db.users.find({}, {skip: 250, limit: 25});
        expect(result[0].id).to.equal(251);
        expect(result[result.length - 1].id).to.equal(275);
        expect(result.length).to.equal(25);
    })
});