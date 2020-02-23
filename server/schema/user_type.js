const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model('user');
const Post = mongoose.model('post');
const PostType = require('./post_type');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString },
    bio: { type: GraphQLString },
    location: { type: GraphQLString },
    favorites: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        return User.favorite(parentValue.id);
      }
    },
    following: {
      type: new GraphQLList(UserType),
      async resolve(parentValue) {
        return await User.findFollowing(parentValue.id);
      }
    },
    followers: {
      type: new GraphQLList(UserType),
      async resolve({ id }) {
        return await User.findFollowers(id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve({ id }) {
        return await Post.fetchPost(id);
      }
    },
    notifications: {
      type: new GraphQLList(GraphQLString),
      async resolve({ id }) {
        return await User.notify(id);
      }
    }
  })
});

module.exports = UserType;
