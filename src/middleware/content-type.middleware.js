const ERROR_MESSAGES = require('../constant/error-message.constant');
const HTTP_STATUS = require('../constant/http-status.constant');
const AppError = require('../utils/app-error');

class ContentTypeMiddleware {
  requireJson(req, res, next) {
    if (!req.is('application/json')) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_CONTENT_TYPE));
    }

    return next();
  }
}

module.exports = new ContentTypeMiddleware();
