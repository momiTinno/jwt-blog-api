const BLOG_QUERIES = Object.freeze({
  CREATE: 'INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)',
  FIND_ALL: `
    SELECT
      b.id,
      b.title,
      b.content,
      b.user_id,
      b.created_at,
      b.updated_at,
      u.name AS author_name,
      u.email AS author_email
    FROM blogs b
    INNER JOIN users u ON u.id = b.user_id
    ORDER BY b.created_at DESC
  `,
  FIND_BY_ID: `
    SELECT
      b.id,
      b.title,
      b.content,
      b.user_id,
      b.created_at,
      b.updated_at,
      u.name AS author_name,
      u.email AS author_email
    FROM blogs b
    INNER JOIN users u ON u.id = b.user_id
    WHERE b.id = ?
    LIMIT 1
  `,
  UPDATE_BY_ID: 'UPDATE blogs SET title = ?, content = ? WHERE id = ?',
  DELETE_BY_ID: 'DELETE FROM blogs WHERE id = ?',
});

module.exports = BLOG_QUERIES;
