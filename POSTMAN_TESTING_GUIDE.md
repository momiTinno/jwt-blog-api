# Postman Testing Guide

This guide explains how to test the JWT Blog API with the Postman extension inside VSCode.

## Prerequisites

Before opening Postman, make sure the API and database are ready.

1. Install dependencies:

```bash
npm install
```

2. Make sure `.env` contains valid MySQL and JWT values.

3. Initialize the schema if needed:

```bash
npm run db:init
```

4. Start the server:

```bash
npm run dev
```

5. Confirm the API is running:

```text
GET http://localhost:5000/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

## Included Files

Use these files from the repository:

- [postman/JWT-Blog-API.postman_collection.json](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/postman/JWT-Blog-API.postman_collection.json:1)
- [postman/JWT-Blog-API.postman_environment.json](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/postman/JWT-Blog-API.postman_environment.json:1)

## Import Into VSCode Postman Extension

1. Open the Postman extension in VSCode.
2. Choose `Import`.
3. Import the collection file:
   `postman/JWT-Blog-API.postman_collection.json`
4. Import the environment file:
   `postman/JWT-Blog-API.postman_environment.json`
5. Select the imported environment before running requests.

## Environment Variables

The environment includes:

- `rootUrl` = `http://localhost:5000`
- `baseUrl` = `http://localhost:5000/api`
- `email`
- `password`
- `token`
- `userId`
- `blogId`

Recommended setup:

- Set `email` to a fresh address before each clean registration test.
- Keep `password` as `SecurePass123` unless you are testing password validation.

Example:

```text
email=tester1@example.com
password=SecurePass123
```

## Request Order For Happy-Path Testing

Run the requests in this order:

1. `Health -> Check server`
2. `Auth -> Register user`
3. `Auth -> Login user`
4. `Auth -> Get current user`
5. `Blogs -> Create blog`
6. `Blogs -> Get all blogs`
7. `Blogs -> Get blog by ID`
8. `Blogs -> Update blog`
9. `Blogs -> Delete blog`

## Automatic Variable Updates

The included collection already stores values automatically.

- `Register user` saves `userId`
- `Login user` saves `token` and `userId`
- `Create blog` saves `blogId`

That means after login and create-blog, later requests should work without manual copy/paste.

## Core Happy-Path Tests

### 1. Register user

Request:

```text
POST {{baseUrl}}/auth/register
```

Body:

```json
{
  "name": "Momitul",
  "email": "{{email}}",
  "password": "{{password}}"
}
```

Expected:

- Status `201`
- `success` is `true`
- response contains a UUID `data.id`
- response does not contain `password`

### 2. Login user

Request:

```text
POST {{baseUrl}}/auth/login
```

Expected:

- Status `200`
- `success` is `true`
- response contains `data.token`
- response contains `data.user.id`
- `token` is saved into the environment

### 3. Get current user

Request:

```text
GET {{baseUrl}}/auth/me
```

Header:

```text
Authorization: Bearer {{token}}
```

Expected:

- Status `200`
- returned user matches the logged-in account
- no password field is returned

### 4. Create blog

Request:

```text
POST {{baseUrl}}/blogs
```

Body:

```json
{
  "title": "My first post",
  "content": "This is the blog content"
}
```

Expected:

- Status `201`
- `success` is `true`
- response contains numeric `data.id`
- response contains UUID `data.userId`
- `blogId` is saved into the environment

### 5. Get all blogs

Request:

```text
GET {{baseUrl}}/blogs
```

Expected:

- Status `200`
- `success` is `true`
- `data` is an array

### 6. Get blog by ID

Request:

```text
GET {{baseUrl}}/blogs/{{blogId}}
```

Expected:

- Status `200`
- returned blog ID matches `{{blogId}}`

### 7. Update blog

Request:

```text
PATCH {{baseUrl}}/blogs/{{blogId}}
```

Body:

```json
{
  "title": "Updated title"
}
```

Expected:

- Status `200`
- updated title is returned

### 8. Delete blog

Request:

```text
DELETE {{baseUrl}}/blogs/{{blogId}}
```

Expected:

- Status `200`
- success message says blog was deleted

## Required Negative Tests

These are the minimum failure cases you should run.

### Auth validation

1. Register with missing name
2. Register with missing email
3. Register with invalid email
4. Register with short password
5. Register with duplicate email
6. Login with wrong password
7. Login with unknown email
8. Get current user without token
9. Get current user with invalid token

Expected status codes:

- validation errors: `400`
- duplicate email: `409`
- invalid credentials: `401`
- missing or invalid token: `401`

### Blog validation and authorization

1. Create blog without token
2. Create blog with invalid token
3. Create blog without title
4. Create blog without content
5. Get blog with invalid ID like `abc`
6. Get missing blog ID
7. Update blog with empty body
8. Update blog with forbidden field like `user_id`
9. Update another user's blog
10. Delete another user's blog
11. Delete missing blog

Expected status codes:

- invalid body or invalid ID: `400`
- missing or invalid token: `401`
- other user's blog: `403`
- missing blog: `404`

## Two-User Ownership Test

Use this flow to verify ownership rules correctly.

### User A

1. Set `email=usera@example.com`
2. Register
3. Login
4. Create a blog
5. Confirm `blogId` is saved

### User B

1. Change environment `email=userb@example.com`
2. Register
3. Login
4. Try `PATCH {{baseUrl}}/blogs/{{blogId}}`
5. Try `DELETE {{baseUrl}}/blogs/{{blogId}}`

Expected:

- both requests return `403`
- message indicates the user is not allowed to modify the blog

## UUID-Specific Checks

Verify these manually in responses:

1. Registered user `data.id` looks like a UUID
2. Logged-in user `data.user.id` looks like a UUID
3. Created blog `data.userId` matches the authenticated user's UUID
4. No user response exposes a password hash

Example UUID shape:

```text
550e8400-e29b-41d4-a716-446655440000
```

## Recommended Test Data Strategy

To avoid duplicate-email conflicts during repeated testing:

- change `email` before registration runs
- use timestamp-based emails, for example:

```text
tester-20260717-1@example.com
tester-20260717-2@example.com
```

## Troubleshooting

### `401 Authorization header is required`

Cause:

- you did not log in first
- `token` is empty in the environment

Fix:

1. Run `Auth -> Login user`
2. Confirm the environment now has `token`
3. Run the protected request again

### `409 Email is already registered`

Cause:

- the same email was already used

Fix:

- update the environment `email` to a new value

### `404 Blog not found`

Cause:

- `blogId` is missing, deleted, or invalid

Fix:

1. Run `Blogs -> Create blog`
2. Confirm `blogId` is updated
3. Retry the request

### Server does not respond

Check:

1. `npm run dev` is still running
2. MySQL is running
3. `.env` values are correct
4. `baseUrl` is `http://localhost:5000/api`

## Suggested Final Test Checklist

Mark these complete before calling the API tested:

- Health endpoint works
- Register succeeds
- Duplicate email fails with `409`
- Login succeeds
- Wrong password fails with `401`
- Profile works with valid token
- Profile fails without token
- Blog create works
- Blog create fails without token
- Blog list works
- Blog get-by-id works
- Blog invalid ID fails with `400`
- Blog update works for owner
- Blog update fails for non-owner
- Blog delete works for owner
- Blog delete fails for non-owner
- Responses never return passwords
- User IDs are UUIDs

## Related Files

- [README.md](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/README.md:1)
- [database/schema.sql](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/database/schema.sql:1)
- [scripts/init-schema.js](/media/mahir/NewVolume82G/innovation_within/jwt-blog-api/scripts/init-schema.js:1)
