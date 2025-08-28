const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const ApiError = require("./utils/ApiError");
const errorHandler = require("./middlewares/errorHandler");
const { status: httpStatus } = require("http-status");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// Handle routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;
