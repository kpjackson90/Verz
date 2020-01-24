require("@babel/polyfill");
const express = require("express");
const mongoose = require("mongoose");
require("./models");
const expressGraphQL = require("express-graphql");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const schema = require("./schema/schema");
const path = require("path");
const { auth } = require("./middleware/isAuth");
const getErrorCode = require("./utils/errorHandler");

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/graphql", (req, res) => {
  auth,
    expressGraphQL({
      schema,
      context: {
        req,
        user: req.user
      },
      // graphiql: process.env.NODE_ENV === 'development',
      graphiql: true,

      customFormatErrorFn: err => {
        const { message, statusCode } = getErrorCode(err);
        return { message, statusCode };
      }
    })(req, res);
});

if (process.env.NODE_ENV !== "production") {
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.config.js");
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
  });
}

module.exports = app;
