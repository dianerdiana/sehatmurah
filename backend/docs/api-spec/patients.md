# Patients API

Base URL: `/api/patients`

Semua endpoint membutuhkan header:

`Authorization: Bearer <access_token>`

## Data Model Ringkas

- `Gender`: `MALE | FEMALE`
- `PatientProfile`: `user`, `fullName`, `dateOfBirth`, `gender`, `phoneNumber`, `address`, `createdAt`, `updatedAt`

## Endpoints

## 1) Get My Profile

- Method: `GET`
- Path: `/me`
- Role: `PATIENT`

Success:

- Status code: `200`
- `data`: patient profile (populate user: `name`, `email`, `role`)

Error umum:

- `401` Unauthorized / Invalid token
- `403` Only PATIENT can access this endpoint / Forbidden
- `404` Patient profile not found

## 2) Update My Profile

- Method: `PATCH`
- Path: `/me`
- Role: `PATIENT`

Request body (minimal 1 field):

```json
{
  "fullName": "Budi Santoso",
  "dateOfBirth": "1998-01-20",
  "gender": "MALE",
  "phoneNumber": "08123456789",
  "address": "Jl. Melati No. 10"
}
```

Validasi:

- `fullName`: string, opsional
- `dateOfBirth`: date (coerce)
- `gender`: `MALE | FEMALE`
- `phoneNumber`: string, min 5, max 30
- `address`: string, min 1, max 500

Success:

- Status code: `200`
- `data`: patient profile setelah update

Error umum:

- `400` Validation error (termasuk jika body kosong)
- `403` Only PATIENT can access this endpoint / Forbidden
- `404` Patient profile not found

## 3) Get Patient By ID

- Method: `GET`
- Path: `/:id`
- Role: `ADMIN`

Path params:

- `id`: string, wajib

Success:

- Status code: `200`
- `data`: patient profile (populate user: `name`, `email`, `role`, `isActive`)

Error umum:

- `403` Forbidden
- `404` Patient profile not found
