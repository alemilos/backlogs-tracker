const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { status: httpStatus } = require("http-status");

async function createUser(username, email, password, role) {
  if (!username || !email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Missing parameters");
  }

  await User.addOne(username, email, password, role);
}

module.exports = { createUser };
