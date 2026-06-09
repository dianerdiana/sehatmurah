# Technology Stack

| Date | 27 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH - Doctor Appointment |
| Maximum Marks | 2 Marks |

## Overview

SehatMurah is built as a two-part web application:

- A React-based frontend for patients, doctors, and admins.
- A TypeScript/Express backend that exposes REST APIs and persists data in MongoDB.

## Stack By Layer

| Layer | Technology | Usage |
| ----- | ---------- | ----- |
| Frontend framework | React 19 | Builds the interactive user interface. |
| Build tool | Vite | Provides fast local development and optimized production builds. |
| Routing | TanStack Router | Handles file-based, type-safe routing across public and dashboard views. |
| Server state | TanStack Query | Manages API data fetching, caching, and invalidation. |
| Form and validation | TanStack React Form, Zod | Powers form handling and schema validation on the client. |
| UI system | Tailwind CSS v4, Radix UI, Base UI, Sonner | Provides the design system, primitives, and toast feedback. |
| Access control | CASL | Controls role-based UI visibility and permission checks. |
| Backend runtime | Node.js + Express 5 | Serves the API and application middleware. |
| Backend language | TypeScript | Keeps the server code strongly typed and maintainable. |
| Database | MongoDB + Mongoose | Stores users, doctors, patients, appointments, reviews, and specialists. |
| Authentication | JSON Web Token (JWT), bcryptjs | Secures login sessions and password hashing. |
| File handling | Multer | Handles profile-photo and media uploads. |
| API validation | Zod | Validates request payloads before the service layer runs. |

## Why These Technologies

- React 19 and TanStack Router/Query fit a modular, route-driven product with many role-based views.
- Express and Mongoose keep the backend simple enough for a capstone while still supporting a real multi-entity domain.
- JWT and bcryptjs provide a standard authentication pattern for role-based healthcare access.
- Tailwind v4 and Radix/Base UI allow the interface to stay responsive and consistent without a heavy component framework.
- Multer supports the current upload workflow used for profile and media assets.

## Supporting Tooling

| Tool | Purpose |
| ---- | ------- |
| TypeScript | Static typing across frontend and backend. |
| ESLint | Linting and code quality enforcement. |
| Prettier | Formatting consistency. |
| Vitest | Automated testing. |
| Docsify | Publishes the backend API documentation in `docs/`. |

## Implementation Notes

- The backend follows a modular monolith structure with separate modules for auth, doctors, patients, appointments, specialists, reviews, users, and dashboard logic.
- The frontend uses route-based layouts for public pages, auth pages, and dashboard pages.
- Upload assets are served from the backend `uploads` directory so media URLs can be reused by the frontend.
