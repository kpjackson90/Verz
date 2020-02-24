const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model('user');

const NotificationType = new GraphQLObjectType({
  name: 'NotificationType',
  fields: () => ({
    id: { type: GraphQLID },
    notificationType: { type: GraphQLString },
    sender: {
      type: require('./user_type'),
      async resolve({ id }) {
        return await User.findSender(id);
      }
    },
    receivers: {
      type: new GraphQLList(require('./user_type')),
      async resolve(parentValue) {
        return await User.findReceivers(parentValue.id);
      }
    },
    message: { type: GraphQLString }
  })
});

module.exports = NotificationType;
