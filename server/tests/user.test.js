const { graphql } = require("graphql");
const schema = require("../../server/schema/schema");
const User = mongoose.model("user");
const { setupDB } = require("./config/databaseConnection");

beforeEach(async () => await setupDB());

describe("test", () => {
  it("should be null when user is not logged in", async () => {
    const query = `
          user {
              username
          }
      `;

    const rootValue = {};

    const result = await graphql(schema, query, rootValue);
    const { data } = result;

    expect(data.user).toBe(null);
    expect(data).toMatchSnapshot();
  });
});
