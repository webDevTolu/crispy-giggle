const { GraphQLSchema, GraphQLObjectType, GraphQLID } = require("graphql");

// QUERIES
const TestimonyType = new GraphQLObjectType({
  name: "Testimony",
  description: "Testimony Type",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
const RootQuery = new GraphQLObjectType({});

// MUTATION
const RootMutation = new GraphQLObjectType({});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
