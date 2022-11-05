const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const Project = require("../models/projects");
const Testimonial = require("../models/testimonials");

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
    codeStatus: { type: GraphQLString },
    liveUrl: { type: GraphQLString },
    liveStatus: { type: GraphQLString },
    previewImageUrl: { type: GraphQLString },
    heroImageUrl: { type: GraphQLString },
  }),
});

// RootQuery Type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "query for a single project",
  fields: () => ({
    singleProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    allProjects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      },
    },
    allTestimonials: {
      type: new GraphQLList(TestimonialType),
      resolve() {
        return Testimonial.find();
      },
    },
  }),
});

// Root Mutation
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "List of all the mutations",
  fields: () => ({
    addProject: {
      type: ProjectType,
      description: "Add a new project",
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        codeUrl: { type: new GraphQLNonNull(GraphQLString) },
        codeStatus: {
          type: new GraphQLEnumType({
            name: "ProjectCodeStatus",
            values: {
              PUBLIC: { value: "PUBLIC" },
              PRIVATE: { value: "PRIVATE" },
            },
          }),
        },
        liveUrl: { type: new GraphQLNonNull(GraphQLString) },
        liveStatus: {
          type: new GraphQLEnumType({
            name: "ProjectLiveStatus",
            values: {
              AVAILABLE: { value: "AVAILABLE" },
              UNAVAILABLE: { value: "UNAVAILABLE" },
            },
          }),
        },
        previewImageUrl: { type: new GraphQLNonNull(GraphQLString) },
        heroImageUrl: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          description: args.description,
          body: args.body,
          codeUrl: args.codeUrl,
          codeStatus: args.codeStatus,
          liveUrl: args.liveUrl,
          liveStatus: args.liveStatus,
          previewImageUrl: args.previewImageUrl,
          heroImageUrl: args.heroImageUrl,
        });

        return project.save();
      },
    },
    // editProject: {},
    deleteProject: {
      type: ProjectType,
      description: "deletes a project",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    addTestimony: {
      type: TestimonialType,
      description: "Add a new testimony",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        testimony: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const testimonial = new Testimonial({
          name: args.name,
          testimony: args.testimony,
          position: args.position,
          imageUrl: args.imageUrl,
        });

        return testimonial.save();
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
