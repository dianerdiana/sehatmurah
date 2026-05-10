# Auth API

Base URL: `/api/auth`

## Response Format

### Success

```json
{
  "status": "success",
  "message": "ok",
  "data": {}
}
```

### Error

```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

## Data Model Summary

- `UserRole`: `PATIENT | DOCTOR | ADMIN`

## Endpoints

## 1) Register

- Method: `POST`
- Path: `/register`
- Auth: no token required

Request body:

```json
{
  "name": "Budi",
  "email": "budi@mail.com",
  "password": "secret123",
  "role": "PATIENT"
}
```

Validation:

- `name`: required string, max 120
- `email`: required valid email, max 255
- `password`: required string, min 8, max 128
- `role`: optional enum `PATIENT | DOCTOR | ADMIN` (default `PATIENT`)

Success:

- Status code: `201`
- `data.token`: JWT access token
- `data.user`: `{ id, name, email, role }`

Common errors:

- `409` Email is already registered
- `400` Validation error

## 2) Login

- Method: `POST`
- Path: `/login`
- Auth: no token required

Request body:

```json
{
  "email": "budi@mail.com",
  "password": "secret123"
}
```

Validation:

- `email`: required valid email
- `password`: required string

Success:

- Status code: `200`
- `data.token`: JWT access token
- `data.user`: `{ id, name, email, role }`

Common errors:

- `401` Invalid email or password
- `400` Validation error

## 3) Me

- Method: `GET`
- Path: `/me`
- Auth: requires `Authorization: Bearer <access_token>`

Success:

- Status code: `200`
- `data`: `{ id, name, email, role, isActive }`

Common errors:

- `401` Unauthorized / Invalid token
- `404` User not found
