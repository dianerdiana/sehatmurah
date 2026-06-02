**User Acceptance Testing (UAT) Template** 

| Date | 2 June 2026 |
| :---- | :---- |
| Team ID | SehatMurah Development Team |
| Project Name | SehatMurah - Doctor Appointment MERN Web Application |
| Maximum Marks | 4 Marks |

---

# User Acceptance Testing (UAT) Report

## Project Overview

*   **Project Name:** SehatMurah - Doctor Appointment Booking Platform
*   **Project Description:** SehatMurah is a healthcare platform built on the MERN stack that connects patients with approved medical practitioners. The platform allows patients to search for doctors by specialty, location, and fees; book appointments; upload clinical records; and submit reviews. It enables doctors to configure weekly consulting schedules and process patient queues. Administrators are equipped with an audit dashboard to verify doctor applications, manage user activation states, and monitor transaction logs.
*   **Project Version:** 1.0.0
*   **Testing Period:** 20 May 2026 to 2 June 2026

---

## Testing Scope

The scope of this User Acceptance Testing covers all core functional blocks of the SehatMurah ecosystem. Testing is conducted using **Blackbox Testing** methodologies to validate user workflows and interface actions without examining backend internal methods, ensuring that execution perfectly matches user stories and security requirements.

### 1. Features and Functionalities to be Tested:
*   **User Registration & Session Auth:** Verification of signup workflows, secure JWT generation, local storage session persistence, and dynamic redirection rules.
*   **Profile Setup:** Patient profile updates (contact detail edits, historical bookings feed) and join-doctor professional applications.
*   **Administrative Verification Dashboard:** Auditing pending doctor applications, viewing doctor credentials, and approving/rejecting status switches.
*   **Doctor Availability Scheduling:** Timetable setup tools for doctors to define consulting availability hours.
*   **Doctor Search Directory:** Dynamic search filters by clinical specialty, location, pricing thresholds, and doctor calendar slots.
*   **Appointment Booking & Document Uploads:** Reserving a specific slot, slot collision checking, uploading medical reports via Multer, and saving file metadata.
*   **Secure File Access Layer:** Role and assigned-relationship checks when a doctor attempts to stream/download clinical PDF attachments.
*   **Doctor Queue Control:** Real-time dashboards listing upcoming appointments with direct action buttons (Accept/Complete/Reject).
*   **Patient Notifications Feed:** Live in-app alert logs populated when booking status changes are submitted.
*   **System-Wide Administration Audit:** Admin tool for listing and toggling account statuses (`isActive`) to instantly lock out disabled profiles.

### 2. User Stories / Requirements to be Tested:
*   **USN-1:** As a patient, I can sign up for the application by entering my credentials so that I can create a secure account.
*   **USN-2:** As a patient, I can log into the application using my credentials so that my session remains authenticated.
*   **USN-3:** As a patient, I can set up and edit my clinical profile so my details are ready for booking appointments.
*   **USN-4:** As a doctor applicant, I can submit my professional registration application so the admin can review my credentials.
*   **USN-5:** As an approved doctor, I can configure my weekly availability timings so patients can see when I am free to consult.
*   **USN-6:** As an administrator, I can view, approve, or reject pending doctor applications so that only certified medical providers are active.
*   **USN-7:** As a patient, I can search and filter approved doctors by specialty, location, and fees so I can select the best provider.
*   **USN-8:** As a patient, I can book an appointment for a specific slot and upload my clinical PDF/images so my doctor can review them.
*   **USN-9:** As a doctor, I can securely download/stream the clinical files attached to my bookings to review patient history.
*   **USN-10:** As a patient, I can view my in-app notification feed to receive real-time alerts whenever a doctor updates my booking status.
*   **USN-11:** As a doctor, I can view all my scheduled bookings on my private dashboard and update their status (Approve/Reject) in real-time.
*   **USN-12:** As an administrator, I can monitor all registered users, active doctors, and historical booking transactions in a single dashboard.

---

## Testing Environment

*   **URL/Location:** Local Integrated Testbed
    *   Frontend SPA URL: `http://localhost:3000`
    *   Backend API Endpoint: `http://localhost:5000`
*   **Credentials (for manual Blackbox verification):**
    *   *Administrator Account:* `admin@sehatmurah.com` / `AdminPass123`
    *   *Patient Test Account:* `patient@sehatmurah.com` / `PatientPass123`
    *   *Doctor Test Account:* `doctor@sehatmurah.com` / `DoctorPass123`

---

## Test Cases

The table below catalogs the functional blackbox test cases executed to verify positive flows, negative constraints, security guardrails, and system recovery.

| Test Case ID | Test Scenario | Test Steps | Expected Result | Actual Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-001** | **Patient Sign Up (Positive Flow)** | 1. Navigate to `/register`. <br>2. Fill in Username, unique Email, secure Password.<br>3. Keep default Role as "Patient".<br>4. Click "Sign Up". | Registration success alert is displayed. System redirects to `/login` endpoint immediately. | Registration successful. UI displayed toast notification and redirected. | **Pass** |
| **TC-002** | **Patient Sign Up (Negative Constraint - Duplication)** | 1. Navigate to `/register`.<br>2. Fill in Username and already existing Email.<br>3. Click "Sign Up". | UI blocks submission. Zod/Mongoose errors display: *"Email already registered"*. No duplicate records created. | Registration blocked. Error message displayed correctly below the input. | **Pass** |
| **TC-003** | **Patient Secure Login (Positive Flow)** | 1. Navigate to `/login`.<br>2. Enter valid registered credentials.<br>3. Click "Login". | JWT is issued, stored, and user is redirected to Patient Dashboard. User state and role are loaded into context. | Signed JWT stored in client storage. Home dashboard loaded successfully. | **Pass** |
| **TC-004** | **Patient Login (Negative Control - Deactivated Profile)** | 1. Open `/login`.<br>2. Enter credentials for an account where `isActive: false` (disabled by Admin).<br>3. Click "Login". | Login fails. Error message is displayed: *"Unauthorized: Account is currently deactivated"*. Session token is blocked. | Access denied. Login interface rendered red warning toast indicating disabled status. | **Pass** |
| **TC-005** | **Profile Setup and Update (Positive Flow)** | 1. Navigate to `/profile`.<br>2. Edit Name, Phone, and Medical History details.<br>3. Click "Save Changes". | Profile details are updated in MongoDB `users` collection. New values persist on page refresh. | Changes committed successfully. Refreshing the dashboard displays updated values. | **Pass** |
| **TC-006** | **Doctor Onboarding Request (Positive Flow)** | 1. Navigate to patient profile page.<br>2. Click "Join as Doctor" button.<br>3. Input specialty, experience, consulting fee, clinic address.<br>4. Upload medical license PDF.<br>5. Click "Submit Application". | System uploads the PDF via Multer, maps metadata, initializes profile as `status: "pending"`, and shows success toast. | License PDF saved to server upload folder, database updated with status `pending`. | **Pass** |
| **TC-007** | **Admin Verification Portal (Positive Flow)** | 1. Log in as Administrator.<br>2. Navigate to Admin Dashboard `/admin/doctors`.<br>3. Locate the pending doctor onboarding application.<br>4. Click "Approve". | Application status changes from `pending` to `approved`. User collection updates: `isDoctor` flag set to `true`. | Onboarded doctor status switched to approved, access grants synchronized. | **Pass** |
| **TC-008** | **Doctor Availability Timetable Configuration (Positive Flow)** | 1. Log in as approved Doctor.<br>2. Navigate to `/dashboard/schedule`.<br>3. Select days and input active slot timings (e.g., Mon 09:00 - 12:00).<br>4. Click "Save Timetable". | Schedule details save to `doctorprofiles` timing collection. Timeslots reflect on the public listing calendar. | Availability timeslots saved and verified on doctor detail calendars. | **Pass** |
| **TC-009** | **Patient Doctor Discovery Filters (Positive Flow)** | 1. Log in as Patient.<br>2. On search page, apply filters: Specialty = *"Cardiologist"*, Location = *"Bandung"*, Max Fee = *150,000* IDR.<br>3. Click search. | React UI dynamically filters. The search result returns only approved doctors matching all parameters. | Filter query returned correct matching entries. Non-approved/inactive records are omitted. | **Pass** |
| **TC-010** | **Appointment Booking and PDF Upload (Positive Flow)** | 1. On doctor profile, choose an available calendar time slot.<br>2. Attach a medical diagnostic history PDF file.<br>3. Click "Confirm Booking". | Database commits booking. File is parsed via Multer, stored in `/uploads/`, and mapped to the appointment. | Appointment created with custom booking code; PDF file metadata registered successfully. | **Pass** |
| **TC-011** | **Secure Slot Reservation (Negative Boundary - Collision)** | 1. Open two concurrent browser sessions with different patients.<br>2. Select the same time slot for the same doctor.<br>3. Submit booking simultaneously. | The first transaction completes. The second is rejected with validation block: *"Time slot is no longer available"*. | One transaction completed successfully; second transaction was blocked with elegant error UI. | **Pass** |
| **TC-012** | **Doctor Document Retrieval and Stream (Positive Flow - Security)** | 1. Log in as the Doctor assigned to the booking.<br>2. Navigate to Doctor Dashboard queue.<br>3. Click "Download Attached Diagnostic PDF" link. | Express routes authorize the assigned doctor, read the PDF binary from secure `/uploads/` and stream the file. | PDF streamed and displayed in doctor's browser window with full integrity. | **Pass** |
| **TC-013** | **Secure Document Interceptor (Negative Boundary - Unauthorized Access)** | 1. Copy the PDF download path URL from TC-012.<br>2. Log out and log back in as an unassigned user (another patient or doctor).<br>3. Paste the URL directly into browser address bar. | Security middleware checks token and associations, blocks download, and returns `403 Forbidden` / `401 Unauthorized`. | Access blocked. Browser rendered structured JSON response indicating unauthorized entry. | **Pass** |
| **TC-014** | **Doctor Dashboard Queue Action (Positive Flow)** | 1. Log in as Doctor.<br>2. On booking management panel, locate patient appointment.<br>3. Click "Complete Appointment" action. | Appointment record updates to `status: "completed"`. Patient notification feed is instantly updated with status alert. | Database updated status to completed, triggers correct alert in patient's top feed. | **Pass** |
| **TC-015** | **Admin Governance User Activation Control (Positive Flow)** | 1. Log in as Administrator.<br>2. Navigate to `/admin/users`.<br>3. Find a target user account and toggle "Active Status" to `Inactive` (`isActive = false`). | The targeted user is updated in database. The user's active session is blocked on their next API route request. | Account blocked successfully; subsequent requests from user's JWT were rejected. | **Pass** |

---

## Bug Tracking

The table below catalogs critical issues encountered during development and verified as resolved before final UAT approval.

| Bug ID | Bug Description | Steps to reproduce | Severity | Status | Additional feedback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BG-001** | Race condition allows double booking of identical schedule slots. | 1. Open two patient windows. <br>2. Select the same doctor slot.<br>3. Click "Book" at same timestamp. | **High** | **Closed** | Resolved by applying Mongoose database session transactions to lock slot checks during writes. |
| **BG-002** | Direct access bypasses file authorization checking. | 1. Obtain path name of uploaded PDF. <br>2. Paste URL into an unauthenticated browser window. | **High** | **Closed** | Fixed by creating a dedicated secure file-stream controller route that parses JWT token claims and role boundaries. |
| **BG-003** | Frontend crashed when parsing empty medical histories. | 1. Register new user. <br>2. View profile dashboard prior to entering any medical records. | **Medium** | **Closed** | Patched by wrapping patient detail queries with optional chaining checks and rendering generic empty-state feedback. |
| **BG-004** | Timetable setup allows overlaps (e.g. 10:00-12:00 and 11:00-13:00 on same day). | 1. Log in as doctor.<br>2. Navigate to schedule page.<br>3. Add overlapping time entries. | **Low** | **Open** | Scheduled for next release iteration. A validation check will be added to block timing overlaps during save actions. |

---

## Sign-off

By signing below, the project stakeholders acknowledge that all UAT test cases have been completed, high-severity bugs are fully resolved, and the platform meets all functional and security standards defined in the system specifications.

*   **Tester Name:** Dian Erdiana
*   **Tester Role:** Full Stack QA Engineer / Developer
*   **Date of Test Completion:** 2 June 2026
*   **Signature:** *Dian Erdiana (Digital Sign-off)*

---

## Notes

*   **Continuous Integration Readiness:** All test cases are designed for automation. The frontend and backend testing pipelines are configured using **Vitest** for quick regression tests before release.
*   **Accessibility Adherence:** Interactive elements are verified to be fully navigable via keyboard inputs with clean visually prominent focus rings, satisfying key usability standards.
*   **Deployment Gatekeepers:** Both the Project Lead and Product Owner must authorize deployment based on this UAT report. All production configuration variables must verify secure HTTPS routing.
