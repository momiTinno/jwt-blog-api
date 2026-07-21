const HTTP_STATUS = require('../../../constant/http-status.constant');
const AppError = require('../../../utils/app-error');
const blogDbService = require('../service/blog-db.service');
const BLOG_MESSAGES = require('../constant/blog-message.constant');

class BlogExistenceMiddleware {
  constructor(blogDbServiceInstance) {
    this.blogDbService = blogDbServiceInstance;
    this.load = this.load.bind(this);
  }

  async load(req, res, next) {
    const blog = await this.blogDbService.findById(req.blogId);

    if (!blog) {
      return next(new AppError(HTTP_STATUS.NOT_FOUND, BLOG_MESSAGES.BLOG_NOT_FOUND));
    }

    req.blog = blog;
    return next();
  }
}

module.exports = new BlogExistenceMiddleware(blogDbService);
