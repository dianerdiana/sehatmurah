# Patients API

Base URL: `/api/patients`

All endpoints require:

`Authorization: Bearer <access_token>`

## Data Model Summary

- `Gender`: `MALE | FEMALE`
- `PatientProfile`: `user`, `fullName`, `dateOfBirth`, `gender`, `phoneNumber`, `address`, `createdAt`, `updatedAt`

## Endpoints

## 1) Get My Profile

- Method: `GET`
- Path: `/me`
- Role: `PATIENT`

Success:

- Status code: `200`
- `data`: patient profile (with user populated: `name`, `email`, `role`)

Common errors:

- `401` Unauthorized / Invalid token
- `403` Only PATIENT can access this endpoint / Forbidden
- `404` Patient profile not found

## 2) Update My Profile

- Method: `PATCH`
- Path: `/me`
- Role: `PATIENT`

Request body (at least 1 field):

```json
{
  "fullName": "Budi Santoso",
  "dateOfBirth": "1998-01-20",
  "gender": "MALE",
  "phoneNumber": "08123456789",
  "address": "Jl. Melati No. 10"
}
```

Validation:

- `fullName`: optional string
- `dateOfBirth`: date (coerce)
- `gender`: `MALE | FEMALE`
- `phoneNumber`: string, min 5, max 30
- `address`: string, min 1, max 500

Success:

- Status code: `200`
- `data`: patient profile after update

Common errors:

- `400` Validation error (including empty body)
- `403` Only PATIENT can access this endpoint / Forbidden
- `404` Patient profile not found

## 3) Get Patient By ID

- Method: `GET`
- Path: `/:id`
- Role: `ADMIN`

Path parameters:

- `id`: required string

Success:

- Status code: `200`
- `data`: patient profile (with user populated: `name`, `email`, `role`, `isActive`)

Common errors:

- `403` Forbidden
- `404` Patient profile not found
