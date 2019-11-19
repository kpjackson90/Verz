const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;
const CommentType = require("./comment_type");
const Post = mongoose.model("post");

const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    snaps: { type: GraphQLInt },
    unsnaps: { type: GraphQLInt },
    date: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.findComments(parentValue.id);
      }
    }
  })
});

module.exports = PostType;
