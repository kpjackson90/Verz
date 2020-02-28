const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const CommentType = require('./comment_type').default;

const Post = mongoose.model('post');

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    snaps: { type: GraphQLInt },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    unsnaps: { type: GraphQLInt },
    date: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.findComments(parentValue.id);
      }
    },
    author: {
      // eslint-disable-next-line global-require
      type: require('./user_type'),
      async resolve(parentValue) {
        const author = await Post.findAuthor(parentValue.id);
        return author;
      }
    }
  })
});

module.exports = PostType;
