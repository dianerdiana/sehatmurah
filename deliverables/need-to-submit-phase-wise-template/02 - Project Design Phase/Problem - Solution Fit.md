# Problem - Solution Fit

| Date | 15 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 4 Marks |

## Problem Summary

The healthcare booking experience is still often fragmented. Patients struggle to find trusted doctors, doctors need a clearer way to manage appointments, and administrators need a structured way to verify and govern the platform.

## Solution Summary

SehatMurah addresses this by combining:

- authenticated user access,
- doctor search and detail pages,
- appointment booking and history tracking,
- doctor profile and schedule management,
- specialist, review, and user administration,
- and upload support for media assets already used by the system.

## Fit Analysis

| Problem | Solution Response | Why It Fits |
| ----- | ----- | ----- |
| Patients cannot easily find and book trusted doctors. | Search, filtering, doctor detail pages, and booking flow. | The platform reduces discovery friction and removes manual booking steps. |
| Doctors need a cleaner way to manage practice schedules. | Doctor profile and schedule management. | Doctors can keep availability and profile data in one place. |
| Admins need clear control over trust and access. | Admin dashboards for users, doctors, specialists, and reviews. | The platform can enforce approval and moderation workflows centrally. |
| The system needs a secure foundation. | JWT auth, password hashing, validation, and role-based access control. | These controls protect sensitive data and keep each role in the right area. |

## Conclusion

The proposed solution directly addresses the main problems identified during discovery. It is also realistic for the capstone timeline because the core platform features are modular, practical, and already aligned with the current codebase.
