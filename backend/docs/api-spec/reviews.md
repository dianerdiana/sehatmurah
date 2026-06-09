# Reviews API

Base path: `/api/reviews`

## Security and Method Notes

- `POST /api/reviews` is patient-only.
- `GET /api/reviews`, `GET /api/reviews/:id`, `PUT /api/reviews/:id`, and `DELETE /api/reviews/:id` are admin-only.
- `GET /api/reviews/appointments/:id` is available to any authenticated user.
- `GET /api/doctors/:doctorId/reviews` is documented in the Doctors API page and is public.

## Endpoint: Create Review

### Description

Create a review as a patient. The doctor rating summary is recalculated automatically.

### HTTP Method and URL

```http
POST /api/reviews
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field         | Type   | Required | Notes                   |
| -------- | ------------- | ------ | -------- | ----------------------- |
| Body     | `doctor`      | string | Yes      | Doctor profile id       |
| Body     | `appointment` | string | No       | Optional appointment id |
| Body     | `rating`      | number | Yes      | Integer from 1 to 5     |
| Body     | `comment`     | string | No       | Max 1000                |
| Body     | `status`      | enum   | No       | Defaults to `PENDING`   |

Business rules when `appointment` is provided:

- Appointment must exist.
- Appointment must belong to logged-in patient.
- Appointment doctor must match `doctor` in payload.
- Appointment status must be `completed`.

### Request Example

```json
{
  "doctor": "68321ac367b4c6e7d7a02221",
  "appointment": "68321ac367b4c6e7d7a06661",
  "rating": 5,
  "comment": "Excellent explanation and service"
}
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "acknowledged": true,
    "matchedCount": 0,
    "modifiedCount": 0,
    "upsertedCount": 1,
    "upsertedId": "68321ac367b4c6e7d7a04441"
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Review is only allowed for completed appointment"
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

## Endpoint: List Reviews

### Description

Return paginated reviews with search, status, rating, specialist, and date filters.

### HTTP Method and URL

```http
GET /api/reviews
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field        | Type                                             | Required | Default     | Notes                          |
| -------- | ------------ | ------------------------------------------------ | -------- | ----------- | ------------------------------ |
| Query    | `page`       | number                                           | No       | `1`         | Min 1                          |
| Query    | `limit`      | number                                           | No       | `10`        | Min 1, max 100                 |
| Query    | `search`     | string                                           | No       | `""`        | Search patient, doctor, comment |
| Query    | `status`     | `all` \| `PENDING` \| `APPROVED` \| `REJECTED`   | No       | `all`       | Review status filter           |
| Query    | `specialist` | string                                           | No       | `""`        | Specialist name or slug        |
| Query    | `rating`     | `all` \| `1` \| `2` \| `3` \| `4` \| `5`        | No       | `all`       | Rating filter                  |
| Query    | `startDate`  | string                                           | No       | `""`        | Start date filter              |
| Query    | `endDate`    | string                                           | No       | `""`        | End date filter                |
| Query    | `column`     | `patientName` \| `doctorName` \| `rating` \| `createdAt` | No | `createdAt` | Sort column                    |
| Query    | `sort`       | `asc` \| `desc`                                  | No       | `desc`      | Sort direction                 |

### Request Example

```http
GET /api/reviews?status=PENDING&rating=5&page=1&limit=10&column=createdAt&sort=desc
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
      "_id": "68321ac367b4c6e7d7a04441",
      "rating": 5,
      "comment": "Excellent explanation",
      "status": "APPROVED",
      "patient": {
        "_id": "68321ac367b4c6e7d7a05551",
        "fullName": "John Doe"
      },
      "doctor": {
        "_id": "68321ac367b4c6e7d7a02221",
        "fullName": "Dr. Alice Hart",
        "specialist": {
          "_id": "68321ac367b4c6e7d7a03331",
          "name": "Cardiology",
          "slug": "cardiology"
        }
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

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
}
```

## Endpoint: Get Review By ID

### Description

Return a single review by id.

### HTTP Method and URL

```http
GET /api/reviews/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes     |
| -------- | ----- | ------ | -------- | --------- |
| Path     | `id`  | string | Yes      | Review id |

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a04441",
    "rating": 5,
    "status": "APPROVED",
    "patient": {
      "_id": "68321ac367b4c6e7d7a05551",
      "fullName": "John Doe"
    },
    "doctor": {
      "_id": "68321ac367b4c6e7d7a02221",
      "fullName": "Dr. Alice Hart",
      "specialist": {
        "_id": "68321ac367b4c6e7d7a03331",
        "name": "Cardiology",
        "slug": "cardiology"
      }
    }
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Review not found"
}
```

## Endpoint: Get Review By Appointment ID

### Description

Return the review attached to a specific appointment.

### HTTP Method and URL

```http
GET /api/reviews/appointments/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes          |
| -------- | ----- | ------ | -------- | -------------- |
| Path     | `id`  | string | Yes      | Appointment id |

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a04441",
    "appointment": "68321ac367b4c6e7d7a06661",
    "rating": 5,
    "status": "APPROVED"
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Review not found"
}
```

## Endpoint: Update Review

### Description

Update an existing review as an admin.

### HTTP Method and URL

```http
PUT /api/reviews/:id
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field     | Type   | Required | Notes               |
| -------- | --------- | ------ | -------- | ------------------- |
| Path     | `id`      | string | Yes      | Review id           |
| Body     | `rating`  | number | No       | Integer from 1 to 5 |
| Body     | `comment` | string | No       | Max 1000            |
| Body     | `status`  | enum   | No       | Review status enum  |

Validation note:

- At least one body field must be provided.

### Request Example

```json
{
  "status": "APPROVED"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a04441",
    "rating": 5,
    "status": "APPROVED"
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Review not found"
}
```

## Endpoint: Delete Review

### Description

Delete a review by id (admin only). Doctor rating summary is recalculated.

### HTTP Method and URL

```http
DELETE /api/reviews/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes     |
| -------- | ----- | ------ | -------- | --------- |
| Path     | `id`  | string | Yes      | Review id |

### Request Example

```http
DELETE /api/reviews/68321ac367b4c6e7d7a04441
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Review deleted",
  "data": {
    "_id": "68321ac367b4c6e7d7a04441"
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
  "message": "Review not found"
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

## Related Endpoint

The review list endpoint is located in the doctors module:

```http
GET /api/doctors/:doctorId/reviews?page=1&limit=10
```
