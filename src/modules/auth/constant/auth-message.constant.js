const AUTH_MESSAGES = Object.freeze({
  REGISTER_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  PROFILE_FETCH_SUCCESS: 'Current user fetched successfully',
  NAME_REQUIRED: 'Name is required',
  NAME_LENGTH_INVALID: 'Name must be between 2 and 100 characters',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email format is invalid',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_LENGTH_INVALID: 'Password must be between 8 and 128 characters',
  EMAIL_ALREADY_EXISTS: 'Email is already registered',
  INVALID_CREDENTIALS: 'Invalid email or password',
  AUTH_HEADER_REQUIRED: 'Authorization header is required',
  INVALID_AUTH_FORMAT: 'Authorization header must use Bearer token format',
  INVALID_TOKEN: 'Invalid or expired token',
  USER_NOT_FOUND: 'User not found',
});

module.exports = AUTH_MESSAGES;
