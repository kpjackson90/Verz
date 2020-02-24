const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require('./post_type');
const CommentType = require('./comment_type');
const UserType = require('./user_type');
const NotificationType = require('./notification_type');
const User = mongoose.model('user');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
const Notification = mongoose.model('notification');
const { errorName } = require('../utils/errorConstants');
const { isValid } = require('../middleware/helpers/isValid.helper');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parentValue, args, { user }) {
        if (isValid(user)) {
          const owner = await User.findById(user._id);
          return await Post.find({ author: owner.following });
        } else {
          return Post.find({});
        }
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
    notifications: {
      type: NotificationType,
      resolve(parentValue, { id }) {
        return Notification.find({});
      }
    },
    user: {
      type: UserType,
      async resolve(parentValue, args, { user }) {
        if (!isValid(user)) {
          throw new Error(errorName.UNAUTHORIZED);
        }
        return await User.findById(user._id);
      }
    }
  })
});

module.exports = RootQuery;
