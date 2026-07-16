const ERROR_MESSAGES = Object.freeze({
  ROUTE_NOT_FOUND: "Route not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_JSON: "Invalid JSON request body",
  UNAUTHORIZED: "Authentication is required",
  FORBIDDEN: "You are not allowed to perform this action"
});

module.exports = ERROR_MESSAGES;