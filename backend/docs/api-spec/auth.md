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
  "message": "Invalid email or password",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Data Model Ringkas

- `UserRole`: `PATIENT | DOCTOR | ADMIN`

## Endpoints

## 1) Register

- Method: `POST`
- Path: `/register`
- Auth: tidak perlu token

Request body:

```json
{
  "name": "Budi",
  "email": "budi@mail.com",
  "password": "rahasia123",
  "role": "PATIENT"
}
```

Validasi:

- `name`: string, wajib, max 120
- `email`: email valid, wajib, max 255
- `password`: string, wajib, min 8, max 128
- `role`: enum `PATIENT | DOCTOR | ADMIN`, opsional (default `PATIENT`)

Success:

- Status code: `201`
- `data.token`: JWT access token
- `data.user`: `{ id, name, email, role }`

Error umum:

- `409` Email is already registered
- `400` Validation error

## 2) Login

- Method: `POST`
- Path: `/login`
- Auth: tidak perlu token

Request body:

```json
{
  "email": "budi@mail.com",
  "password": "rahasia123"
}
```

Validasi:

- `email`: email valid, wajib
- `password`: string, wajib

Success:

- Status code: `200`
- `data.token`: JWT access token
- `data.user`: `{ id, name, email, role }`

Error umum:

- `401` Invalid email or password
- `400` Validation error

## 3) Me

- Method: `GET`
- Path: `/me`
- Auth: wajib `Authorization: Bearer <access_token>`

Success:

- Status code: `200`
- `data`: `{ id, name, email, role, isActive }`

Error umum:

- `401` Unauthorized / Invalid token
- `404` User not found
