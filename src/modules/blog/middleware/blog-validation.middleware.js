const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const BLOG_CONSTANTS = require('../constant/blog.constant');
const BLOG_MESSAGES = require('../constant/blog-message.constant');

class BlogValidationMiddleware {
  validateCreate(req, res, next) {
    const { title, content } = req.body || {};

    if (typeof title !== 'string' || !title.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.TITLE_REQUIRED));
    }

    if (typeof content !== 'string' || !content.trim()) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.CONTENT_REQUIRED));
    }

    const normalizedTitle = title.trim();
    const normalizedContent = content.trim();

    if (normalizedTitle.length > BLOG_CONSTANTS.TITLE_MAX_LENGTH) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.TITLE_TOO_LONG));
    }

    req.validatedBody = {
      title: normalizedTitle,
      content: normalizedContent,
    };

    return next();
  }

  validateBlogId(req, res, next) {
    const blogId = Number(req.params.id);

    if (!Number.isInteger(blogId) || blogId <= 0) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.ID_INVALID));
    }

    req.blogId = blogId;
    return next();
  }

  validateUpdateBody(req, res, next) {
    const body = req.body || {};
    const keys = Object.keys(body);

    if (keys.length === 0) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.EMPTY_UPDATE));
    }

    const hasInvalidField = keys.some((key) => !BLOG_CONSTANTS.UPDATABLE_FIELDS.includes(key));

    if (hasInvalidField) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.INVALID_UPDATE_FIELD));
    }

    const validatedBody = {};

    if (Object.prototype.hasOwnProperty.call(body, 'title')) {
      if (typeof body.title !== 'string' || !body.title.trim()) {
        return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.TITLE_REQUIRED));
      }

      const normalizedTitle = body.title.trim();

      if (normalizedTitle.length > BLOG_CONSTANTS.TITLE_MAX_LENGTH) {
        return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.TITLE_TOO_LONG));
      }

      validatedBody.title = normalizedTitle;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'content')) {
      if (typeof body.content !== 'string' || !body.content.trim()) {
        return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.CONTENT_REQUIRED));
      }

      validatedBody.content = body.content.trim();
    }

    if (Object.keys(validatedBody).length === 0) {
      return next(new AppError(HTTP_STATUS.BAD_REQUEST, BLOG_MESSAGES.EMPTY_UPDATE));
    }

    req.validatedBody = validatedBody;
    return next();
  }
}

module.exports = new BlogValidationMiddleware();
