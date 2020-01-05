const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require("./post_type");
const CommentType = require("./comment_type");
const UserType = require("./user_type");
const User = mongoose.model("user");
const Post = mongoose.model("post");
const Comment = mongoose.model("comment");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Post.findById(id);
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id);
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, { user }) {
        if (!user) {
          throw new Error("You are not authenticated!");
        } else {
          return User.findById(user._id);
        }
      }
    }
  })
});

module.exports = RootQuery;
