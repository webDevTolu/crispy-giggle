const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./helpers/connectDB");

const app = express();

// connect to database
// connectDB();

// middleware
// app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: require("./schema/schema"),
    // graphiql: true,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started at post: ${PORT}`));
