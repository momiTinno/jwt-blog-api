const HTTP_STATUS = require('../../constant/http-status.constant');
const blogService = require('./blog.service');

class BlogController {
  constructor(blogServiceInstance) {
    this.blogService = blogServiceInstance;
    this.createBlog = this.createBlog.bind(this);
    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.getBlogById = this.getBlogById.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
  }

  async createBlog(req, res) {
    const result = await this.blogService.createBlog({
      currentUser: req.currentUser,
      data: req.validatedBody,
    });

    return res.status(HTTP_STATUS.CREATED).json(result);
  }

  async getAllBlogs(req, res) {
    const result = await this.blogService.getAllBlogs();
    return res.status(HTTP_STATUS.OK).json(result);
  }

  async getBlogById(req, res) {
    const result = await this.blogService.getBlogById(req.blog);
    return res.status(HTTP_STATUS.OK).json(result);
  }

  async updateBlog(req, res) {
    const result = await this.blogService.updateBlog({
      blog: req.blog,
      changes: req.validatedBody,
    });

    return res.status(HTTP_STATUS.OK).json(result);
  }

  async deleteBlog(req, res) {
    const result = await this.blogService.deleteBlog(req.blog);
    return res.status(HTTP_STATUS.OK).json(result);
  }
}

module.exports = new BlogController(blogService);
