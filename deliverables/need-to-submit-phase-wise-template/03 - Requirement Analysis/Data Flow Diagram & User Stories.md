# Data Flow Diagram & User Stories

| Date | 26 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 4 Marks |

## High-Level Data Flow

### External Entities

- Patient
- Doctor
- Administrator

### Core Processes

1. Authentication and authorization
2. Doctor discovery and detail lookup
3. Appointment booking and status tracking
4. Profile and schedule management
5. Specialist, review, and user administration

### Data Stores

- Users
- Patient profiles
- Doctor profiles
- Appointments
- Reviews
- Specialists

## Level 0 Flow

1. A user signs in through the authentication layer.
2. The user is routed based on role.
3. Patients search for doctors and create appointments.
4. Doctors maintain profile and schedule data.
5. Administrators manage user records, specialists, doctors, and reviews.

## Level 1 Flow

### Patient Flow

Patient -> Auth -> Doctor Search -> Doctor Detail -> Appointment Booking -> Appointment Record -> Review Submission

### Doctor Flow

Doctor -> Auth -> Profile Management -> Schedule Update -> Appointment Monitoring -> Practice Data Refresh

### Admin Flow

Admin -> Auth -> User Management -> Doctor Approval -> Specialist Management -> Review Moderation

## User Stories

| ID | User Story | Priority | Status |
| ----- | ----- | ----- | ----- |
| USN-1 | As a patient, I want to register and log in so I can access booking features securely. | High | Implemented |
| USN-2 | As a patient, I want to update my profile so my account information stays current. | Medium | Implemented |
| USN-3 | As a patient, I want to search doctors by name, specialty, location, and availability so I can find the right doctor quickly. | High | Implemented |
| USN-4 | As a patient, I want to view doctor details, schedules, and reviews so I can make an informed decision. | High | Implemented |
| USN-5 | As a patient, I want to book an appointment so I can reserve a consultation slot. | High | Implemented |
| USN-6 | As a patient, I want to view appointment details and history so I can track my bookings. | High | Implemented |
| USN-7 | As a doctor, I want to update my profile and practice information so patients see accurate details. | High | Implemented |
| USN-8 | As a doctor, I want to manage my weekly availability so I can control my schedule. | High | Implemented |
| USN-9 | As an administrator, I want to manage users and doctor approval so platform access stays controlled. | High | Implemented |
| USN-10 | As an administrator, I want to manage specialists, including icon and image uploads, so doctor categorization stays organized. | Medium | Implemented |
| USN-11 | As an administrator, I want to moderate and manage reviews so content stays reliable. | Medium | Implemented |
| USN-12 | As an administrator, I want to manage doctor records so the platform remains accurate and maintainable. | High | Implemented |

## Future Roadmap Stories

| ID | User Story | Priority | Status |
| ----- | ----- | ----- | ----- |
| USN-13 | As a patient, I want to upload detailed medical documents so I can share more context with the doctor. | Medium | Future |
| USN-14 | As a user, I want in-app notifications so I can stay informed about booking changes. | Medium | Future |
| USN-15 | As a patient, I want telemedicine support so I can consult remotely when needed. | Low | Future |
| USN-16 | As a patient, I want payment support and smarter symptom assistance so the platform covers more of the care journey. | Low | Future |
