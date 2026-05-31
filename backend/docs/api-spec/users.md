# Users API

Base path: `/api/users`

## HTTP Method Convention in This Module

- `PUT /api/users/:id` is used for user updates.
- There is no dedicated `PATCH /api/users/:id/deactivate` endpoint in the current implementation.
- Account activation/deactivation is performed via `PUT /api/users/:id` with `isActive: true|false`.

## Security

All endpoints are admin-only and require:

- `Authorization: Bearer <token>`

## Endpoint: List Users

### Description

Return paginated users with role and status filters.

### HTTP Method and URL

```http
GET /api/users
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field      | Type                                      | Required | Default     | Notes                 |
| -------- | ---------- | ----------------------------------------- | -------- | ----------- | --------------------- |
| Query    | `page`     | number                                    | No       | `1`         | Min 1                 |
| Query    | `limit`    | number                                    | No       | `10`        | Min 1, max 100        |
| Query    | `search`   | string                                    | No       | `""`        | Search by name/email  |
| Query    | `role`     | `all` \| `PATIENT` \| `DOCTOR` \| `ADMIN` | No       | `all`       | Role filter           |
| Query    | `isActive` | `all` \| `true` \| `false`                | No       | `all`       | Account status filter |
| Query    | `column`   | `name` \| `createdAt`                     | No       | `createdAt` | Sort column           |
| Query    | `sort`     | `asc` \| `desc`                           | No       | `desc`      | Sort direction        |

### Request Example

```http
GET /api/users?role=PATIENT&isActive=true&search=john&page=1&limit=10
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": [
    {
      "_id": "68321ac367b4c6e7d7a01111",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "PATIENT",
      "isActive": true,
      "createdAt": "2026-06-01T10:15:00.000Z",
      "updatedAt": "2026-06-01T10:15:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "column": "createdAt",
    "sort": "desc",
    "totalItems": 1,
    "totalPages": 1
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR"
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
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

## Endpoint: Create User

### Description

Create a new user account.

### HTTP Method and URL

```http
POST /api/users
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field      | Type                             | Required | Notes               |
| -------- | ---------- | -------------------------------- | -------- | ------------------- |
| Body     | `name`     | string                           | Yes      | Min 1, max 120      |
| Body     | `email`    | string (email)                   | Yes      | Max 255             |
| Body     | `password` | string                           | Yes      | Min 8, max 128      |
| Body     | `role`     | `PATIENT` \| `DOCTOR` \| `ADMIN` | Yes      | User role           |
| Body     | `isActive` | boolean                          | No       | Defaults from model |

### Request Example

```json
{
  "name": "Doctor Account",
  "email": "doctor.account@example.com",
  "password": "StrongPass123",
  "role": "DOCTOR",
  "isActive": true
}
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a07771",
    "name": "Doctor Account",
    "email": "doctor.account@example.com",
    "role": "DOCTOR",
    "isActive": true,
    "createdAt": "2026-06-01T10:25:00.000Z",
    "updatedAt": "2026-06-01T10:25:00.000Z"
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR"
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
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

## Endpoint: Get User By ID

### Description

Return one user by id.

### HTTP Method and URL

```http
GET /api/users/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes   |
| -------- | ----- | ------ | -------- | ------- |
| Path     | `id`  | string | Yes      | User id |

### Request Example

```http
GET /api/users/68321ac367b4c6e7d7a01111
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a01111",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "PATIENT",
    "isActive": true,
    "createdAt": "2026-06-01T10:15:00.000Z",
    "updatedAt": "2026-06-01T10:15:00.000Z"
  }
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
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

## Endpoint: Update User

### Description

Update user fields using `PUT` semantics, including account activation/deactivation.

### HTTP Method and URL

```http
PUT /api/users/:id
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field      | Type                             | Required | Notes                             |
| -------- | ---------- | -------------------------------- | -------- | --------------------------------- |
| Path     | `id`       | string                           | Yes      | User id                           |
| Body     | `name`     | string                           | No       | Min 1, max 120                    |
| Body     | `email`    | string (email)                   | No       | Max 255                           |
| Body     | `password` | string                           | No       | Min 8, max 128                    |
| Body     | `role`     | `PATIENT` \| `DOCTOR` \| `ADMIN` | No       | Optional role update              |
| Body     | `isActive` | boolean                          | No       | Set `false` to deactivate account |

Validation note:

- At least one body field is required.

### Request Example

```json
{
  "isActive": false
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a01111",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "PATIENT",
    "isActive": false
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "You cannot deactivate your own account"
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
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

## Endpoint: Delete User

### Description

Delete a user account by id.

### HTTP Method and URL

```http
DELETE /api/users/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes   |
| -------- | ----- | ------ | -------- | ------- |
| Path     | `id`  | string | Yes      | User id |

### Request Example

```http
DELETE /api/users/68321ac367b4c6e7d7a01111
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "User deleted",
  "data": {}
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
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
