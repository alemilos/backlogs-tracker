const { status: httpStatus } = require("http-status");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const logger = require("../config/logger");

async function login(username, password) {
  if (!password || !username) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Username and Password are required"
    );
  }

  let user;
  if (username) {
    user = await User.selectOneByUsernamePassword(username, password);
  }

  logger.info(user);

  if ((Array.isArray(user) && user.length === 0) || !user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Credentials");
  }

  return user[0];
}

module.exports = { login };
