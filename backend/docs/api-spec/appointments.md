# Appointments API

Base path: `/api/appointments`

## Security and Method Notes

- All endpoints require `Authorization: Bearer <token>`.
- `POST /api/appointments` is patient-only.
- `GET /api/appointments` and `GET /api/appointments/:id` are available to patients, doctors, and admins.
- `PATCH /api/appointments/:id/status` is doctor/admin only.
- `DELETE /api/appointments/:id` is available to patients and admins.

## Endpoint: Create Appointment

### Description

Create an appointment for the logged-in patient account.

### HTTP Method and URL

```http
POST /api/appointments
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field             | Type   | Required | Notes               |
| -------- | ----------------- | ------ | -------- | ------------------- |
| Body     | `doctor`          | string | Yes      | Doctor profile id   |
| Body     | `appointmentDate` | string | Yes      | Format `YYYY-MM-DD` |
| Body     | `startTime`       | string | Yes      | Format `HH:mm`      |
| Body     | `endTime`         | string | Yes      | Format `HH:mm`      |
| Body     | `reason`          | string | No       | Max 500             |

### Request Example

```json
{
  "doctor": "68321ac367b4c6e7d7a02221",
  "appointmentDate": "2026-06-20",
  "startTime": "09:00",
  "endTime": "09:30",
  "reason": "Routine checkup"
}
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a06661",
    "doctor": "68321ac367b4c6e7d7a02221",
    "patient": "68321ac367b4c6e7d7a05551",
    "appointmentDate": "2026-06-20T00:00:00.000Z",
    "startTime": "09:00",
    "endTime": "09:30",
    "status": "pending",
    "bookingCode": "BK-20260601-2F7A"
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Doctor is not available"
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Doctor is not approved"
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

## Endpoint: List Appointments

### Description

Return appointment list with role-aware filtering.

Role behavior:

- `PATIENT`: only own appointments.
- `DOCTOR`: only own doctor appointments.
- `ADMIN`: all appointments.

### HTTP Method and URL

```http
GET /api/appointments
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field       | Type                                                            | Required | Default           | Notes                                               |
| -------- | ----------- | --------------------------------------------------------------- | -------- | ----------------- | --------------------------------------------------- |
| Query    | `page`      | number                                                          | No       | `1`               | Min 1                                               |
| Query    | `limit`     | number                                                          | No       | `10`              | Min 1, max 100                                      |
| Query    | `search`    | string                                                          | No       | `""`              | Search by booking code, patient, doctor, specialist |
| Query    | `status`    | `all` \| `pending` \| `confirmed` \| `cancelled` \| `completed` | No       | `all`             | Status filter                                       |
| Query    | `startDate` | string                                                          | No       | `""`              | Date start filter                                   |
| Query    | `endDate`   | string                                                          | No       | `""`              | Date end filter                                     |
| Query    | `column`    | `appointmentDate` \| `status`                                   | No       | `appointmentDate` | Sort column                                         |
| Query    | `sort`      | `asc` \| `desc`                                                 | No       | `desc`            | Sort direction                                      |

### Request Example

```http
GET /api/appointments?status=pending&search=BK-2026&page=1&limit=10&column=appointmentDate&sort=desc
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
      "_id": "68321ac367b4c6e7d7a06661",
      "bookingCode": "BK-20260601-2F7A",
      "status": "pending",
      "patient": { "fullName": "John Doe" },
      "doctor": {
        "fullName": "Dr. Alice Hart",
        "consultationFee": 250000,
        "specialist": { "name": "Cardiology", "slug": "cardiology" }
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "column": "appointmentDate",
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
      "field": "column",
      "message": "Invalid option: expected one of \"appointmentDate\"|\"status\""
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

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Get Appointment By ID

### Description

Return one appointment by id with ownership checks.

### HTTP Method and URL

```http
GET /api/appointments/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes          |
| -------- | ----- | ------ | -------- | -------------- |
| Path     | `id`  | string | Yes      | Appointment id |

### Request Example

```http
GET /api/appointments/68321ac367b4c6e7d7a06661
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a06661",
    "status": "pending",
    "patient": { "fullName": "John Doe" },
    "doctor": { "fullName": "Dr. Alice Hart" }
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
  "message": "Appointment not found"
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

## Endpoint: Update Appointment Status (Partial Update)

### Description

Update only the `status` field of an appointment. Doctors can only update appointments that belong to their own profile.

### HTTP Method and URL

```http
PATCH /api/appointments/:id/status
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

### Request Parameters

| Location | Field    | Type   | Required | Notes                                            |
| -------- | -------- | ------ | -------- | ------------------------------------------------ |
| Path     | `id`     | string | Yes      | Appointment id                                   |
| Body     | `status` | enum   | Yes      | `pending`, `confirmed`, `cancelled`, `completed` |

### Request Example

```json
{
  "status": "confirmed"
}
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a06661",
    "status": "confirmed"
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
      "field": "status",
      "message": "Invalid option: expected one of \"pending\"|\"confirmed\"|\"cancelled\"|\"completed\""
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
  "message": "Appointment not found"
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

## Endpoint: Delete Appointment

### Description

Delete an appointment. Patients can only delete their own pending appointments, while admins can delete any appointment.

### HTTP Method and URL

```http
DELETE /api/appointments/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes          |
| -------- | ----- | ------ | -------- | -------------- |
| Path     | `id`  | string | Yes      | Appointment id |

### Request Example

```http
DELETE /api/appointments/68321ac367b4c6e7d7a06661
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Appointment deleted"
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Only pending appointment can be cancelled"
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
  "message": "Appointment not found"
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
