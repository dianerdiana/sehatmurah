# User Acceptance Testing (UAT)

| Date | 10 June 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 4 Marks |

## UAT Scope

The UAT below focuses on the current implementation in the repository. Future ideas are listed separately so the submission clearly distinguishes what is already available from what is planned next.

## Acceptance Test Cases

| Test Case ID | Related Story | Scenario | Expected Result | Scope |
| ----- | ----- | ----- | ----- | ----- |
| TC-01 | USN-1 | Register and log in as a new patient or doctor. | The user account is created or authenticated and routed to the correct role-based area. | Current build |
| TC-02 | USN-2 | Update patient profile information from the profile page. | The profile is saved successfully and refreshed data is shown on the UI. | Current build |
| TC-03 | USN-3 | Search doctors using filters such as name, specialty, location, or availability. | The list updates correctly and only matching doctors are shown. | Current build |
| TC-04 | USN-4 | Open a doctor detail page and inspect schedule and review information. | The page shows profile details, schedule data, and review content without errors. | Current build |
| TC-05 | USN-5 | Book an appointment from a doctor booking page. | The booking request is created and a confirmation screen or booking code is shown. | Current build |
| TC-06 | USN-6 | Open appointment history or appointment details after booking. | The appointment record is visible with the correct status and related doctor information. | Current build |
| TC-07 | USN-7 | Update doctor profile and practice information. | The doctor record is saved and the latest information appears in the profile view. | Current build |
| TC-08 | USN-8 | Change doctor weekly availability and schedule data. | The new schedule is stored and reflected in booking availability. | Current build |
| TC-09 | USN-9 | Admin manage user records and doctor approval. | The admin can create, update, or approve records according to role permissions. | Current build |
| TC-10 | USN-10 | Admin create or update specialist data, including icon and image uploads. | The specialist record is saved and the uploaded media is available through the platform. | Current build |
| TC-11 | USN-11 | Open review management pages and moderate review content. | Reviews can be listed, edited, or moderated from the dashboard. | Current build |
| TC-12 | USN-12 | Manage doctor records from the admin dashboard. | Doctor records can be created, updated, and removed according to permissions. | Current build |
| TC-13 | USN-13 | Upload a full medical document for doctor review. | The document is uploaded and linked to the booking flow. | Future |
| TC-14 | USN-14 | Receive in-app notifications for booking changes. | The user sees real-time or near-real-time updates in the application. | Future |
| TC-15 | USN-15 | Start a telemedicine session from a booking. | The user can join a remote consultation without leaving the platform. | Future |
| TC-16 | USN-16 | Complete payment or AI-assisted guidance during the booking journey. | The user can pay or receive guidance through the same experience. | Future |

## Acceptance Notes

- The current UAT set is aligned with the modules that already exist in the repository.
- Future items stay in the document so the scope is transparent, but they should not be presented as completed features.
- The test cases are designed for reviewer readability and can be executed manually or turned into automated tests later.
