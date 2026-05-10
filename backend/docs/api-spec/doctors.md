# Doctors API

Base URL: `/api/doctors`

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
  "message": "Forbidden"
}
```

## Data Model Ringkas

- `DoctorProfile`: `user`, `fullName`, `specialist`, `profilePhoto`, `experienceYears`, `description`, `practiceLocation`, `schedule`, `consultationFee`, `ratingAverage`, `ratingCount`, `isAvailable`
- `schedule.day`: `MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY`

## Endpoints

## 1) List Doctors

- Method: `GET`
- Path: `/`
- Auth: publik

Query params:

- `specialist` (string, opsional)
- `city` (string, opsional)
- `search` (string, opsional, mencari `fullName`)
- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Success:

- Status code: `200`
- `data`: array doctor profile (dengan populate specialist: `name`, `slug`, `icon`)
- `meta`: pagination

## 2) Get Doctor By ID

- Method: `GET`
- Path: `/:id`
- Auth: publik

Path params:

- `id`: string, wajib

Success:

- Status code: `200`
- `data`: object doctor profile

Error umum:

- `404` Doctor not found

## 3) List Reviews By Doctor

- Method: `GET`
- Path: `/:doctorId/reviews`
- Auth: publik

Path params:

- `doctorId`: string, wajib

Query params:

- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Success:

- Status code: `200`
- `data`: array review (populate patient `fullName`)
- `meta`: pagination

Error umum:

- `404` Doctor not found

## 4) Create Doctor

- Method: `POST`
- Path: `/`
- Role: `ADMIN`
- Auth: wajib `Authorization: Bearer <access_token>`

Request body:

```json
{
  "userId": "userIdDoctor",
  "fullName": "dr. Aulia",
  "specialist": "specialistId",
  "profilePhoto": "https://example.com/photo.jpg",
  "experienceYears": 5,
  "description": "Dokter penyakit dalam",
  "practiceLocation": {
    "clinicName": "Klinik Sehat",
    "address": "Jl. Sudirman No. 1",
    "city": "Jakarta"
  },
  "schedule": [
    {
      "day": "MONDAY",
      "startTime": "09:00",
      "endTime": "12:00",
      "isAvailable": true
    }
  ],
  "consultationFee": 150000,
  "isAvailable": true
}
```

Validasi penting:

- `consultationFee` >= 0
- format `startTime` dan `endTime` harus `HH:mm`

Success:

- Status code: `201`
- `data`: object doctor profile

Error umum:

- `400` User role must be DOCTOR
- `404` User not found
- `409` Doctor profile already exists for this user

## 5) Update Doctor

- Method: `PATCH`
- Path: `/:id`
- Role: `ADMIN | DOCTOR`
- Auth: wajib token

Path params:

- `id`: string, wajib

Request body:

- Partial dari payload create (kecuali `userId`)
- Minimal 1 field

Aturan akses:

- `ADMIN`: bisa update semua doctor
- `DOCTOR`: hanya bisa update profile miliknya

Success:

- Status code: `200`
- `data`: object doctor profile setelah update

Error umum:

- `403` Forbidden
- `404` Doctor not found

## 6) Update Doctor Schedule

- Method: `PATCH`
- Path: `/:id/schedule`
- Role: `ADMIN | DOCTOR`
- Auth: wajib token

Path params:

- `id`: string, wajib

Request body:

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

Success:

- Status code: `200`
- `data`: object doctor profile setelah update schedule

Error umum:

- `400` schedule must be an array / validation error
- `403` Forbidden
- `404` Doctor not found

## 7) Delete Doctor

- Method: `DELETE`
- Path: `/:id`
- Role: `ADMIN`
- Auth: wajib token

Path params:

- `id`: string, wajib

Success:

- Status code: `200`

```json
{
  "status": "success",
  "message": "Doctor deleted",
  "data": {}
}
```

Error umum:

- `404` Doctor not found
