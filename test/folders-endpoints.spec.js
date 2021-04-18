const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { expect } = require("chai");
const { makeFoldersArray } = require("./folders.fixtures");

describe("Folders Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("noteful_folders").truncate());

  afterEach("cleanup", () => db("noteful_folders").truncate());

  describe.only(`GET /api/folders`, () => {
    context(`Given no folders`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/folders").expect(200, []);
      });
    });
  });
});
