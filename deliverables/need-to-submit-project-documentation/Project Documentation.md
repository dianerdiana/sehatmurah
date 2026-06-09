# SehatMurah Project Documentation

## 1. Introduction

- Project Title: SehatMurah - Doctor Appointment Booking Platform
- Project Stage: MVP implementation completed, documentation and submission packaging in progress
- Team Member: Dian Erdiana - Full Stack Developer
- Project Window: 01 May 2026 to 10 June 2026

## 2. Project Overview

SehatMurah is a healthcare booking platform that helps patients find doctors, book appointments, and manage follow-up interactions in a clearer digital flow. The current implementation focuses on the core appointment journey first, then extends into profile management, review handling, specialist organization, and admin governance.

### Implemented Scope

- Patient registration and login with JWT authentication
- Doctor discovery by specialty, city, name, and availability
- Doctor detail pages with schedule and review information
- Appointment booking and appointment status tracking
- Patient and doctor profile management
- Review creation and review management
- Admin tools for users, doctors, patients, specialists, appointments, and reviews
- File upload support for doctor profile photos and specialist assets

### Future Scope

- Medical document vault and richer record sharing
- In-app notifications and reminders
- Payment gateway integration
- Telemedicine or video consultation support
- AI-assisted symptom guidance

## 3. Architecture

### Frontend

- Built with React 19, TypeScript, and Vite
- Uses TanStack Router for file-based routing
- Uses TanStack Query for server-state fetching and caching
- Uses CASL for frontend permission handling
- Organized by feature modules such as auth, doctors, appointments, patients, reviews, specialists, and users

### Backend

- Built with Node.js, Express 5, and TypeScript
- Follows a modular monolith architecture
- Uses route -> controller -> service -> model layering
- Uses Zod for request validation
- Uses Multer for multipart uploads
- Serves uploaded files from the backend `uploads` directory

### Database

- Uses MongoDB with Mongoose
- Main collections:
  - users
  - patientprofiles
  - doctorprofiles
  - appointments
  - reviews
  - specialists
- Main relationships:
  - One User can have one PatientProfile
  - One User can have one DoctorProfile
  - One DoctorProfile belongs to one Specialist
  - One Appointment belongs to one patient and one doctor
  - One Review belongs to one patient, one doctor, and optionally one appointment

## 4. Setup Instructions

### Prerequisites

- Node.js 20+ recommended
- npm
- MongoDB local server or MongoDB Atlas

### Clone Repository

```bash
git clone https://github.com/dianerdiana/sehatmurah.git
cd sehatmurah
```

### Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Backend Environment Variables

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sehatmurah
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
UPLOAD_DIR=uploads
UPLOAD_BASE_URL=/uploads
UPLOAD_MAX_FILE_SIZE_MB=5
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
VITE_BASE_SERVER_URL=http://localhost:5000
```

## 5. Folder Structure

### Client

```text
frontend/
|-- public/
|-- src/
|   |-- components/
|   |-- configs/
|   |-- integrations/
|   |-- modules/
|   |-- routes/
|   |-- types/
|   \-- utils/
|-- package.json
\-- vite.config.*
```

### Server

```text
backend/
|-- docs/
|   \-- api-spec/
|-- src/
|   |-- common/
|   |-- config/
|   |-- middlewares/
|   |-- models/
|   |-- modules/
|   |-- seeders/
|   |-- types/
|   \-- utils/
|-- package.json
\-- tsconfig.json
```

## 6. Running the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

### Default Local URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Backend docs: run `npm run docs` in `backend` to serve Docsify on http://localhost:4000

## 7. API Documentation

The backend exposes REST endpoints under `/api`. Detailed request and response examples are available in `backend/docs/api-spec`.

### Standard Success Response

```json
{
  "status": "success",
  "message": "ok",
  "data": {}
}
```

### Standard Error Response

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": []
}
```

### Endpoint Summary

#### Authentication

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| POST | /api/auth/register | Public | Register a patient account |
| POST | /api/auth/login | Public | Login and receive a JWT token |
| GET | /api/auth/me | Bearer token | Get the current authenticated user |

#### Doctors

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | /api/doctors | Public | List doctors with filters |
| GET | /api/doctors/cities | Public | List doctor cities |
| GET | /api/doctors/me | Bearer token | Get the current doctor's profile |
| GET | /api/doctors/:id | Public | Get doctor by id |
| GET | /api/doctors/:doctorId/reviews | Public | List doctor reviews |
| POST | /api/doctors/request | Patient | Submit request to become a doctor |
| POST | /api/doctors | Admin | Create doctor profile |
| PUT | /api/doctors/:id | Admin, Doctor | Update doctor profile |
| PATCH | /api/doctors/:id/approve | Admin | Approve doctor request |
| PATCH | /api/doctors/:id/reject | Admin | Reject doctor request |
| PATCH | /api/doctors/:id/schedule | Admin, Doctor | Update doctor schedule |
| DELETE | /api/doctors/:id | Admin | Delete doctor |

#### Appointments

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| POST | /api/appointments | Patient | Create appointment |
| GET | /api/appointments | Patient, Doctor, Admin | List appointments |
| GET | /api/appointments/:id | Patient, Doctor, Admin | Get appointment by id |
| PATCH | /api/appointments/:id/status | Doctor, Admin | Update appointment status |
| DELETE | /api/appointments/:id | Patient, Admin | Delete appointment |

#### Patients

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | /api/patients/me | Patient | Get own patient profile |
| PUT | /api/patients/me | Patient | Update own patient profile |
| GET | /api/patients | Admin | List patients |
| GET | /api/patients/:id | Admin | Get patient by id |
| PUT | /api/patients/:id | Admin | Update patient by id |
| DELETE | /api/patients/:id | Admin | Delete patient |

#### Specialists

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | /api/specialists | Public | List specialists |
| GET | /api/specialists/:id | Public | Get specialist by id |
| POST | /api/specialists | Admin | Create specialist |
| PUT | /api/specialists/:id | Admin | Update specialist |
| DELETE | /api/specialists/:id | Admin | Delete specialist |

#### Reviews

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| POST | /api/reviews | Patient | Create review |
| GET | /api/reviews | Admin | List reviews |
| GET | /api/reviews/:id | Admin | Get review by id |
| GET | /api/reviews/appointments/:id | Bearer token | Get review by appointment id |
| PUT | /api/reviews/:id | Admin | Update review |
| DELETE | /api/reviews/:id | Admin | Delete review |

#### Users

| Method | Endpoint | Auth | Description |
| ----- | ----- | ----- | ----- |
| GET | /api/users | Admin | List users |
| POST | /api/users | Admin | Create user |
| GET | /api/users/:id | Admin | Get user by id |
| PUT | /api/users/:id | Admin | Update user including activation state |
| DELETE | /api/users/:id | Admin | Delete user |

## 8. Authentication

- The backend uses JWT bearer tokens.
- A token is returned after successful registration and login.
- Protected routes require `Authorization: Bearer <token>`.
- `authMiddleware` verifies the JWT token.
- The backend checks whether the user still exists and is active.
- `roleMiddleware` restricts endpoints by role: ADMIN, DOCTOR, or PATIENT.
- The frontend uses CASL to shape UI access based on permissions returned from the backend.
- Passwords are hashed before storage.

## 9. User Interface

The UI is already separated into public pages, auth pages, and dashboard pages. The current frontend uses route-based layouts and feature modules so the patient, doctor, and admin experiences stay clearly separated.

## 10. Testing

### Current Validation Approach

- Manual black-box checks on login, search, booking, profile updates, admin management, and review flows
- API verification against the documented REST endpoints
- Basic smoke checks for frontend routing and role-based navigation

### Important Test Scenarios

| Test ID | Module / Feature | Test Description | Expected Result |
| ----- | ----- | ----- | ----- |
| TC-01 | Authentication | Register a new patient account. | The account is created successfully and can log in. |
| TC-02 | Authentication | Log in with a valid account. | The JWT token is issued and the user is routed to the correct area. |
| TC-03 | Auth & Authorization | Open a restricted route with the wrong role. | Access is denied or redirected. |
| TC-04 | Doctor Search | Search doctors by specialty or city. | Matching doctors are shown in the list. |
| TC-05 | Booking | Book an appointment from a doctor detail page. | The appointment is created and confirmation is displayed. |
| TC-06 | Doctor Management | Update doctor profile and schedule. | The updated information is saved and reflected in the UI. |
| TC-07 | Admin Management | Manage users, specialists, doctors, and reviews. | The admin actions complete successfully. |

## 11. Known Issues and Current Gaps

- A live demo link is not bundled in this document.
- Automated test coverage is still limited compared with the manual validation flow.
- Future enhancements such as notifications, telemedicine, payment support, and a full medical document workflow are not part of the current MVP.

## 12. Future Enhancements

- Add notification support for booking and review updates
- Add payment gateway integration for consultation fees
- Add telemedicine or video consultation support
- Add a richer medical document upload and sharing workflow
- Add more automated unit, integration, and end-to-end tests
- Add admin analytics and audit logging if the project grows further
