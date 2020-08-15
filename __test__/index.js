const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("Server", () => {
  test("env setup", () => {
    expect(processs.env.DB_ENV).toBe("development");
  });
});
