# Patients API

Base path: `/api/patients`

## HTTP Method Convention in This Module

- `PUT /api/patients/me` and `PUT /api/patients/:id` are used for profile update operations.
- There is no dedicated `PATCH` endpoint in this module right now.

## Security

All endpoints require:

- `Authorization: Bearer <token>`

## Endpoint: Get My Profile

### Description

Return the patient profile for the currently authenticated patient user.

### HTTP Method and URL

```http
GET /api/patients/me
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

No path/query/body parameters.

### Request Example

```http
GET /api/patients/me HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a05551",
    "fullName": "John Doe",
    "gender": "MALE",
    "phoneNumber": "08123456789",
    "user": {
      "_id": "68321ac367b4c6e7d7a01111",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "PATIENT"
    }
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
  "message": "Patient profile not found"
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

## Endpoint: Update My Profile

### Description

Update current patient profile using `PUT` semantics.

### HTTP Method and URL

```http
PUT /api/patients/me
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field         | Type               | Required | Notes                              |
| -------- | ------------- | ------------------ | -------- | ---------------------------------- |
| Body     | `fullName`    | string             | No       | Min 1                              |
| Body     | `dateOfBirth` | date string        | No       | Parsed to date (`z.coerce.date()`) |
| Body     | `gender`      | `MALE` \| `FEMALE` | No       | Enum                               |
| Body     | `phoneNumber` | string             | No       | Min 5, max 30                      |
| Body     | `address`     | string             | No       | Min 1, max 500                     |

Validation note:

- At least one field must be present.

### Request Example

```json
{
  "fullName": "John Doe Updated",
  "dateOfBirth": "1998-01-20",
  "gender": "MALE",
  "phoneNumber": "08129876543",
  "address": "Jl. Melati No. 10"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a05551",
    "fullName": "John Doe Updated",
    "phoneNumber": "08129876543",
    "address": "Jl. Melati No. 10"
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "root",
      "message": "at least one field must be provided"
    }
  ]
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
  "message": "Patient profile not found"
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

## Endpoint: List Patients (Admin)

### Description

Return paginated patient profiles for admin.

### HTTP Method and URL

```http
GET /api/patients
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field    | Type                        | Required | Default     | Notes                    |
| -------- | -------- | --------------------------- | -------- | ----------- | ------------------------ |
| Query    | `page`   | number                      | No       | `1`         | Min 1                    |
| Query    | `limit`  | number                      | No       | `10`        | Min 1, max 100           |
| Query    | `search` | string                      | No       | `""`        | Full name / phone search |
| Query    | `gender` | `all` \| `MALE` \| `FEMALE` | No       | `all`       | Gender filter            |
| Query    | `column` | `fullName` \| `createdAt`   | No       | `createdAt` | Sort column              |
| Query    | `sort`   | `asc` \| `desc`             | No       | `desc`      | Sort direction           |

### Request Example

```http
GET /api/patients?search=john&gender=MALE&page=1&limit=10
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
      "_id": "68321ac367b4c6e7d7a05551",
      "fullName": "John Doe",
      "gender": "MALE",
      "user": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "PATIENT",
        "isActive": true
      }
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
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "limit",
      "message": "Too big: expected number to be <=100"
    }
  ]
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

## Endpoint: Get Patient By ID (Admin)

### Description

Return one patient profile by id for admin.

### HTTP Method and URL

```http
GET /api/patients/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes              |
| -------- | ----- | ------ | -------- | ------------------ |
| Path     | `id`  | string | Yes      | Patient profile id |

### Request Example

```http
GET /api/patients/68321ac367b4c6e7d7a05551
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a05551",
    "fullName": "John Doe",
    "user": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "PATIENT",
      "isActive": true
    }
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
  "message": "Patient profile not found"
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

## Endpoint: Update Patient By ID (Admin)

### Description

Update any patient profile by id using `PUT` semantics.

### HTTP Method and URL

```http
PUT /api/patients/:id
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field         | Type               | Required | Notes              |
| -------- | ------------- | ------------------ | -------- | ------------------ |
| Path     | `id`          | string             | Yes      | Patient profile id |
| Body     | `fullName`    | string             | No       | Min 1              |
| Body     | `dateOfBirth` | date string        | No       | Parsed to date     |
| Body     | `gender`      | `MALE` \| `FEMALE` | No       | Enum               |
| Body     | `phoneNumber` | string             | No       | Min 5, max 30      |
| Body     | `address`     | string             | No       | Min 1, max 500     |

Validation note:

- At least one field must be present.

### Request Example

```json
{
  "phoneNumber": "081255500011",
  "address": "Updated admin address"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a05551",
    "phoneNumber": "081255500011",
    "address": "Updated admin address"
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

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Patient profile not found"
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

## Endpoint: Delete Patient (Admin)

### Description

Delete a patient profile.

### HTTP Method and URL

```http
DELETE /api/patients/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes              |
| -------- | ----- | ------ | -------- | ------------------ |
| Path     | `id`  | string | Yes      | Patient profile id |

### Request Example

```http
DELETE /api/patients/68321ac367b4c6e7d7a05551
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Patient deleted",
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
  "message": "Patient not found"
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
