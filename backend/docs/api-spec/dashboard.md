# Dashboard API

Base path: `/api/dashboard`

## Security

All dashboard endpoints require:

- `Authorization: Bearer <token>`

Access is limited to `ADMIN` and `DOCTOR` users.

## Endpoint: Get Dashboard Summary

### Description

Return a role-based dashboard summary. Admin users receive platform-wide metrics, while doctor users receive metrics for their own profile.

### HTTP Method and URL

```http
GET /api/dashboard
```

### Response Shape

The response always follows the standard envelope:

```json
{
  "status": "success",
  "message": "ok",
  "data": {}
}
```

The `data` payload depends on the authenticated role:

- `ADMIN`
  - `role`
  - `title`
  - `description`
  - `metrics`
  - `statusMetrics`
  - `recentAppointments`
  - `pendingDoctors`
  - `recentPatients`
  - `recentReviews`
- `DOCTOR`
  - `role`
  - `title`
  - `description`
  - `doctor`
  - `metrics`
  - `statusMetrics`
  - `todaySchedule`
  - `upcomingAppointments`
  - `recentReviews`
  - `profileMissing` when the doctor profile does not exist yet

### Response Example: Admin

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "role": "ADMIN",
    "title": "Admin dashboard",
    "description": "Monitor platform health, keep the approval queue moving, and spot activity trends at a glance.",
    "metrics": [
      {
        "label": "Total Users",
        "value": 120,
        "helper": "All registered accounts",
        "format": "number",
        "tone": "info"
      }
    ],
    "statusMetrics": [
      {
        "label": "Pending Doctors",
        "value": 4,
        "helper": "Waiting for review",
        "format": "number",
        "tone": "warning"
      }
    ],
    "recentAppointments": [],
    "pendingDoctors": [],
    "recentPatients": [],
    "recentReviews": []
  }
}
```

### Response Example: Doctor

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "role": "DOCTOR",
    "title": "Welcome back, Dr. Alice Hart",
    "description": "Review your schedule, check today's queue, and keep an eye on the patient experience.",
    "doctor": {
      "id": "68321ac367b4c6e7d7a02221",
      "fullName": "Dr. Alice Hart",
      "specialistName": "Cardiology",
      "specialistSlug": "cardiology",
      "clinicName": "Sehat Clinic",
      "city": "Jakarta",
      "approvalStatus": "approved",
      "isAvailable": true,
      "ratingAverage": 4.8,
      "ratingCount": 12,
      "consultationFee": 250000,
      "experienceYears": 7
    },
    "metrics": [],
    "statusMetrics": [],
    "todaySchedule": [],
    "upcomingAppointments": [],
    "recentReviews": []
  }
}
```

### Notes

- Admin summaries are assembled from counts and recent records across users, doctors, patients, appointments, and reviews.
- Doctor summaries are based on the authenticated user id and the related doctor profile.
- If a doctor user does not yet have a doctor profile, the response includes `doctor: null` and `profileMissing: true`.

#### 404 / Error Behavior

If the user is not `ADMIN` or `DOCTOR`, the backend throws an error with the message:

```json
{
  "status": "error",
  "message": "Dashboard is only available for admin and doctor users"
}
```
