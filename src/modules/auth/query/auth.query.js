const AUTH_QUERIES = Object.freeze({
  FIND_USER_BY_EMAIL:
    'SELECT id, name, email, password, created_at, updated_at FROM users WHERE email = ? LIMIT 1',
  FIND_USER_BY_ID:
    'SELECT id, name, email, password, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
  CREATE_USER: 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
});

module.exports = AUTH_QUERIES;
