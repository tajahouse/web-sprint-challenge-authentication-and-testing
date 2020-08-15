const request = require('supertest');
const server = require('../api/server.js');
const { expectCt } = require('helmet');

describe('auth-router.js', () => {
    describe('GET /', () => {
        let res = {};
        beforeAll(async() => {
            res = await request(server).get('/api/auth');
        });

        it('should return 200 ok', () => {
            expect(res.status).toBe(200);
        });
        it('should return server on message bark bark ', () => {
            expect(res.body).toEqual({  message: `🐶 You're barking up the right 🌴` });
        });
    });
});

describe('dadjokes.js', () => {
    describe('GET /', () => {
        let res = {};
        beforeAll(async() => {
            res = await (await request(server).get('/api/jokes')).auth(token, {type: ''});
        });

        it('should return 200 ok', () => {
            expect(res.status).toBe(200);
        });
    });
});


