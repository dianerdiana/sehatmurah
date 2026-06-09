# Authentication API

Base path: `/api/auth`

## Standard Response Envelope

### Success Envelope

```json
{
  "status": "success",
  "message": "ok",
  "data": {}
}
```

### Error Envelope

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "email",
      "message": "invalid email"
    }
  ]
}
```

## Endpoint: Register

### Description

Create a new patient account and return an access token.

### HTTP Method and URL

```http
POST /api/auth/register
```

### Headers Required

- `Content-Type: application/json`

### Request Parameters

| Location | Field      | Type           | Required | Notes          |
| -------- | ---------- | -------------- | -------- | -------------- |
| Body     | `name`     | string         | Yes      | Min 1, max 120 |
| Body     | `email`    | string (email) | Yes      | Max 255        |
| Body     | `password` | string         | Yes      | Min 8, max 128 |

### Request Example

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongPass123"
}
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "token": "<JWT_ACCESS_TOKEN>",
    "user": {
      "id": "68321ac367b4c6e7d7a01111",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "PATIENT"
    }
  }
}
```

#### 400 Bad Request (Zod validation failed)

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "password",
      "message": "password must be at least 8 characters"
    }
  ]
}
```

#### 409 Conflict (email already registered)

```json
{
  "status": "error",
  "message": "Email is already registered"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Login

### Description

Authenticate a user and return an access token with permissions.

### HTTP Method and URL

```http
POST /api/auth/login
```

### Headers Required

- `Content-Type: application/json`

### Request Parameters

| Location | Field      | Type           | Required | Notes          |
| -------- | ---------- | -------------- | -------- | -------------- |
| Body     | `email`    | string (email) | Yes      | Max 255        |
| Body     | `password` | string         | Yes      | Min 1, max 128 |

### Request Example

```json
{
  "email": "john.doe@example.com",
  "password": "StrongPass123"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "token": "<JWT_ACCESS_TOKEN>",
    "user": {
      "id": "68321ac367b4c6e7d7a01111",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "PATIENT",
      "permissions": [
        {
          "resource": "appointments",
          "actions": ["create", "read", "delete"]
        }
      ]
    }
  }
}
```

#### 400 Bad Request (Zod validation failed)

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "email",
      "message": "invalid email"
    }
  ]
}
```

#### 401 Unauthorized (invalid credential)

```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

#### 401 Unauthorized (inactive account security rule)

```json
{
  "status": "error",
  "message": "Your account has been disabled"
}
```

#### Optional policy mapping for inactive account (gateway/business policy)

Current backend implementation returns `401 Unauthorized` for inactive account login attempts.
If your API gateway or policy layer maps account-status denial to `403 Forbidden` (or `400 Bad Request`), the payload can follow this shape:

```json
{
  "status": "error",
  "message": "Your account has been disabled"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Get Current User (Me)

### Description

Return the current authenticated user profile.

### HTTP Method and URL

```http
GET /api/auth/me
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

No path/query/body parameters.

### Request Example

```http
GET /api/auth/me HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "id": "68321ac367b4c6e7d7a01111",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "PATIENT",
    "isActive": true,
    "permissions": [
      {
        "resource": "appointments",
        "actions": ["create", "read", "delete"]
      }
    ]
  }
}
```

#### 401 Unauthorized (missing bearer token)

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

#### 401 Unauthorized (invalid/expired token or inactive account token)

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "User not found"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```
