# Doctors API

Base path: `/api/doctors`

## HTTP Method Convention in This Module

- `GET /api/doctors`, `GET /api/doctors/cities`, `GET /api/doctors/:id`, and `GET /api/doctors/:doctorId/reviews` are public.
- `POST /api/doctors/request` is for authenticated patients who want to submit a doctor profile request.
- `POST /api/doctors`, `PUT /api/doctors/:id`, `PATCH /api/doctors/:id/approve`, `PATCH /api/doctors/:id/reject`, `PATCH /api/doctors/:id/schedule`, and `DELETE /api/doctors/:id` are admin-only unless noted otherwise.
- `PUT /api/doctors/:id` is used for full-resource update semantics.
- `PATCH /api/doctors/:id/schedule` is used for targeted field updates.

## Endpoint: List Doctors

### Description

Return paginated doctor profiles with filter and sorting support. The default list only returns approved doctors.

### HTTP Method and URL

```http
GET /api/doctors
```

### Headers Required

No authentication header is required.

### Request Parameters

| Location | Field         | Type                       | Required | Default     | Notes                              |
| -------- | ------------- | -------------------------- | -------- | ----------- | ---------------------------------- |
| Query    | `isAvailable` | `all` \| `true` \| `false` | No       | `all`       | Availability filter                |
| Query    | `status`      | `all` \| `pending` \| `approved` \| `rejected` | No | `approved` | Approval status filter             |
| Query    | `specialist`  | string                     | No       | -           | Specialist id, slug, or name       |
| Query    | `city`        | string                     | No       | -           | Filters by `practiceLocation.city` |
| Query    | `search`      | string                     | No       | -           | Filters by doctor full name        |
| Query    | `column`      | `fullName` \| `createdAt`  | No       | `createdAt` | Sort column                        |
| Query    | `sort`        | `asc` \| `desc`            | No       | `desc`      | Sort direction                     |
| Query    | `page`        | number                     | No       | `1`         | Min 1                              |
| Query    | `limit`       | number                     | No       | `10`        | Min 1, max 100                     |

### Request Example

```http
GET /api/doctors?isAvailable=true&city=Jakarta&column=createdAt&sort=desc&page=1&limit=10
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": [
    {
      "_id": "68321ac367b4c6e7d7a02221",
      "fullName": "Dr. Alice Hart",
      "approvalStatus": "approved",
      "specialist": {
        "_id": "68321ac367b4c6e7d7a03331",
        "name": "Cardiology",
        "slug": "cardiology",
        "icon": "/uploads/default/specialists/cardio.svg"
      },
      "consultationFee": 250000,
      "isAvailable": true,
      "ratingAverage": 4.8,
      "ratingCount": 12
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

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: List Doctor Cities

### Description

Return paginated list of distinct city names from approved doctor practice locations.

### HTTP Method and URL

```http
GET /api/doctors/cities
```

### Headers Required

No authentication header is required.

### Request Parameters

| Location | Field    | Type   | Required | Default | Notes          |
| -------- | -------- | ------ | -------- | ------- | -------------- |
| Query    | `search` | string | No       | -       | City keyword   |
| Query    | `page`   | number | No       | `1`     | Min 1          |
| Query    | `limit`  | number | No       | `10`    | Min 1, max 100 |

### Request Example

```http
GET /api/doctors/cities?search=jak&page=1&limit=10
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": ["Jakarta", "Bandung"],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 2,
    "totalPages": 1
  }
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

## Endpoint: Get My Doctor Profile

### Description

Return doctor profile for the currently authenticated user.

### HTTP Method and URL

```http
GET /api/doctors/me
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

No path/query/body parameters.

### Request Example

```http
GET /api/doctors/me HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "fullName": "Dr. Alice Hart",
    "specialist": {
      "_id": "68321ac367b4c6e7d7a03331",
      "name": "Cardiology",
      "slug": "cardiology",
      "icon": "/uploads/default/specialists/cardio.svg"
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

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Doctor not found"
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

## Endpoint: Get Doctor By ID

### Description

Return a single doctor profile by id.

### HTTP Method and URL

```http
GET /api/doctors/:id
```

### Headers Required

No authentication header is required.

### Request Parameters

| Location | Field | Type   | Required | Notes             |
| -------- | ----- | ------ | -------- | ----------------- |
| Path     | `id`  | string | Yes      | Doctor profile id |

### Request Example

```http
GET /api/doctors/68321ac367b4c6e7d7a02221
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "fullName": "Dr. Alice Hart",
    "consultationFee": 250000,
    "isAvailable": true
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Doctor not found"
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

## Endpoint: List Doctor Reviews

### Description

Return paginated reviews for a specific doctor.

### HTTP Method and URL

```http
GET /api/doctors/:doctorId/reviews
```

### Headers Required

No authentication header is required.

### Request Parameters

| Location | Field      | Type   | Required | Default | Notes             |
| -------- | ---------- | ------ | -------- | ------- | ----------------- |
| Path     | `doctorId` | string | Yes      | -       | Doctor profile id |
| Query    | `page`     | number | No       | `1`     | Min 1             |
| Query    | `limit`    | number | No       | `10`    | Min 1, max 100    |

### Request Example

```http
GET /api/doctors/68321ac367b4c6e7d7a02221/reviews?page=1&limit=10
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": [
    {
      "_id": "68321ac367b4c6e7d7a04441",
      "rating": 5,
      "comment": "Very clear explanation",
      "patient": {
        "_id": "68321ac367b4c6e7d7a05551",
        "fullName": "John Doe"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Doctor not found"
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

## Endpoint: Create Doctor

### Description

Create a doctor profile for an existing user account. This endpoint supports multipart file upload and creates the profile with the default approval state (`pending`).

### HTTP Method and URL

```http
POST /api/doctors
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

### Request Parameters

| Location         | Field              | Type                    | Required | Notes                                |
| ---------------- | ------------------ | ----------------------- | -------- | ------------------------------------ |
| Body (form-data) | `userId`           | string                  | Yes      | Must be a valid and existing user id |
| Body (form-data) | `fullName`         | string                  | Yes      | Doctor full name                     |
| Body (form-data) | `specialist`       | string                  | Yes      | Specialist id                        |
| Body (form-data) | `profilePhoto`     | file/string             | No       | Uploaded file path mapped to body    |
| Body (form-data) | `experienceYears`  | number                  | No       | Integer, min 0                       |
| Body (form-data) | `description`      | string                  | No       | Optional description                 |
| Body (form-data) | `practiceLocation` | object/stringified JSON | Yes      | `clinicName`, `address`, `city`      |
| Body (form-data) | `schedule`         | array/stringified JSON  | No       | Day/time blocks                      |
| Body (form-data) | `consultationFee`  | number                  | Yes      | Min 0                                |
| Body (form-data) | `isAvailable`      | boolean                 | No       | Availability flag                    |

### Request Example

```http
POST /api/doctors HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="userId"

68321ac367b4c6e7d7a09999
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="fullName"

Dr. Alice Hart
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="specialist"

68321ac367b4c6e7d7a03331
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="practiceLocation"

{"clinicName":"Sehat Clinic","address":"Jl. Sudirman No.1","city":"Jakarta"}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="schedule"

[{"day":"MONDAY","startTime":"09:00","endTime":"12:00","isAvailable":true}]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="consultationFee"

250000
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="profilePhoto"; filename="doctor.jpg"
Content-Type: image/jpeg

<binary>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "user": "68321ac367b4c6e7d7a09999",
    "fullName": "Dr. Alice Hart",
    "consultationFee": 250000,
    "isAvailable": true,
    "approvalStatus": "pending"
  }
}
```

#### 400 Bad Request (validation or invalid userId format)

```json
{
  "status": "error",
  "message": "Invalid userId"
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

#### 404 Not Found (user does not exist)

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

## Endpoint: Update Doctor (Full Update Semantics)

### Description

Update doctor profile fields using `PUT` semantics. Body accepts partial data by validation rule, but this endpoint is treated as full-resource update by API convention.

### HTTP Method and URL

```http
PUT /api/doctors/:id
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

### Request Parameters

| Location         | Field              | Type                    | Required | Notes                             |
| ---------------- | ------------------ | ----------------------- | -------- | --------------------------------- |
| Path             | `id`               | string                  | Yes      | Doctor profile id                 |
| Body (form-data) | `fullName`         | string                  | No       | Optional update field             |
| Body (form-data) | `specialist`       | string                  | No       | Specialist id                     |
| Body (form-data) | `profilePhoto`     | file/string             | No       | Uploaded file path mapped to body |
| Body (form-data) | `experienceYears`  | number                  | No       | Integer, min 0                    |
| Body (form-data) | `description`      | string                  | No       | Optional update field             |
| Body (form-data) | `practiceLocation` | object/stringified JSON | No       | `clinicName`, `address`, `city`   |
| Body (form-data) | `schedule`         | array/stringified JSON  | No       | Schedule list                     |
| Body (form-data) | `consultationFee`  | number                  | No       | Min 0                             |
| Body (form-data) | `isAvailable`      | boolean                 | No       | Optional update field             |

### Request Example

```http
PUT /api/doctors/68321ac367b4c6e7d7a02221 HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="fullName"

Dr. Alice Hart, Sp.JP
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="consultationFee"

300000
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "fullName": "Dr. Alice Hart, Sp.JP",
    "consultationFee": 300000
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
      "field": "consultationFee",
      "message": "consultationFee must be >= 0"
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
  "message": "Doctor not found"
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

## Endpoint: Request Doctor Profile

### Description

Submit a doctor profile request from the currently authenticated patient account.

### HTTP Method and URL

```http
POST /api/doctors/request
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

### Request Parameters

| Location         | Field              | Type                    | Required | Notes                                |
| ---------------- | ------------------ | ----------------------- | -------- | ------------------------------------ |
| Body (form-data) | `userId`           | string                  | Yes      | Must match the authenticated user id |
| Body (form-data) | `fullName`         | string                  | Yes      | Doctor full name                     |
| Body (form-data) | `specialist`       | string                  | Yes      | Specialist id                        |
| Body (form-data) | `profilePhoto`     | file/string             | No       | Uploaded file path mapped to body    |
| Body (form-data) | `experienceYears`  | number                  | No       | Integer, min 0                       |
| Body (form-data) | `description`      | string                  | No       | Optional description                 |
| Body (form-data) | `practiceLocation` | object/stringified JSON | Yes      | `clinicName`, `address`, `city`      |
| Body (form-data) | `schedule`         | array/stringified JSON  | No       | Day/time blocks                      |
| Body (form-data) | `consultationFee`  | number                  | Yes      | Min 0                                |
| Body (form-data) | `isAvailable`      | boolean                 | No       | Availability flag                    |

Validation notes:

- The authenticated user must have role `PATIENT`.
- The request is stored with `approvalStatus: pending`.

### Request Example

```http
POST /api/doctors/request HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="userId"

68321ac367b4c6e7d7a09999
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="fullName"

Dr. Alice Hart
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="specialist"

68321ac367b4c6e7d7a03331
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="practiceLocation"

{"clinicName":"Sehat Clinic","address":"Jl. Sudirman No.1","city":"Jakarta"}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="consultationFee"

250000
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "Doctor request submitted",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "user": "68321ac367b4c6e7d7a09999",
    "fullName": "Dr. Alice Hart",
    "approvalStatus": "pending"
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Invalid userId"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "You can only submit a request for your own account"
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Specialist not found"
}
```

## Endpoint: Approve Doctor

### Description

Approve a pending doctor profile and promote the linked account to `DOCTOR`.

### HTTP Method and URL

```http
PATCH /api/doctors/:id/approve
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field    | Type   | Required | Notes                 |
| -------- | -------- | ------ | -------- | --------------------- |
| Path     | `id`     | string | Yes      | Doctor profile id     |
| Body     | `status` | string | Yes      | Must be `approved`    |

### Request Example

```json
{
  "status": "approved"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Doctor approved",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "approvalStatus": "approved",
    "approvedAt": "2026-06-09T10:15:00.000Z"
  }
}
```

#### 409 Conflict

```json
{
  "status": "error",
  "message": "Only pending doctor can be approved"
}
```

## Endpoint: Reject Doctor

### Description

Reject a pending doctor profile.

### HTTP Method and URL

```http
PATCH /api/doctors/:id/reject
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field               | Type   | Required | Notes                 |
| -------- | ------------------- | ------ | -------- | --------------------- |
| Path     | `id`                | string | Yes      | Doctor profile id     |
| Body     | `status`            | string | Yes      | Must be `rejected`    |
| Body     | `rejectionReason`   | string | Yes      | Required for rejections |

### Request Example

```json
{
  "status": "rejected",
  "rejectionReason": "Missing practice license document"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Doctor rejected",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "approvalStatus": "rejected",
    "rejectionReason": "Missing practice license document",
    "rejectedAt": "2026-06-09T10:20:00.000Z"
  }
}
```

#### 409 Conflict

```json
{
  "status": "error",
  "message": "Only pending doctor can be rejected"
}
```

## Endpoint: Update Doctor Schedule (Partial Update)

### Description

Update only the `schedule` field using `PATCH` semantics. Doctors can only update their own doctor profile.

### HTTP Method and URL

```http
PATCH /api/doctors/:id/schedule
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field      | Type   | Required | Notes                     |
| -------- | ---------- | ------ | -------- | ------------------------- |
| Path     | `id`       | string | Yes      | Doctor profile id         |
| Body     | `schedule` | array  | Yes      | Array of day/time objects |

Schedule item schema:

- `day`: `MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY` (required)
- `startTime`: `HH:mm` (required)
- `endTime`: `HH:mm` (required)
- `isAvailable`: boolean (optional, defaults to `true`)

### Request Example

```json
{
  "schedule": [
    {
      "day": "TUESDAY",
      "startTime": "13:00",
      "endTime": "16:00",
      "isAvailable": true
    }
  ]
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221",
    "schedule": [
      {
        "day": "TUESDAY",
        "startTime": "13:00",
        "endTime": "16:00",
        "isAvailable": true
      }
    ]
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
      "field": "schedule.0.startTime",
      "message": "invalid startTime HH:mm"
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
  "message": "Doctor not found"
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

## Endpoint: Delete Doctor

### Description

Delete a doctor profile.

### HTTP Method and URL

```http
DELETE /api/doctors/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes             |
| -------- | ----- | ------ | -------- | ----------------- |
| Path     | `id`  | string | Yes      | Doctor profile id |

### Request Example

```http
DELETE /api/doctors/68321ac367b4c6e7d7a02221 HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Doctor deleted",
  "data": {
    "_id": "68321ac367b4c6e7d7a02221"
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
  "message": "Doctor not found"
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
