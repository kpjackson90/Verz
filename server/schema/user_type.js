const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    bio: { type: GraphQLString },
    location: { type: GraphQLString },
    following: {
      type: GraphQLList,
      resolve(parentValue) {
        return User.findFollowers(parentValue.id);
      }
    }
  }
});

module.exports = UserType;
