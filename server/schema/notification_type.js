const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const UserType = require('./user_type');

const NotificationType = new GraphQLObjectType({
  name: 'NotificationType',
  fields: () => ({
    id: { type: GraphQLID },
    notificationType: { type: GraphQLString },
    sender: {
      type: UserType
    },
    receivers: {
      type: new GraphQLList(UserType)
    },
    message: { type: GraphQLString }
  })
});

module.exports = NotificationType;
