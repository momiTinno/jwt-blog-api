const BLOG_MESSAGES = require('./constant/blog-message.constant');
const blogDbService = require('./service/blog-db.service');
const blogHelperService = require('./service/blog-helper.service');
const blogFilterService = require('./service/blog-filter.service');

class BlogService {
  constructor(blogDbServiceInstance, blogHelperServiceInstance, filterService) {
    this.blogDbService = blogDbServiceInstance;
    this.blogHelperService = blogHelperServiceInstance;
    this.filterService = filterService;
  }

  async createBlog({ currentUser, data }) {
    const blog = await this.blogDbService.create({
      title: data.title,
      content: data.content,
      userId: currentUser.id,
    });

    return {
      success: true,
      message: BLOG_MESSAGES.CREATE_SUCCESS,
      data: this.filterService.toPublicBlog(blog),
    };
  }

  async getAllBlogs() {
    const blogs = await this.blogDbService.findAll();
    return {
      success: true,
      message: BLOG_MESSAGES.FETCH_ALL_SUCCESS,
      data: this.filterService.toPublicBlogs(blogs),
    };
  }

  async getBlogById(blog) {
    return {
      success: true,
      message: BLOG_MESSAGES.FETCH_ONE_SUCCESS,
      data: this.filterService.toPublicBlog(blog),
    };
  }

  async updateBlog({ blog, changes }) {
    const updatePayload = this.blogHelperService.buildUpdatePayload(blog, changes);
    const updatedBlog = await this.blogDbService.updateById(blog.id, updatePayload);

    return {
      success: true,
      message: BLOG_MESSAGES.UPDATE_SUCCESS,
      data: this.filterService.toPublicBlog(updatedBlog),
    };
  }

  async deleteBlog(blog) {
    await this.blogDbService.deleteById(blog.id);
    return {
      success: true,
      message: BLOG_MESSAGES.DELETE_SUCCESS,
    };
  }
}

module.exports = new BlogService(blogDbService, blogHelperService, blogFilterService);
