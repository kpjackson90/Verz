const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');

const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
const User = mongoose.model('user');
const PostType = require('./post_type');
const UserType = require('./user_type');
const CommentType = require('./comment_type');
const AuthService = require('../services/auth');
const { errorName } = require('../utils/errorConstants');
const { isValid } = require('../middleware/helpers/isValid.helper');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }, { req }) {
        try {
          return await AuthService.createUser({ email, password, req });
        } catch (err) {
          return err;
        }
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }, { req }) {
        try {
          return await AuthService.login({ email, password, req });
        } catch (err) {
          return err;
        }
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
        imagePost: { type: GraphQLString },
        tags: { type: GraphQLList(GraphQLString) }
      },
      async resolve(parentValue, { title, body, imagePost, tags }, { user }) {
        if (!isValid(user)) {
          throw new Error(errorName.UNAUTHORIZED);
        }

        const userPost = {
          title,
          body,
          imagePost,
          tags,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id
        };
        const newPost = await Post.addPost(userPost);
        return newPost;
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
          throw new Error(errorName.UNAUTHORIZED);
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
      async resolve(parentValue, { postId }, { user }) {
        if (!isValid(user)) {
          throw new Error(errorName.UNAUTHORIZED);
        }
        const postInfo = {
          id: postId,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id
        };
        const favorite = await User.favorite(postInfo);
        return favorite;
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
          throw new Error(errorName.UNAUTHORIZED);
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
    },
    followUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parentValue, { userId }, { user }) {
        if (!isValid(user)) {
          throw new Error(errorName.UNAUTHORIZED);
        }

        const userInfo = {
          id: userId,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id
        };
        const following = await User.followUser(userInfo);
        return following;
      }
    },
    unFollowUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parentValue, { userId }, { user }) {
        if (!isValid(user)) {
          throw new Error(errorName.UNAUTHORIZED);
        }

        const userInfo = {
          id: userId,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id
        };
        const unfollowing = await User.unFollowUser(userInfo);
        return unfollowing;
      }
    },
    sharePost: {
      type: UserType,
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, { postId }, { user }) {
        if (!isValid(user)) {
          throw new Error(errorName.UNAUTHORIZED);
        }
        const postInfo = {
          id: postId,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id
        };
        const share = await User.sharePost(postInfo);
        return share;
      }
    }
  }
});

module.exports = mutation;
