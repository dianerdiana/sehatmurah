# Proposed Solution

| Date | 16 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 4 Marks |

## Solution Overview

SehatMurah is a role-based healthcare booking platform that connects patients, doctors, and administrators through one application. The solution focuses on the booking journey first, then extends into profile management, moderation, and platform governance.

## Core User Journeys

### Patient Journey

1. Register or log in securely.
2. Search doctors by name, specialty, location, or availability.
3. Open doctor details and review available schedules.
4. Book an appointment and receive booking details.
5. View appointment history and leave a review after the visit.

### Doctor Journey

1. Log in and access doctor-specific pages.
2. Update profile information and practice details.
3. Manage schedule availability.
4. Review incoming appointments and keep practice data current.

### Administrator Journey

1. Review platform users and doctor accounts.
2. Approve or manage doctor-related records.
3. Maintain specialist categories.
4. Moderate review and user data as needed.

## What Makes the Solution Practical

- The application uses a modular backend, so each major domain can be maintained independently.
- The frontend is route-driven, which keeps the public and dashboard experiences separated.
- The current feature set matches the actual implementation, so the documentation does not depend on future assumptions.
- Upload support and static asset serving already exist in the stack, which makes media-driven features easier to expand later.

## Future Expansion

The solution can grow into a broader healthcare platform after the MVP is stable. The most natural next steps are notifications, payment integration, telemedicine, smarter analytics, and a richer medical document workflow.
