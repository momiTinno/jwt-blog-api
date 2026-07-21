const BLOG_MESSAGES = Object.freeze({
  CREATE_SUCCESS: 'Blog created successfully',
  FETCH_ALL_SUCCESS: 'Blogs fetched successfully',
  FETCH_ONE_SUCCESS: 'Blog fetched successfully',
  UPDATE_SUCCESS: 'Blog updated successfully',
  DELETE_SUCCESS: 'Blog deleted successfully',
  ID_INVALID: 'Blog id must be a positive integer',
  TITLE_REQUIRED: 'Title is required',
  CONTENT_REQUIRED: 'Content is required',
  TITLE_TOO_LONG: 'Title must not exceed 255 characters',
  BLOG_NOT_FOUND: 'Blog not found',
  NOT_OWNER: 'You are not allowed to modify this blog',
  EMPTY_UPDATE: 'At least one allowed field is required for update',
  INVALID_UPDATE_FIELD: 'Only title and content can be updated',
});

module.exports = BLOG_MESSAGES;
