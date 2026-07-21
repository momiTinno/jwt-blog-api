const ERROR_MESSAGES = require('../constant/error-message.constant');
const HTTP_STATUS = require('../constant/http-status.constant');

class NotFoundMiddleware {
  handle(req, res) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: ERROR_MESSAGES.ROUTE_NOT_FOUND,
    });
  }
}

module.exports = new NotFoundMiddleware();
