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
    image: { type: GraphQLString },
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
        const following = await User.findFollowing(parentValue.id);
        return following;
      }
    },
    followers: {
      type: new GraphQLList(UserType),
      async resolve({ id }) {
        const followers = await User.findFollowers(id);
        return followers;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve({ id }) {
        const post = await Post.fetchPost(id);
        return post;
      }
    }
  })
});

module.exports = UserType;
