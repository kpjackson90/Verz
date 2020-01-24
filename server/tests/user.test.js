const app = require("../server.js");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const request = supertest(app);
const { graphql } = require("graphql");
const schema = require("../../server/schema/schema");
const User = mongoose.model("User", new mongoose.Schema({ name: String }));

//jest.setTimeout(600000);

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoURI = await mongoServer.getUri();
  await mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) console.error(err);
    }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("this is a test test", () => {
  it("test endpoint", async () => {
    const res = await request.get("/graphql");

    expect(response.status).toBe(200);
    done();
  });
});
