const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const AUTH_CONSTANTS = require('../constant/auth.constant');
const AUTH_MESSAGES = require('../constant/auth-message.constant');
const tokenService = require('../service/token.service');

class JwtAuthMiddleware {
  constructor(tokenServiceInstance) {
    this.tokenService = tokenServiceInstance;
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_HEADER_REQUIRED));
    }

    const [tokenPrefix, token] = authorizationHeader.split(' ');

    if (tokenPrefix !== AUTH_CONSTANTS.TOKEN_PREFIX || !token) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_AUTH_FORMAT));
    }

    try {
      req.auth = this.tokenService.verify(token);
    } catch (error) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN));
    }

    return next();
  }
}

module.exports = new JwtAuthMiddleware(tokenService);
