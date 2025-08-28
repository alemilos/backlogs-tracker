const logger = require("../config/logger");
const { status: httpStatus } = require("http-status");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  logger.error(err);
  res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(response);
};

module.exports = errorHandler;
