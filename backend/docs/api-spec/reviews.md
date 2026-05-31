# Reviews API

Base path: `/api/reviews`

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
    "_id": "68321ac367b4c6e7d7a04441",
    "patient": "68321ac367b4c6e7d7a05551",
    "doctor": "68321ac367b4c6e7d7a02221",
    "appointment": "68321ac367b4c6e7d7a06661",
    "rating": 5,
    "comment": "Excellent explanation and service"
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
