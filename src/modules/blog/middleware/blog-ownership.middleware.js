const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const BLOG_MESSAGES = require('../constant/blog-message.constant');

class BlogOwnershipMiddleware {
  authorize(req, res, next) {
    if (req.blog.user_id !== req.currentUser.id) {
      return next(new AppError(HTTP_STATUS.FORBIDDEN, BLOG_MESSAGES.NOT_OWNER));
    }

    return next();
  }
}

module.exports = new BlogOwnershipMiddleware();
