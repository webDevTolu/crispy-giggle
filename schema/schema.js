const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const { projects, testimonials } = require("../sampleData");

// Testimonial Type
const TestimonialType = new GraphQLObjectType({
  name: "TestimonialType",
  description: "Testimonials",
  fields: () => ({
    name: { type: GraphQLString },
    testimony: { type: GraphQLString },
    position: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "Project Type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    body: { type: GraphQLString },
    codeUrl: { type: GraphQLString },
    liveUrl: { type: GraphQLString },
    previewImageUrl: { type: GraphQLString },
    heroImageUrl: { type: GraphQLString },
  }),
});

// RootQuery Type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "query for a single project",
  fields: {
    singleProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
    allProjects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return projects;
      },
    },
    allTestimonials: {
      type: new GraphQLList(TestimonialType),
      resolve() {
        return testimonials;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
