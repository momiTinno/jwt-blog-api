# JWT Blog API

JWT-authenticated blog management REST API built with Node.js, Express.js, and MySQL using a class-based architecture.

## Features

- Register users with UUID primary keys
- Log in with JWT access tokens
- Get the current authenticated user
- Create, list, read, update, and delete blog posts
- Enforce blog ownership in middleware
- Centralized error handling with consistent JSON responses
- Prettier formatting scripts
- Postman collection and environment included

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- jsonwebtoken
- bcryptjs
- dotenv
- cors

## Project Structure

```text
src/
  config/
  constant/
  db/mysql/
  middleware/
  modules/
    auth/
    blog/
    user/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with valid MySQL credentials and a JWT secret.

4. Create or sync the schema:

```bash
npm run db:init
```

5. Start the server:

```bash
npm run dev
```

The API runs on `http://localhost:5000` unless `PORT` is changed.

## Environment Variables

Required values:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

See [.env.example](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/.env.example:1).

## API Endpoints

### Health

- `GET /health`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Blogs

- `POST /api/blogs`
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `PATCH /api/blogs/:id`
- `DELETE /api/blogs/:id`

## Example Requests

Register:

```json
{
  "name": "Momitul",
  "email": "momitul@example.com",
  "password": "SecurePass123"
}
```

Create blog:

```json
{
  "title": "My first post",
  "content": "This is the blog content"
}
```

## Response Shape

Success:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {}
}
```

Failure:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Manual Testing

Use the included Postman files:

- [postman/JWT-Blog-API.postman_collection.json](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/postman/JWT-Blog-API.postman_collection.json:1)
- [postman/JWT-Blog-API.postman_environment.json](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/postman/JWT-Blog-API.postman_environment.json:1)

The login request stores the JWT token into the Postman environment automatically.

## Notes

- Users use UUIDs stored as `CHAR(36)`.
- Blogs keep numeric IDs and reference `users.id` through `blogs.user_id`.
- The optional `user` module scaffold exists but is not part of the required core API scope.
