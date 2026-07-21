class BlogHelperService {
  buildUpdatePayload(blog, changes) {
    return {
      title: Object.prototype.hasOwnProperty.call(changes, 'title') ? changes.title : blog.title,
      content: Object.prototype.hasOwnProperty.call(changes, 'content')
        ? changes.content
        : blog.content,
    };
  }
}

module.exports = new BlogHelperService();
