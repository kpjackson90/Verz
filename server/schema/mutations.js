const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const mongoose = require("mongoose");
const Post = mongoose.model("post");
const Comment = mongoose.model("comment");
const User = mongoose.model("user");
const PostType = require("./post_type");
const UserType = require("./user_type");
const CommentType = require("./comment_type");
const AuthService = require("../services/auth");
const { notAuthorized } = require("../middleware/errorHandlers");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.createUser({ email, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    verify: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(parentValue, { token }, req) {
        return AuthService.verifyToken({ token, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) }
      },
      resolve(parentValue, { title, body, tags }, context) {
        if (!context.user) {
          throw new Error(notAuthorized);
        } else {
          return new Post({ title, body, tags }).save();
        }
      }
    },
    addCommentToPost: {
      type: PostType,
      args: {
        content: { type: GraphQLString },
        postId: { type: GraphQLID }
      },
      resolve(parentValue, { content, postId }, context) {
        if (!context.user) {
          throw new Error(notAuthorized);
        } else {
          return Post.addComment(postId, content);
        }
      }
    },
    favoritePost: {
      type: PostType,
      args: {
        postId: { type: GraphQLID }
      },
      resolve(parentValue, { postId }, context) {
        if (!context.user) {
          throw new Error(notAuthorized);
        } else {
          return User.favorite(postId);
        }
      }
    },
    addUserInfo: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve(parentValue, { username, bio, location }, context) {
        if (!context.user) {
          throw new Error(notAuthorized);
        } else {
          return new User({ username, bio, location }).save();
        }
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return User.remove({ _id: id });
      }
    },
    snapPost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.snap(id);
      }
    },
    unsnapPost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.unsnap(id);
      }
    },
    snapComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.snap(id);
      }
    },
    unsnapComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.unsnap(id);
      }
    },
    deletePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
