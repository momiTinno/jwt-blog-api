const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const authDbService = require('../service/auth-db.service');
const passwordService = require('../service/password.service');
const AUTH_MESSAGES = require('../constant/auth-message.constant');

class CredentialMiddleware {
  constructor(authDbServiceInstance, passwordServiceInstance) {
    this.authDbService = authDbServiceInstance;
    this.passwordService = passwordServiceInstance;
    this.authenticateCredentials = this.authenticateCredentials.bind(this);
  }

  async authenticateCredentials(req, res, next) {
    const user = await this.authDbService.findUserByEmail(req.validatedBody.email);

    if (!user) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_CREDENTIALS));
    }

    const isPasswordValid = await this.passwordService.compare(
      req.validatedBody.password,
      user.password
    );

    if (!isPasswordValid) {
      return next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_CREDENTIALS));
    }

    req.authenticatedUser = user;
    return next();
  }
}

module.exports = new CredentialMiddleware(authDbService, passwordService);
