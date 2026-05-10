# Reviews API

Base URL: `/api/reviews`

## Data Model Ringkas

- Field review: `patient`, `doctor`, `appointment`, `rating`, `comment`, `createdAt`, `updatedAt`

## Endpoints

## 1) Create Review

- Method: `POST`
- Path: `/`
- Role: `PATIENT`
- Auth: wajib `Authorization: Bearer <access_token>`

Request body:

```json
{
  "doctor": "doctorProfileId",
  "appointment": "appointmentId",
  "rating": 5,
  "comment": "Pelayanan sangat baik"
}
```

Validasi:

- `doctor`: string, wajib
- `appointment`: string, opsional
- `rating`: integer, min 1, max 5
- `comment`: string, opsional, max 1000

Aturan bisnis penting:

- Jika `appointment` diisi:
  - appointment harus ada
  - appointment harus milik patient yang login
  - doctor pada appointment harus sama dengan payload `doctor`
  - status appointment harus `completed`

Success:

- Status code: `201`
- `data`: object review yang dibuat

Error umum:

- `400` Appointment doctor does not match / Review is only allowed for completed appointment
- `403` Only PATIENT can create review / Forbidden
- `404` Doctor not found / Appointment not found / Patient profile not found
- `409` Duplicate resource (kombinasi patient-doctor-appointment duplikat)

## 2) Delete Review

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
  "message": "Review deleted",
  "data": {}
}
```

Error umum:

- `404` Review not found

## Catatan Endpoint Terkait

Untuk list review per dokter, gunakan endpoint di module doctors:

- `GET /api/doctors/:doctorId/reviews`
- Query: `page`, `limit`
