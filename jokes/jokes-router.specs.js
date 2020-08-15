const request = require('supertest');
const server = require('../data/server');

describe('dad jokes router', () =>{
    it("Get /", async () =>{
        const response = await request(server).get("/api/jokes")
    })
})