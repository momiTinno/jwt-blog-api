const express = require('express');

const asyncHandler = require('../../middleware/async-handler.middleware');
const contentTypeMiddleware = require('../../middleware/content-type.middleware');
const blogController = require('./blog.controller');
const blogValidationMiddleware = require('./middleware/blog-validation.middleware');
const blogExistenceMiddleware = require('./middleware/blog-existence.middleware');
const blogOwnershipMiddleware = require('./middleware/blog-ownership.middleware');
const jwtAuthMiddleware = require('../auth/middleware/jwt-auth.middleware');
const currentUserMiddleware = require('../auth/middleware/current-user.middleware');

const router = express.Router();

router.post(
  '/',
  contentTypeMiddleware.requireJson,
  asyncHandler.wrap(jwtAuthMiddleware.authenticate),
  asyncHandler.wrap(currentUserMiddleware.load),
  asyncHandler.wrap(blogValidationMiddleware.validateCreate),
  asyncHandler.wrap(blogController.createBlog)
);

router.get('/', asyncHandler.wrap(blogController.getAllBlogs));

router.get(
  '/:id',
  asyncHandler.wrap(blogValidationMiddleware.validateBlogId),
  asyncHandler.wrap(blogExistenceMiddleware.load),
  asyncHandler.wrap(blogController.getBlogById)
);

router.patch(
  '/:id',
  contentTypeMiddleware.requireJson,
  asyncHandler.wrap(jwtAuthMiddleware.authenticate),
  asyncHandler.wrap(currentUserMiddleware.load),
  asyncHandler.wrap(blogValidationMiddleware.validateBlogId),
  asyncHandler.wrap(blogExistenceMiddleware.load),
  asyncHandler.wrap(blogOwnershipMiddleware.authorize),
  asyncHandler.wrap(blogValidationMiddleware.validateUpdateBody),
  asyncHandler.wrap(blogController.updateBlog)
);

router.delete(
  '/:id',
  asyncHandler.wrap(jwtAuthMiddleware.authenticate),
  asyncHandler.wrap(currentUserMiddleware.load),
  asyncHandler.wrap(blogValidationMiddleware.validateBlogId),
  asyncHandler.wrap(blogExistenceMiddleware.load),
  asyncHandler.wrap(blogOwnershipMiddleware.authorize),
  asyncHandler.wrap(blogController.deleteBlog)
);

module.exports = router;
