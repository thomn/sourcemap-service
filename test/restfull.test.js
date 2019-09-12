process.env.STORE_DIRECTORY = 'test/store';

const micro = require('micro');
const router = require('../src/router');
const request = require('supertest');
const app = micro(router);

describe('SourceMapService', () => {
    before(router.ready);

    describe('GET /', () => {
        describe('should fail', () => {
            it('returns 400', (done) => {
                request(app)
                    .get('/')
                    .expect(400, done)
                ;
            });
        });
    });

    describe('GET /sm', () => {
        describe('legit request', () => {
            it('returns json map', (done) => {
                request(app)
                    .get('/sm?n=test.js.map&v=1')
                    .expect(200, done)
                ;
            });
        });

        describe('without parameters', () => {
            it('returns 400', (done) => {
                request(app)
                    .get('/sm')
                    .expect(400, done)
                ;
            });
        });

        describe('with v parameter', () => {
            it('returns 400', (done) => {
                request(app)
                    .get('/sm?v=1')
                    .expect(400, done)
                ;
            });
        });

        describe('with n parameter', () => {
            it('returns 400', (done) => {
                request(app)
                    .get('/sm?n=test')
                    .expect(400, done)
                ;
            });
        });

        describe('with n and v', () => {
            describe('wrong n parameter', () => {
                describe('is path', () => {
                    it('returns 400', (done) => {
                        request(app)
                            .get('/sm?n=/../test.js.map&v=1')
                            .expect(400, done)
                        ;
                    });
                });

                describe('is array', () => {
                    it('returns 400', (done) => {
                        request(app)
                            .get('/sm?n=test.js.map&n=wurst&v=1')
                            .expect(400, done)
                        ;
                    });
                });

                describe('is encoded path', () => {
                    it('returns 400', (done) => {
                        request(app)
                            .get('/sm?n=%2f%2e%2e%2ftest.js.map&v=1')
                            .expect(400, done)
                        ;
                    });
                });
            });

            describe('wrong v parameter', () => {
                describe('not a number', () => {
                    it('returns 400', (done) => {
                        request(app)
                            .get('/sm?n=test.js.map&v=not')
                            .expect(400, done)
                        ;
                    });
                });

                describe('not a number', () => {
                    it('returns 400', (done) => {
                        request(app)
                            .get('/sm?n=test.js.map&v=not')
                            .expect(400, done)
                        ;
                    });
                });
            });
        });
    });
})
