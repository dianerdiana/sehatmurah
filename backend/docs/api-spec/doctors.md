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

## Data Model Summary

- `DoctorProfile`: `user`, `fullName`, `specialist`, `profilePhoto`, `experienceYears`, `description`, `practiceLocation`, `schedule`, `consultationFee`, `ratingAverage`, `ratingCount`, `isAvailable`
- `schedule.day`: `MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY`

## Endpoints

## 1) List Doctors

- Method: `GET`
- Path: `/`
- Auth: public

Query parameters:

- `specialist` (optional string)
- `city` (optional string)
- `search` (optional string, searches `fullName`)
- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Success:

- Status code: `200`
- `data`: doctor profile array (with specialist populated: `name`, `slug`, `icon`)
- `meta`: pagination

## 2) Get Doctor By ID

- Method: `GET`
- Path: `/:id`
- Auth: public

Path parameters:

- `id`: required string

Success:

- Status code: `200`
- `data`: doctor profile object

Common errors:

- `404` Doctor not found

## 3) List Reviews By Doctor

- Method: `GET`
- Path: `/:doctorId/reviews`
- Auth: public

Path parameters:

- `doctorId`: required string

Query parameters:

- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Success:

- Status code: `200`
- `data`: review array (patient populated with `fullName`)
- `meta`: pagination

Common errors:

- `404` Doctor not found

## 4) Create Doctor

- Method: `POST`
- Path: `/`
- Role: `ADMIN`
- Auth: requires `Authorization: Bearer <access_token>`

Request body:

```json
{
  "userId": "userIdDoctor",
  "fullName": "dr. Aulia",
  "specialist": "specialistId",
  "profilePhoto": "https://example.com/photo.jpg",
  "experienceYears": 5,
  "description": "Internal medicine specialist",
  "practiceLocation": {
    "clinicName": "Sehat Clinic",
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

Key validation:

- `consultationFee` >= 0
- `startTime` and `endTime` must use `HH:mm` format

Success:

- Status code: `201`
- `data`: doctor profile object

Common errors:

- `400` User role must be DOCTOR
- `404` User not found
- `409` Doctor profile already exists for this user

## 5) Update Doctor

- Method: `PATCH`
- Path: `/:id`
- Role: `ADMIN | DOCTOR`
- Auth: token required

Path parameters:

- `id`: required string

Request body:

- Partial payload from create endpoint (except `userId`)
- At least 1 field is required

Access rules:

- `ADMIN`: can update any doctor profile
- `DOCTOR`: can only update their own profile

Success:

- Status code: `200`
- `data`: doctor profile object after update

Common errors:

- `403` Forbidden
- `404` Doctor not found

## 6) Update Doctor Schedule

- Method: `PATCH`
- Path: `/:id/schedule`
- Role: `ADMIN | DOCTOR`
- Auth: token required

Path parameters:

- `id`: required string

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
- `data`: doctor profile object after schedule update

Common errors:

- `400` schedule must be an array / validation error
- `403` Forbidden
- `404` Doctor not found

## 7) Delete Doctor

- Method: `DELETE`
- Path: `/:id`
- Role: `ADMIN`
- Auth: token required

Path parameters:

- `id`: required string

Success:

- Status code: `200`

```json
{
  "status": "success",
  "message": "Doctor deleted",
  "data": {}
}
```

Common errors:

- `404` Doctor not found
