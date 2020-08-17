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

describe('dad jokes', () =>{
    test('GET /',  async () =>{
        const res = await request(server).get('/api/jokes')
        expect(res.statusCode).toBe(401)
    })
    test('type', async() =>{
        const res = await request(server).get('/api/jokes')
        expect(res.type).toBe("application/json")
    })
})



