var mongoose = require("mongoose");
var Message = require('../app/message/message.js');
var MessageService = require('../app/message/messageService.js');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;

var server = require('../server.js');

chai.use(chaiHttp);

describe("isPalindrome() tests", () => {
    it('it should return true for "deed" (even # of characters)', (done) => {
        MessageService.isPalindrome("deed").should.be.eql(true);
        done();
    });
    it('it should return true for "racecar" (odd # of characters)', (done) => {
        MessageService.isPalindrome("racecar").should.be.eql(true);
        done();
    });
    it('it should return false for "dead" (even # of characters)', (done) => {
        MessageService.isPalindrome("deeds").should.be.eql(false);
        done();
    });
    it('it should return false for "deeds" (odd # of characters)', (done) => {
        MessageService.isPalindrome("deeds").should.be.eql(false);
        done();
    });
    it('it should return true for "Deed" (mixed case)', (done) => {
        MessageService.isPalindrome("Deed").should.be.eql(true);
        done();
    });
    it('it should return true for "race car" (whitespace)', (done) => {
        MessageService.isPalindrome("race car").should.be.eql(true);
        done();
    });
    it('it should return true for "race,car" (special characters)', (done) => {
        MessageService.isPalindrome("race,car").should.be.eql(true);
        done();
    });
    it('it should return false for "" (empty string)', (done) => {
        MessageService.isPalindrome("").should.be.eql(false);
        done();
    });
});

describe('Message Routes tests', () => {

    beforeEach((done) => { //Before each test we empty the database
        Message.remove({}, done);
    });

    describe('/GET Messages', () => {
        it('it should GET all the Messages', (done) => {
            chai.request(server)
                .get('/api/messages')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST Message', () => {

        it('it should POST a message that is a Palindrome', (done) => {
            var message = {
                text: "race car",
            }
            chai.request(server)
                .post('/api/messages/')
                .send(message)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.have.property('text').eql("race car")
                    res.body[0].should.have.property('isPalindrome').eql(true)
                    done();
                });
        });
    });

    describe('Test 400 errors', () => {
        var message = {
            text: "",
        }
        it('it should 400 on insert using empty text', (done) => {
            chai.request(server)
                .post('/api/messages')
                .send(message)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should 400 on update using empty text', (done) => {
            chai.request(server)
                .post('/api/messages/0')
                .send(message)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('Test 404 errors', () => {

        it('it should 404 on update for using a not found id', (done) => {
            var message = {
                text: "race car",
            }
            chai.request(server)
                .post('/api/messages/0')
                .send(message)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should 404 on delete for using a not found id', (done) => {
            chai.request(server)
                .delete('/api/messages/0')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('Testing Create/Update/Delete', (done) => {
        var message = {
            text: "deeds",
        }

        it('it should create, update and delete a message succesfully', (done) => {
            chai.request(server)
                .post('/api/messages/')
                .send(message)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    message = res.body[0];
                    message.should.have.property('text').eql("deeds")

                    var updateMessage = {
                        text: "deed",
                    }
                    chai.request(server)
                        .post('/api/messages/' + message._id)
                        .send(updateMessage)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            res.body[0].should.have.property('text').eql("deed")

                            chai.request(server)
                                .delete('/api/messages/' + message._id)
                                .send(message)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('array');
                                    res.body.length.should.be.eql(0);
                                    done();
                                });
                        });
                });
        });
    });
});