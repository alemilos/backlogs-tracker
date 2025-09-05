const jwt = require("jsonwebtoken");
const moment = require("moment");

const TOKEN_EXP_TIME = 30; // minutes

/**
 * Verify token
 * @param {string} token
 * @returns {Promise<Token>}
 */
const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);
  return payload;
};

/**
 * Generate access token
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAccessToken = async (user) => {
  const expires = moment().add(TOKEN_EXP_TIME, "minutes");

  const payload = {
    sub: user?.id,
    iat: moment().unix(),
    exp: expires.unix(),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    token,
    expires: expires.toDate(),
  };
};

module.exports = {
  verifyToken,
  generateAccessToken,
};
