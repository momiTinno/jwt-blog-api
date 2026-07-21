const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const AUTH_CONSTANTS = require('../constant/auth.constant');
const AUTH_MESSAGES = require('../constant/auth-message.constant');

class AuthValidationMiddleware {
  validateRegister(req, res, next) {
    const { name, email, password } = req.body || {};

    if (typeof name !== 'string' || !name.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.NAME_REQUIRED));
    }

    if (typeof email !== 'string' || !email.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.EMAIL_REQUIRED));
    }


    if (typeof password !== 'string' || !password.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.PASSWORD_REQUIRED));
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedName.length < AUTH_CONSTANTS.NAME_MIN_LENGTH ||
      normalizedName.length > AUTH_CONSTANTS.NAME_MAX_LENGTH
    ) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.NAME_LENGTH_INVALID));
    }

    if (!AUTH_CONSTANTS.EMAIL_PATTERN.test(normalizedEmail)) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.EMAIL_INVALID));
    }

    if (
      password.length < AUTH_CONSTANTS.PASSWORD_MIN_LENGTH ||
      password.length > AUTH_CONSTANTS.PASSWORD_MAX_LENGTH
    ) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.PASSWORD_LENGTH_INVALID));
    }

    req.validatedBody = {
      name: normalizedName,
      email: normalizedEmail,
      password,
    };

    return next();
  }

  validateLogin(req, res, next) {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || !email.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.EMAIL_REQUIRED));
    }

    if (typeof password !== 'string' || !password.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.PASSWORD_REQUIRED));
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!AUTH_CONSTANTS.EMAIL_PATTERN.test(normalizedEmail)) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.EMAIL_INVALID));
    }

    req.validatedBody = {
      email: normalizedEmail,
      password,
    };

    return next();
  }
}

module.exports = new AuthValidationMiddleware();
