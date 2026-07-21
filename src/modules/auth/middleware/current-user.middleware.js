const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const authDbService = require('../service/auth-db.service');
const AUTH_CONSTANTS = require('../constant/auth.constant');
const AUTH_MESSAGES = require('../constant/auth-message.constant');

class CurrentUserMiddleware {
  constructor(authDbServiceInstance) {
    this.authDbService = authDbServiceInstance;
    this.load = this.load.bind(this);
  }

  async load(req, res, next) {
    const userId = req.auth && req.auth.userId;

    if (!AUTH_CONSTANTS.UUID_PATTERN.test(userId || '')) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN));
    }

    const user = await this.authDbService.findUserById(userId);

    if (!user) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN));
    }

    req.currentUser = user;
    return next();
  }
}

module.exports = new CurrentUserMiddleware(authDbService);
