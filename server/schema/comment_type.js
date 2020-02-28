const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const Comment = mongoose.model('comment');

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    snaps: { type: GraphQLInt },
    unsnaps: { type: GraphQLInt },
    content: { type: GraphQLString },
    post: {
      // eslint-disable-next-line global-require
      type: require('./post_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue)
          .populate('post')
          .then(comment => {
            return comment.post;
          });
      }
    }
  })
});

module.exports = CommentType;
