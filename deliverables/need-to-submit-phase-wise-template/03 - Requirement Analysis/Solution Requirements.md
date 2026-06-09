**Project Design Phase-II**  
**Solution Requirements (Functional & Non-functional)**

| Date | 31 May 2026 |
| :---- | :---- |
| Team ID | dianerdiana.de@gmail.com |
| Project Name | SEHATMURAH \- Doctor Appointment |
| Maximum Marks | 4 Marks |

# 

# **Functional & Non-Functional Solution Requirements**

## **1\. Functional Requirements (FR)**

The table below outlines the core functional requirements (Epics and detailed sub-tasks) of the **SehatMurah Doctor Appointment MERN Platform**.

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
| ----- | ----- | ----- |
| **FR-1** | **User Authentication & Profile** | **1.1. Secure Patient Sign Up:** Email, Username, Password, and Role fields. **1.2. JWT Session Login:** Verification of credentials and returning a signed JWT token. **1.3. Cryptographic Hashing:** Hashing password records using Bcrypt salting. **1.4. Profile Setup:** Patients can input contact details and view historical visits. |
| **FR-2** | **Doctor Onboarding & Timetables** | **2.1. Professional Registration Form:** Doctor applicants input specialty, consulting fees, experience, and clinic address. **2.2. TIMETABLE CONFIGURATION:** Approved doctors configure weekly active consulting timings. **2.3. Dashboard Summary:** Doctor dashboard displaying summaries of appointments. |
| **FR-3** | **Administrative Audit & Control** | **3.1. Admin Doctor Verification Portal:** Administrators view, audit, and approve/reject pending doctor applications. **3.2. Role Status Locking:** Toggling doctor approvals instantly locks/unlocks their display status in patient search queries. **3.3. Global User Monitoring:** Administrators monitor all active users, active doctors, and transaction logs. |
| **FR-4** | **Patient Doctor Search & Filters** | **4.1. Specialty Search:** Patients search for doctors by medical specialties. **4.2. Location Filtering:** Patients filter doctors by clinic locations. **4.3. Consultation Fee Filtering:** Patients filter doctors within fee budget thresholds. **4.4. Live Calendar Browsing:** Patients view doctor calendar availability slots. |
| **FR-5** | **Secure Booking & Records Vault (Future Integration)** | **5.1. Slot Reservation Validation:** Checking slot overlaps before booking. **5.2. Multer Document Upload Interceptor (Future Phase):** Patients upload clinical PDF/images during booking. **5.3. Secure Storage Routing (Future Phase):** Files are stored in a secure local /uploads/ folder and mapped to the appointment schema. |
| **FR-6** | **Doctor Queue Management** | **6.1. Live Booking Request Board:** Doctors view scheduled appointments on their dashboard. **6.2. Status Action Buttons:** Doctors confirm, complete, or reject booking requests. **6.3. Secure Patient File Streaming (Future Phase):** Doctors securely download/stream the patient records attached to bookings. |
| **FR-7** | **Real-Time Alerts & Notification Feed (Future Integration)** | **7.1. Patient Alert Feed (Future Phase):** Updates to booking status dynamically trigger patient notification feeds. **7.2. Doctor Request Alerts (Future Phase):** New bookings trigger active notifications on the doctor dashboard. **7.3. Clear Notification (Future Phase):** Users can read and delete alerts in their feed. |

---

## **2\. Non-Functional Requirements (NFR)**

The table below outlines the quality attributes and technical specifications ensuring the platform remains secure, scalable, and highly performant.

| NFR No. | Non-Functional Requirement | Description & Technical Specification |
| ----- | ----- | ----- |
| **NFR-1** | **Usability** | **1\. Intuitive Distress-Free Design:** The UI is built using Bootstrap/Material UI, optimized for high responsiveness and readability. The patient booking flow is completed in under three steps (Search \-\> Select Slot \-\> Confirm) to accommodate patients in physical or emotional distress, with document uploads planned for future iterations. **2\. Accessibility Compliance:** The platform strictly adheres to Web Content Accessibility Guidelines (WCAG 2.1 AA) with high contrast colors and readable text sizes. |
| **NFR-2** | **Security** | **1\. Cryptographic Standard:** Password strings are hashed using Bcrypt with a work factor of 10 rounds before being saved to MongoDB. **2\. JWT Session Security:** Private API endpoints are protected using JWT passed via Authorization Bearer headers. **3\. Medical File Encryption & Streaming (Future Roadmap):** Patient PDFs are stored in a secure, non-public local /uploads/ folder. Access is restricted using route middleware so files are only streamed to authenticated, assigned doctor clients. |
| **NFR-3** | **Reliability** | **1\. System Uptime:** A minimum of 99.9% uptime is guaranteed for the web platform. **2\. Graceful Error Handling:** Backend Express routes incorporate global try-catch blocks and custom centralized error middleware to handle bad client payloads without crashing the Node.js server. Database connections auto-reconnect upon momentary connection loss. |
| **NFR-4** | **Performance** | **1\. Frontend Loading Latency:** The React SPA bundle loads in under 2.0 seconds over standard broadband networks. **2\. Backend API Latency:** Core REST API endpoints (Search, Bookings) respond in under 200ms, aided by MongoDB indexing on critical fields like userId, timings, and booking statuses. |
| **NFR-5** | **Availability** | **1\. Stateless Server Deployment:** The Express backend maintains no in-memory sessions, allowing multiple instances to be easily load-balanced behind NGINX. **2\. Database Resiliency:** High availability and automated failovers are ensured by deploying MongoDB in active replica sets. |
| **NFR-6** | **Scalability** | **1\. NoSQL Horizontal Scaling:** MongoDB's document architecture allows horizontal scaling (sharding) for larger transaction volumes. **2\. Cloud Swappable Storage (Future Roadmap):** The local Multer filesystem storage is designed to be easily migrated to secure cloud storage buckets (like AWS S3 or Google Cloud Storage) to support high-volume diagnostic file uploads globally. |

