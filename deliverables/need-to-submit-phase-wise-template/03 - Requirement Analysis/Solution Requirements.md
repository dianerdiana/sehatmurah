# Solution Requirements

| Date | 25 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 4 Marks |

## Functional Requirements

| ID | Requirement | Priority | Notes |
| ----- | ----- | ----- | ----- |
| FR-1 | The system shall allow users to register and log in securely. | High | Uses password hashing and JWT-based authentication. |
| FR-2 | The system shall support role-based access for patients, doctors, and administrators. | High | Each role should see only the pages and actions it is allowed to use. |
| FR-3 | The system shall allow patients to search and filter doctors by name, specialty, location, and availability. | High | This is the main discovery flow for patients. |
| FR-4 | The system shall display doctor profile details, practice locations, schedules, and review information. | High | Supports informed booking decisions. |
| FR-5 | The system shall allow patients to book appointments and view appointment history. | High | Includes booking confirmation and status tracking. |
| FR-6 | The system shall allow doctors to manage profile details and update availability schedules. | High | Keeps practice information accurate. |
| FR-7 | The system shall allow administrators to manage users, doctors, and specialist categories. | High | Supports governance and platform organization. |
| FR-8 | The system shall allow patients to submit reviews linked to completed appointments. | Medium | Supports trust and feedback after consultations. |
| FR-9 | The system shall provide review moderation and management tools for administrators. | Medium | Keeps review content manageable and consistent. |
| FR-10 | The system shall support media uploads for profile photos and related platform assets. | Medium | Uses backend upload handling and static serving. |

## Non-Functional Requirements

| ID | Requirement | Priority | Notes |
| ----- | ----- | ----- | ----- |
| NFR-1 | The UI should be responsive and usable on desktop and mobile screens. | High | The design should remain readable across common viewport sizes. |
| NFR-2 | The system should validate user input before accepting it on the server. | High | Zod schemas should be used to reduce invalid data. |
| NFR-3 | The system should keep sensitive data protected through hashing, auth tokens, and role checks. | High | Passwords must never be stored in plain text. |
| NFR-4 | Search and list pages should use pagination and efficient filtering. | Medium | This keeps the interface usable as data grows. |
| NFR-5 | The codebase should remain modular and easy to maintain. | Medium | Each domain should stay separated by feature area. |
| NFR-6 | Uploaded media should be served reliably with clear URL handling. | Medium | This supports doctor profile photos and related assets. |

## Requirement Summary

The requirements are centered on a realistic capstone MVP: secure access, doctor discovery, booking, profile management, review support, and administrative control. The final documentation should stay aligned with these requirements so the submission reflects the actual stage of the product.
