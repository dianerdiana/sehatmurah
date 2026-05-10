# Appointments API

Base URL: `/api/appointments`

All endpoints in this module require:

`Authorization: Bearer <access_token>`

## Response Format

### Success

```json
{
  "status": "success",
  "message": "ok",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 0,
    "totalPages": 0
  }
}
```

### Error

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "appointmentDate",
      "message": "appointmentDate must use YYYY-MM-DD format"
    }
  ]
}
```

## Data Model Summary

- `AppointmentStatus`: `pending | confirmed | cancelled | completed`
- Appointment core fields: `patient`, `doctor`, `appointmentDate`, `startTime`, `endTime`, `reason`, `status`, `bookingCode`, `notes`, `createdAt`, `updatedAt`

## Endpoints

## 1) Create Appointment

- Method: `POST`
- Path: `/`
- Role: `PATIENT`

Request body:

```json
{
  "doctor": "doctorProfileId",
  "appointmentDate": "2026-05-20",
  "startTime": "09:00",
  "endTime": "09:30",
  "reason": "Routine checkup"
}
```

Validation:

- `doctor`: required string
- `appointmentDate`: format `YYYY-MM-DD`
- `startTime`: `HH:mm` format (24-hour)
- `endTime`: `HH:mm` format (24-hour)
- `reason`: optional string, max 500 characters

Success:

- Status code: `201`
- `data`: newly created appointment object (default status is `pending`, with generated `bookingCode`)

Common errors:

- `400` Doctor is not available
- `403` Only PATIENT can create appointment
- `404` Doctor not found / Patient profile not found
- `409` Duplicate resource (doctor time slot conflict)

## 2) List Appointments

- Method: `GET`
- Path: `/`
- Role: `PATIENT | DOCTOR | ADMIN`

Query parameters:

- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Automatic filtering by role:

- `PATIENT`: only appointments owned by the logged-in patient
- `DOCTOR`: only appointments owned by the logged-in doctor
- `ADMIN`: all appointments

Success:

- Status code: `200`
- `data`: appointment array
- `meta`: pagination (`page`, `limit`, `totalItems`, `totalPages`)

## 3) Get Appointment By ID

- Method: `GET`
- Path: `/:id`
- Role: `PATIENT | DOCTOR | ADMIN`

Path parameters:

- `id`: required string

Access rules:

- `ADMIN`: unrestricted
- `PATIENT`: only their own appointments
- `DOCTOR`: only their own appointments

Success:

- Status code: `200`
- `data`: appointment object

Common errors:

- `403` Forbidden
- `404` Appointment not found

## 4) Update Appointment Status

- Method: `PATCH`
- Path: `/:id/status`
- Role: `DOCTOR | ADMIN`

Path parameters:

- `id`: required string

Request body:

```json
{
  "status": "confirmed"
}
```

Validation:

- `status`: enum `pending | confirmed | cancelled | completed`

Access rules:

- `ADMIN`: unrestricted
- `DOCTOR`: only their own appointments

Success:

- Status code: `200`
- `data`: appointment object after update

Common errors:

- `403` Forbidden
- `404` Appointment not found

## 5) Delete Appointment

- Method: `DELETE`
- Path: `/:id`
- Role: `PATIENT | ADMIN`

Path parameters:

- `id`: required string

Access rules:

- `ADMIN`: can delete any appointment
- `PATIENT`: can only delete their own appointment and it must be `pending`

Success:

- Status code: `200`

```json
{
  "status": "success",
  "message": "Appointment deleted"
}
```

Common errors:

- `400` Only pending appointment can be cancelled
- `403` Forbidden
- `404` Appointment not found
