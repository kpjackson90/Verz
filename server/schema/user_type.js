const mongoose = require('mongoose');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const User = mongoose.model('user');
const Post = mongoose.model('post');
const PostType = require('./post_type');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {type: GraphQLID},
    token: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
    bio: {type: GraphQLString},
    location: {type: GraphQLString},
    favorites: {
      type: GraphQLList(PostType),
      resolve(parentValue) {
        return User.favorite(parentValue.id);
      }
    },
    following: {
      type: GraphQLList(UserType),
      resolve(parentValue) {
        return User.findFollowers(parentValue.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parentValue) {
        return await User.fetchPost(parentValue.id);
      }
    }
  })
});

module.exports = UserType;
