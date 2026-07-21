const express = require('express');

const asyncHandler = require('../../middleware/async-handler.middleware');
const contentTypeMiddleware = require('../../middleware/content-type.middleware');
const authController = require('./auth.controller');
const authValidationMiddleware = require('./middleware/auth-validation.middleware');
const emailAvailabilityMiddleware = require('./middleware/email-availability.middleware');
const credentialMiddleware = require('./middleware/credential.middleware');
const jwtAuthMiddleware = require('./middleware/jwt-auth.middleware');
const currentUserMiddleware = require('./middleware/current-user.middleware');

const router = express.Router();

router.post(
  '/register',
  contentTypeMiddleware.requireJson,
  asyncHandler.wrap(authValidationMiddleware.validateRegister),
  asyncHandler.wrap(emailAvailabilityMiddleware.ensureEmailAvailable),
  asyncHandler.wrap(authController.register)
);

router.post(
  '/login',
  contentTypeMiddleware.requireJson,
  asyncHandler.wrap(authValidationMiddleware.validateLogin),
  asyncHandler.wrap(credentialMiddleware.authenticateCredentials),
  asyncHandler.wrap(authController.login)
);

router.get(
  '/me',
  asyncHandler.wrap(jwtAuthMiddleware.authenticate),
  asyncHandler.wrap(currentUserMiddleware.load),
  asyncHandler.wrap(authController.me)
);

module.exports = router;
