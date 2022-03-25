import assert from 'assert';
import sms from '../src';
import request from 'supertest';
import {cleanup, create} from './utils';

describe('SourceMapService', () => {
    let instance;

    before(async () => {
        process.chdir(__dirname);
        await cleanup();
        create();
        instance = await sms();
    });

    describe('GET /', () => {
        describe('send request to a non-existing resource', () => {
            it('should return 404', (done) => {
                request(instance.server)
                    .get('/foobar')
                    .expect(404, done)
                ;
            });
        });
    });

    describe('GET /healthz', () => {
        describe('send request to health endpoint', () => {
            it('should return 200 with "ok"', (done) => {
                request(instance.server)
                    .get('/healthz')
                    .expect(({text}) => {
                        assert(text === 'ok');
                    })
                    .expect(200, done)
                ;
            });
        });
    });

    describe('GET /artifact/:id', () => {
        describe('legitimate get request to existing artifact', () => {
            it('should return artifact', (done) => {
                request(instance.server)
                    .get('/artifact/rtf:54Rg1sFj9QbqI')
                    .expect(({body}) => {
                        assert(body.toString() === JSON.stringify({"foo":"bar"}));
                    })
                    .expect(200, done)
                ;
            });
        });

        describe('incomplete get request', () => {
            it('should return 200', (done) => {
                request(instance.server)
                    .get('/artifact')
                    .expect(({body}) => {
                        assert(Array.isArray(body));
                        assert(body.length === 2);
                        assert(body[0].size === 1337);
                        assert(body[1].size === 0);
                    })
                    .expect(200, done)
                ;
            });
        });

        describe('forged get request', () => {
            it('should return 404', (done) => {
                request(instance.server)
                    .get('/artifact/rtf:foobar')
                    .expect(404, done);
            });
        });
    });

    describe('POST /artifact/:id', () => {
        describe('legitimate post request to a claimed artifact id', () => {
            it('should upload sourcemap and return artifact id', (done) => {
                request(instance.server)
                    .post('/artifact/rtf:54Rg1sFj9QbqI')
                    .set('Content-Type', 'application/json')
                    .send(JSON.stringify({data: "{foo: 'bar'}"}))
                    .expect(({text}) => {
                        assert(text === 'rtf:54Rg1sFj9QbqI');
                    })
                    .expect(201, done)
                ;
            });
        });

        describe('legitimate post request to an unclaimed artifact id', () => {
            it('should return 404', (done) => {
                request(instance.server)
                    .post('/artifact/foobar')
                    .send()
                    .expect(404, done)
                ;
            });
        });
    });

    describe('POST /artifact/claim', () => {
        describe('legitimate post request to claim artifact id', () => {
            it('should return claimed artifact id', (done) => {
                request(instance.server)
                    .post('/artifact/claim')
                    .send({data: {crc: 'aaaaa'}})
                    .expect(({text}) => {
                        assert(typeof text === "string");
                    })
                    .expect(200, done)
                    .send()
                ;
            });
        });

        describe('legitimate post to a previously posted artifact', () => {
            it('should return 404', (done) => {
                request(instance.server)
                    .post('/artifact/claim')
                    .send({data: {crc: '456def'}})
                    .expect(({text}) => {
                        assert(text === 'cached');
                    })
                    .expect(400, done)
                ;
            });
        })

        describe('forged post request', () => {
            it('should return 500', (done) => {
                request(instance.server)
                    .post('/artifact/claim')
                    .send({data: {crc: 'foobar'}})
                    .expect(({text}) => {
                        assert(typeof text === 'string');
                    })
                    .expect(500, done)
                ;
            });
        });
    });

    describe('DELETE /artifact/:id', () => {
        describe('legitimate delete request to claim artifact id', () => {
            it('should return true', (done) => {
                request(instance.server)
                    .delete('/artifact/rtf:54Rg1sFj9QbqI')
                    .expect(200, done)
                    .send()
                ;
            });
        });

        describe('forged delete request to an unclaimed artifact id', () => {
            it('should return 404', (done) => {
                request(instance.server)
                    .delete('/artifact/foobar')
                    .send()
                    .expect(404, done)
                ;
            });
        });
    });

    after(() => {
        cleanup();

        instance.close();
    });
});
