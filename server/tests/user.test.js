const { graphql } = require("graphql");
const schema = require("../../schema/schema");
const User = mongoose.model("user");
const { getContext, setupTest } = require("./config/helper");

beforeEach(async () => await setupTest());

it("should be null when user is not logged in", async () => {
  const query = `
        user {
            username
        }
    `;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.user).toBe(null);
  expect(data).toMatchSnapshot();
});
