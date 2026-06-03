# SehatMurah Project Documentation

## 1. Introduction

- Project Title: **SehatMurah - Doctor Appointment Booking Platform**
- Team Members:
  - **Dian Erdiana** - Full Stack Developer

## 2. Project Overview

- Purpose:
  SehatMurah is a MERN-based healthcare platform that helps patients discover doctors, book appointments, manage profiles, and submit reviews. It also provides admin tools for managing users, specialists, doctors, patients, appointments, and reviews.
- Features:
  - Patient registration and login with JWT authentication
  - Doctor discovery by specialist, city, and availability
  - Doctor detail pages with reviews and schedules
  - Appointment booking and appointment status management
  - Patient profile management
  - Review creation for completed appointments
  - Admin dashboard modules for users, doctors, patients, specialists, appointments, and reviews
  - File upload support for doctor profile photos and specialist assets

## 3. Architecture

- Frontend:
  - Built with **React 19**, **TypeScript**, and **Vite**
  - Uses **TanStack Router** for file-based routing
  - Uses **TanStack Query** for server-state fetching and caching
  - Uses **CASL** for frontend ability/permission handling
  - Organized by feature modules such as `auth`, `doctors`, `appointments`, `patients`, `reviews`, `specialists`, and `users`
- Backend:
  - Built with **Node.js**, **Express 5**, and **TypeScript**
  - Follows a **modular monolith** architecture
  - Uses route -> controller -> service -> model layering
  - Uses **Zod** for request validation
  - Uses **Multer** for multipart uploads
- Database:
  - Uses **MongoDB** with **Mongoose**
  - Main collections:
    - `users`
    - `patientprofiles`
    - `doctorprofiles`
    - `appointments`
    - `reviews`
    - `specialists`
  - Main relationships:
    - One `User` can have one `PatientProfile`
    - One `User` can have one `DoctorProfile`
    - One `DoctorProfile` belongs to one `Specialist`
    - One `Appointment` belongs to one patient and one doctor
    - One `Review` belongs to one patient, one doctor, and optionally one appointment

## 4. Setup Instructions

- Prerequisites:
  - **Node.js** 20+ recommended
  - **npm**
  - **MongoDB** local server or MongoDB Atlas
- Installation:

### Clone repository

```bash
git clone https://github.com/dianerdiana/sehatmurah.git
cd sehatmurah
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Install frontend dependencies

```bash
cd ../frontend
npm install
```

### Backend environment variables

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

### Frontend environment variables

Create `frontend/.env`:

```env
VITE_BASE_SERVER_URL=http://localhost:5000
```

## 5. Folder Structure

- Client:

```txt
frontend/
|-- public/
|   |-- assets/
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

- Server:

```txt
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

- Backend:

```bash
cd backend
npm run dev
```

- Frontend:

```bash
cd frontend
npm run dev
```

- Default local URLs:
  - Frontend: `http://localhost:3000`
  - Backend API: `http://localhost:5000`
  - Health check: `http://localhost:5000/health`

## 7. API Documentation

The backend exposes REST endpoints under `/api`. Detailed request parameters and response examples already exist in:

- [Auth docs](../../backend/docs/api-spec/auth.md)
- [Appointments docs](../../backend/docs/api-spec/appointments.md)
- [Doctors docs](../../backend/docs/api-spec/doctors.md)
- [Patients docs](../../backend/docs/api-spec/patients.md)
- [Reviews docs](../../backend/docs/api-spec/reviews.md)
- [Specialists docs](../../backend/docs/api-spec/specialists.md)
- [Users docs](../../backend/docs/api-spec/users.md)

### Standard success response

```json
{
  "status": "success",
  "message": "ok",
  "data": {}
}
```

### Standard error response

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": []
}
```

### Endpoint summary

#### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register a patient account |
| POST | `/api/auth/login` | Public | Login and receive JWT token |
| GET | `/api/auth/me` | Bearer token | Get current authenticated user |

#### Doctors

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/doctors` | Public | List doctors with filters |
| GET | `/api/doctors/cities` | Public | List doctor cities |
| GET | `/api/doctors/me` | Bearer token | Get current doctor's profile |
| GET | `/api/doctors/:id` | Public | Get doctor by id |
| GET | `/api/doctors/:doctorId/reviews` | Public | List doctor reviews |
| POST | `/api/doctors/request` | Patient | Submit request to become a doctor |
| POST | `/api/doctors` | Admin | Create doctor profile |
| PUT | `/api/doctors/:id` | Admin, Doctor | Update doctor profile |
| PATCH | `/api/doctors/:id/approve` | Admin | Approve doctor request |
| PATCH | `/api/doctors/:id/reject` | Admin | Reject doctor request |
| PATCH | `/api/doctors/:id/schedule` | Admin, Doctor | Update doctor schedule |
| DELETE | `/api/doctors/:id` | Admin | Delete doctor |

#### Appointments

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/appointments` | Patient | Create appointment |
| GET | `/api/appointments` | Patient, Doctor, Admin | List appointments |
| GET | `/api/appointments/:id` | Patient, Doctor, Admin | Get appointment by id |
| PATCH | `/api/appointments/:id/status` | Doctor, Admin | Update appointment status |
| DELETE | `/api/appointments/:id` | Patient, Admin | Delete appointment |

#### Patients

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/patients/me` | Patient | Get own patient profile |
| PUT | `/api/patients/me` | Patient | Update own patient profile |
| GET | `/api/patients` | Admin | List patients |
| GET | `/api/patients/:id` | Admin | Get patient by id |
| PUT | `/api/patients/:id` | Admin | Update patient by id |
| DELETE | `/api/patients/:id` | Admin | Delete patient |

#### Specialists

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/specialists` | Public | List specialists |
| GET | `/api/specialists/:id` | Public | Get specialist by id |
| POST | `/api/specialists` | Admin | Create specialist |
| PUT | `/api/specialists/:id` | Admin | Update specialist |
| DELETE | `/api/specialists/:id` | Admin | Delete specialist |

#### Reviews

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/reviews` | Patient | Create review |
| GET | `/api/reviews` | Admin | List reviews |
| GET | `/api/reviews/:id` | Admin | Get review by id |
| GET | `/api/reviews/appointments/:id` | Bearer token | Get review by appointment id |
| PUT | `/api/reviews/:id` | Admin | Update review |
| DELETE | `/api/reviews/:id` | Admin | Delete review |

#### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/users` | Admin | List users |
| POST | `/api/users` | Admin | Create user |
| GET | `/api/users/:id` | Admin | Get user by id |
| PUT | `/api/users/:id` | Admin | Update user including activation state |
| DELETE | `/api/users/:id` | Admin | Delete user |

## 8. Authentication

- The backend uses **JWT bearer tokens**
- A token is returned after successful registration and login
- Protected routes require:

```http
Authorization: Bearer <token>
```

- Authentication and authorization flow:
  - `authMiddleware` verifies the JWT token
  - The backend checks whether the user still exists and is still active
  - `roleMiddleware` restricts endpoints by role: `ADMIN`, `DOCTOR`, or `PATIENT`
  - The frontend uses **CASL** to shape UI access based on permissions returned from the backend
- Security notes:
  - Inactive accounts cannot log in
  - Old tokens from disabled accounts are blocked on protected endpoints
  - Passwords are hashed before storage

## 9. User Interface

Main UI areas included in the frontend:

- Public homepage for browsing specialists and recommended doctors
- Doctor search and doctor detail pages
- Booking flow and booking success page
- Patient profile and join-doctor flow
- Authentication screens for login and registration
- Admin dashboard modules for users, doctors, specialists, patients, appointments, and reviews

Representative UI assets currently included in the frontend:

![Homepage Banner](../../frontend/public/assets/image/homepage-header-banner.png)

![Login Illustration](../../frontend/public/assets/image/login-image.png)

## 10. Blackbox Testing

Metodologi pengujian pada platform SehatMurah difokuskan pada **Blackbox Testing** untuk memvalidasi alur fungsional sistem, hak akses berbasis peran (RBAC), dan kebenaran aliran data transaksi.

### 10.1 Skenario Pengujian Blackbox (Blackbox Test Cases)

Berikut adalah daftar skenario pengujian fungsionalitas sistem SehatMurah dari sudut pandang pengguna akhir (Patient, Doctor, Admin):

| Test ID | Modul / Fitur | Deskripsi Pengujian | Langkah Pengujian / Input | Hasil yang Diharapkan (Expected Result) | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | **Authentication** | Registrasi Pasien Baru | Masukkan nama, email valid, dan password aman. Klik tombol "Sign Up". | Password di-hash menggunakan Bcrypt. Akun baru berhasil dibuat di MongoDB dan user diarahkan ke halaman Login. | Pending |
| **TC-02** | **Authentication** | Login Pengguna | Masukkan email dan password yang terdaftar. Klik tombol "Log In". | Server memvalidasi kecocokan password, menandatangani JWT token, menyimpannya di client-side session, dan mengarahkan ke Dashboard. | Pending |
| **TC-03** | **Auth & Authorization** | Batasan Akses Peran (RBAC) | Akses route `/admin` atau `/doctor` menggunakan akun dengan role Patient. | Akses ditolak oleh JWT Middleware (AuthGuard). Sistem mengembalikan response HTTP 403 Forbidden atau me-redirect ke dashboard pasien. | Pending |
| **TC-04** | **Patient Dashboard** | Pencarian & Filter Dokter | Ketik spesialisasi medis atau nama kota pada filter pencarian. | Halaman pencarian hanya menampilkan daftar dokter yang memiliki status `"approved"`. | Pending |
| **TC-05** | **Doctor Onboarding** | Pengajuan Onboarding Dokter | Calon dokter mengisi data STR/SIP, biodata, spesialisasi, dan biaya. Klik "Submit". | Sistem membuat record baru di MongoDB dengan `status: "pending"` dan menampilkan aplikasi tersebut pada dashboard Admin. | Pending |
| **TC-06** | **Admin Dashboard** | Verifikasi Dokter oleh Admin | Admin masuk ke dashboard, melihat daftar dokter pending, lalu menekan tombol "Approve". | Status dokter berubah menjadi `"approved"` dan properti `isDoctor` pada user terkait diubah menjadi `true`. | Pending |
| **TC-07** | **Doctor Dashboard** | Pengaturan Jadwal Konsultasi | Dokter menentukan slot hari dan jam praktik aktif di kalender mingguan. | Slot waktu tersimpan di MongoDB dan muncul secara dinamis sebagai slot yang tersedia pada kalender pemesanan pasien. | Pending |
| **TC-08** | **Booking Gateway** | Pemesanan Jadwal (Booking) | Pasien memilih dokter, slot waktu kosong yang aktif, mengisi keluhan medis, dan klik "Book Now". | Transaksi booking tersimpan di database dengan `status: "pending"`. Slot waktu terkunci agar tidak bisa dipesan pasien lain. | Pending |
| **TC-09** | **Doctor Dashboard** | Manajemen Antrean Booking | Dokter melihat daftar janji masuk, lalu memilih status "Accept" or "Reject". | Status janji temu diperbarui di MongoDB dan notifikasi real-time dikirimkan ke dasbor pasien terkait. | Pending |
| **TC-10** | **Admin Dashboard** | Audit Log & Governance | Admin memantau rekap total pengguna, data dokter aktif, dan seluruh transaksi janji temu di dashboard. | Sistem menyajikan data agregat realtime dari koleksi database MongoDB secara akurat untuk audit sistem. | Pending |

### 10.2 Cara Menjalankan Pengujian Manual

1. **Jalankan Aplikasi secara Lokal**:
   ```bash
   # Jalankan backend
   cd backend && npm run dev
   
   # Jalankan frontend
   cd frontend && npm run dev
   ```
2. **Uji Kasus Positif (Positive Path)**:
   - Daftarkan pasien baru -> daftarkan dokter baru (status pending) -> masuk sebagai admin -> setujui dokter -> masuk sebagai dokter -> atur jadwal -> masuk sebagai pasien -> cari dokter tersebut -> pesan slot -> masuk sebagai dokter -> terima janji temu.
3. **Uji Kasus Negatif (Negative Path)**:
   - Coba lakukan login dengan password yang salah.
   - Coba pesan slot waktu yang sama oleh dua pasien berbeda secara bersamaan.
   - Coba akses halaman Admin secara langsung dari URL tanpa memiliki hak akses Admin.

## 11. Screenshots or Demo

- Current demo status:
  - No deployed public demo URL was found in the repository
  - The project is designed to be run locally using the setup steps above
- Suggested demo flow:
  1. Register a patient account
  2. Browse doctors by specialist and city
  3. Book an appointment
  4. Log in as admin and manage doctors, specialists, users, and appointments

## 12. Known Issues

- The dashboard route currently contains a placeholder page instead of finished analytics content
- Automated test files are not yet committed, so regression checking is mostly manual
- The frontend should define `VITE_BASE_SERVER_URL`; otherwise API URL construction can become invalid
- A live demo link and real in-app screenshots are not currently bundled in the repository

## 13. Future Enhancements

- Add a fully implemented analytics dashboard for admins
- Add email or WhatsApp notifications for appointment reminders
- Add payment gateway integration for consultation fees
- Add richer doctor availability management and time-slot conflict prevention UX
- Add deployment configuration with Docker and CI/CD
- Add automated unit, integration, and end-to-end test coverage
- Add reporting and audit logs for administrative actions
