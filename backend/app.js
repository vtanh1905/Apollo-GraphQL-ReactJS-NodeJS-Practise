require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("home");
});

// Connect DB
require("./tools/mongoose/index");

// Appolo Server
require("./tools/apollo/index").applyMiddleware({ app });

// Catch 404
require("./config/error")(app);

module.exports = app;
