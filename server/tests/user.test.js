const app = require("../server.js");
const supertest = require("supertest");
const request = supertest(app);
const { setupDB } = require("./config/databaseConnection");

beforeEach(async () => await setupDB());

describe("this is a test test", () => {
  it("test endpoint", async () => {
    const query = `
    {
      user{
          id,
          email,
          followers{
              email
          },
          following{
              id,
              email,
              posts{
                  title,
                  body
              }
              
          }
      }
  }
    `;
    const res = await request.post("/graphql").send({ query });

    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0]).toHaveProperty(
      "message",
      "Authentication is needed to get requested response."
    );
    expect(res.body.errors[0]).toHaveProperty("statusCode", 401);
    expect(res.body.data).toHaveProperty("user", null);
  });
});
