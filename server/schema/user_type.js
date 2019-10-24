const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    username: { type: GraphQLString }
  }
});

module.exports = UserType;
