const { status: httpStatus } = require("http-status");
const catchAsync = require("../utils/catchAsync");

const { authService, userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;
  await userService.createUser(username, email, password, role);
  res.status(httpStatus.CREATED).send({ message: "Successfully registered" });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.login(username, password);
  const token = await tokenService.generateAccessToken(user);
  res.send({ user, token });
});

module.exports = {
  register,
  login,
};
