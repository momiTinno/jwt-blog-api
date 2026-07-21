class BlogFilterService {
  toPublicBlog(blog) {
    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      userId: blog.user_id,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
      author: {
        name: blog.author_name,
        email: blog.author_email,
      },
    };
  }

  toPublicBlogs(blogs) {
    return blogs.map((blog) => this.toPublicBlog(blog));
  }
}

module.exports = new BlogFilterService();
