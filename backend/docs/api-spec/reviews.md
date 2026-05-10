# Reviews API

Base URL: `/api/reviews`

## Data Model Summary

- Review fields: `patient`, `doctor`, `appointment`, `rating`, `comment`, `createdAt`, `updatedAt`

## Endpoints

## 1) Create Review

- Method: `POST`
- Path: `/`
- Role: `PATIENT`
- Auth: requires `Authorization: Bearer <access_token>`

Request body:

```json
{
  "doctor": "doctorProfileId",
  "appointment": "appointmentId",
  "rating": 5,
  "comment": "Excellent service"
}
```

Validation:

- `doctor`: required string
- `appointment`: optional string
- `rating`: integer, min 1, max 5
- `comment`: optional string, max 1000 characters

Important business rules:

- If `appointment` is provided:
  - appointment must exist
  - appointment must belong to the logged-in patient
  - appointment doctor must match the payload `doctor`
  - appointment status must be `completed`

Success:

- Status code: `201`
- `data`: created review object

Common errors:

- `400` Appointment doctor does not match / Review is only allowed for completed appointment
- `403` Only PATIENT can create review / Forbidden
- `404` Doctor not found / Appointment not found / Patient profile not found
- `409` Duplicate resource (duplicate patient-doctor-appointment combination)

## 2) Delete Review

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
  "message": "Review deleted",
  "data": {}
}
```

Common errors:

- `404` Review not found

## Related Endpoint Note

To list reviews by doctor, use the endpoint in the doctors module:

- `GET /api/doctors/:doctorId/reviews`
- Query: `page`, `limit`
