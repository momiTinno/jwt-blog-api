const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const authDbService = require('../service/auth-db.service');
const AUTH_MESSAGES = require('../constant/auth-message.constant');

class EmailAvailabilityMiddleware {
  constructor(authDbServiceInstance) {
    this.authDbService = authDbServiceInstance;
    this.ensureEmailAvailable = this.ensureEmailAvailable.bind(this);
  }

  async ensureEmailAvailable(req, res, next) {
    const existingUser = await this.authDbService.findUserByEmail(req.validatedBody.email);

    if (existingUser) {
      return next(new AppError(HTTP_STATUS.CONFLICT, AUTH_MESSAGES.EMAIL_ALREADY_EXISTS));
    }

    return next();
  }
}

module.exports = new EmailAvailabilityMiddleware(authDbService);
