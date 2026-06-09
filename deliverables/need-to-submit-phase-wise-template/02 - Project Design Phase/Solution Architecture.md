# Solution Architecture

| Date | 17 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 4 Marks |

## Architecture Overview

SehatMurah uses a modular monolith architecture:

- The frontend is a React application built with Vite.
- The backend is a TypeScript Express API.
- MongoDB stores the domain data.
- Static upload assets are served from the backend so profile and media URLs can be reused by the frontend.

## Main Layers

| Layer | Responsibility | Main Technologies |
| ----- | -------------- | ----------------- |
| Presentation | User-facing pages for public users, doctors, and admins. | React, TanStack Router, Tailwind CSS, Radix UI |
| Data Fetching | API calls, caching, and optimistic UI coordination. | TanStack Query, Axios |
| Domain Logic | Business rules for auth, booking, profiles, specialists, reviews, and users. | Express, TypeScript, Zod |
| Persistence | Stores users, profiles, appointments, reviews, and specialist records. | MongoDB, Mongoose |
| Security | Authentication, role checks, and request validation. | JWT, bcryptjs, CASL, Zod middleware |
| Media Handling | Handles profile photos and other supported uploads. | Multer, static file serving |

## Request Flow

### Authentication Flow

1. The user submits login or register data from the frontend.
2. The frontend validates the form and sends the payload to the API.
3. The backend validates the request with Zod.
4. The auth service creates or verifies the account and returns a JWT.
5. The frontend stores the authenticated state and renders the correct role-based layout.

### Appointment Flow

1. A patient searches for a doctor.
2. Doctor profile and schedule data are fetched from the API.
3. The patient submits an appointment booking request.
4. The backend checks availability, creates the appointment, and returns booking information.
5. The frontend shows the booking confirmation and appointment details.

### Admin Flow

1. The admin opens the dashboard.
2. The frontend requests filtered lists from the API.
3. The backend applies role checks and business rules.
4. The admin updates doctors, specialists, users, or reviews through the relevant module.

## Design Decisions

- Keep the application as a modular monolith so the capstone can stay manageable.
- Use a shared API contract pattern with Zod schemas to reduce mismatch between client and server.
- Use role-based layouts and permissions so each user type sees only the pages they need.
- Keep upload handling inside the backend for now because it fits the current scale and deployment model.

## Future Architecture Improvements

- Move large media to object storage if the project grows beyond local uploads.
- Add background jobs for reminders and notifications.
- Split time-sensitive services like notifications into separate workers if scale increases.
