# Appointments API

Base URL: `/api/appointments`

Semua endpoint pada module ini membutuhkan header:

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

## Data Model Ringkas

- `AppointmentStatus`: `pending | confirmed | cancelled | completed`
- Field appointment utama: `patient`, `doctor`, `appointmentDate`, `startTime`, `endTime`, `reason`, `status`, `bookingCode`, `notes`, `createdAt`, `updatedAt`

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
  "reason": "Kontrol rutin"
}
```

Validasi:

- `doctor`: string, wajib
- `appointmentDate`: format `YYYY-MM-DD`
- `startTime`: format `HH:mm` (24 jam)
- `endTime`: format `HH:mm` (24 jam)
- `reason`: string, opsional, max 500

Success:

- Status code: `201`
- `data`: object appointment yang baru dibuat (status default `pending`, dengan `bookingCode` otomatis)

Error umum:

- `400` Doctor is not available
- `403` Only PATIENT can create appointment
- `404` Doctor not found / Patient profile not found
- `409` Duplicate resource (slot dokter bentrok)

## 2) List Appointments

- Method: `GET`
- Path: `/`
- Role: `PATIENT | DOCTOR | ADMIN`

Query params:

- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Catatan filter otomatis berdasarkan role:

- `PATIENT`: hanya appointment milik patient login
- `DOCTOR`: hanya appointment milik doctor login
- `ADMIN`: semua appointment

Success:

- Status code: `200`
- `data`: array appointment
- `meta`: pagination (`page`, `limit`, `totalItems`, `totalPages`)

## 3) Get Appointment By ID

- Method: `GET`
- Path: `/:id`
- Role: `PATIENT | DOCTOR | ADMIN`

Path params:

- `id`: string, wajib

Aturan akses:

- `ADMIN`: bebas
- `PATIENT`: hanya appointment miliknya
- `DOCTOR`: hanya appointment miliknya

Success:

- Status code: `200`
- `data`: object appointment

Error umum:

- `403` Forbidden
- `404` Appointment not found

## 4) Update Appointment Status

- Method: `PATCH`
- Path: `/:id/status`
- Role: `DOCTOR | ADMIN`

Path params:

- `id`: string, wajib

Request body:

```json
{
  "status": "confirmed"
}
```

Validasi:

- `status`: enum `pending | confirmed | cancelled | completed`

Aturan akses:

- `ADMIN`: bebas
- `DOCTOR`: hanya appointment miliknya

Success:

- Status code: `200`
- `data`: object appointment setelah update

Error umum:

- `403` Forbidden
- `404` Appointment not found

## 5) Delete Appointment

- Method: `DELETE`
- Path: `/:id`
- Role: `PATIENT | ADMIN`

Path params:

- `id`: string, wajib

Aturan akses:

- `ADMIN`: bisa hapus appointment apa pun
- `PATIENT`: hanya appointment miliknya dan status harus `pending`

Success:

- Status code: `200`

```json
{
  "status": "success",
  "message": "Appointment deleted"
}
```

Error umum:

- `400` Only pending appointment can be cancelled
- `403` Forbidden
- `404` Appointment not found
