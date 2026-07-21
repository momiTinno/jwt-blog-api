const envConfig = require('../config/env.config');
const ERROR_MESSAGES = require('../constant/error-message.constant');
const HTTP_STATUS = require('../constant/http-status.constant');

class ErrorMiddleware {
  handle(error, req, res, next) {
    let statusCode = error.statusCode || error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = ERROR_MESSAGES.INVALID_JSON;
    }

    if (envConfig.nodeEnv === 'development') {
      console.error(error);
    }

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

module.exports = new ErrorMiddleware();
