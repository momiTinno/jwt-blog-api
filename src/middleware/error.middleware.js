const envConfig = require("../config/env.config");
const ERROR_MESSAGES = require("../constant/error-message.constant");

function errorMiddleware(error, req, res, next) {
  let statusCode = error.statusCode || error.status || 500;
  let message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

  // Handles malformed JSON request bodies.
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    statusCode = 400;
    message = ERROR_MESSAGES.INVALID_JSON;
  }

  if (envConfig.nodeEnv === "development") {
    console.error(error);
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = errorMiddleware;