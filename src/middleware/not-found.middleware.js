const ERROR_MESSAGES = require("../constant/error-message.constant");

function notFoundMiddleware(req, res) {
  return res.status(404).json({
    success: false,
    message: ERROR_MESSAGES.ROUTE_NOT_FOUND,
    path: req.originalUrl
  });
}

module.exports = notFoundMiddleware;