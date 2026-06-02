**Project Planning Phase**  
**Project Planning - SehatMurah Doctor Appointment Platform**

| Date | 2 June 2026 |
| :---- | :---- |
| Team ID | SehatMurah Development Team |
| Project Name | SehatMurah - Doctor Appointment MERN Web Application |
| Maximum Marks | 5 Marks |

---

# Agile Project Planning & Backlog Management

## 1. Product Backlog, Sprint Schedule, and Estimation

Below is the dependency-ordered Product Backlog and Sprint Schedule designed specifically for the **SehatMurah Doctor Appointment MERN Web Application**. The user stories are estimated in Story Points (using the Fibonacci sequence) based on implementation complexity, backend database integrations, and UI state requirements.

| Sprint | Functional Requirement (Epic) | User Story Number | User Story / Task | Story Points | Priority | Team Members |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| **Sprint-1** | Patient Authentication & Profile Management | **USN-1** | As a patient, I can sign up for the application by entering my email and a secure password so that I can create a secure account. | **3** | High | Dian (Fullstack) |
| **Sprint-1** | Patient Authentication & Profile Management | **USN-2** | As a patient, I can log into the application using my credentials and receive a secure JWT token so that my session remains authenticated. | **2** | High | Dian (Fullstack) |
| **Sprint-1** | Patient Authentication & Profile Management | **USN-3** | As a patient, I can create and edit my clinical profile (name, phone, health history) so my details are ready for booking appointments. | **3** | Medium | Dian (Fullstack) |
| **Sprint-1** | Doctor Onboarding & Setup | **USN-4** | As a doctor applicant, I can submit my professional registration application (specialty, fee, experience, address) so the admin can review my credentials. | **5** | High | Dian (Fullstack) |
| **Sprint-2** | Doctor Onboarding & Setup | **USN-5** | As an approved doctor, I can configure my weekly availability timings so patients can see when I am free to consult. | **3** | High | Dian (Fullstack) |
| **Sprint-2** | Doctor Onboarding & Setup | **USN-6** | As an administrator, I can view, approve, or reject pending doctor applications so that only certified medical providers are active. | **5** | High | Dian (Fullstack) |
| **Sprint-2** | Patient Booking & Search | **USN-7** | As a patient, I can search and filter approved doctors by specialty, location, and fees so I can select the best provider for my needs. | **5** | High | Dian (Fullstack) |
| **Sprint-3** | Patient Booking & Search | **USN-8** | As a patient, I can book an appointment for a specific slot and upload my clinical PDF/images (using a secure upload stream) so my doctor can review them. | **8** | High | Dian (Fullstack) |
| **Sprint-3** | Patient Booking & Search | **USN-9** | As a doctor, I can securely download/stream the clinical files attached to my bookings to review patient history without exposure. | **5** | High | Dian (Fullstack) |
| **Sprint-3** | Real-time Notifications | **USN-10**| As a patient, I can view my in-app notification feed to receive real-time alerts whenever a doctor updates my booking status. | **3** | Medium | Dian (Fullstack) |
| **Sprint-4** | Live Booking Dashboards | **USN-11**| As a doctor, I can view all my scheduled bookings on my private dashboard and update their status (Approve/Reject) in real-time. | **5** | High | Dian (Fullstack) |
| **Sprint-4** | Admin Governance Portal | **USN-12**| As an administrator, I can monitor all registered users, active doctors, and historical booking transactions in a single dashboard. | **8** | Medium | Dian (Fullstack) |

**Total Estimated Backlog Effort:** **55 Story Points (SP)**

---

## 2. Project Tracker & Release Schedule

The project tracker table details the execution timeline of the 4 Sprints. Sprints are planned with a duration of **6 days** per sprint (totaling 24 days of development) to fit the project timeline.

| Sprint | Total Story Points | Duration | Sprint Start Date | Sprint End Date (Planned) | Story Points Completed (as on Planned End Date) | Sprint Release Date (Actual) |
| :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| **Sprint-1** | 13 SP | 6 Days | 3 June 2026 | 9 June 2026 | 13 SP | 9 June 2026 |
| **Sprint-2** | 13 SP | 6 Days | 10 June 2026 | 16 June 2026 | 13 SP | 16 June 2026 |
| **Sprint-3** | 16 SP | 6 Days | 17 June 2026 | 23 June 2026 | 16 SP | 23 June 2026 |
| **Sprint-4** | 13 SP | 6 Days | 24 June 2026 | 30 June 2026 | 13 SP | 30 June 2026 |

---

## 3. Team Velocity Calculations

**Velocity** represents the rate at which the development team can complete story points per iteration unit. It is a critical metric for predicting the release date of future features.

*   **Total Backlog Points:** 55 Story Points (SP)
*   **Total Project Duration:** 24 Days (4 Sprints × 6 Days per Sprint)
*   **Average Velocity (AV) per Sprint:**  
    $$\text{AV per Sprint} = \frac{\text{Total Story Points}}{\text{Total Sprints}} = \frac{55 \text{ SP}}{4} = 13.75 \text{ SP/Sprint}$$
*   **Average Velocity (AV) per Day:**  
    $$\text{AV per Day} = \frac{\text{AV per Sprint}}{\text{Sprint Duration}} = \frac{13.75 \text{ SP}}{6 \text{ Days}} \approx 2.29 \text{ SP/Day}$$

This steady velocity rate indicates a highly balanced workload distribution across Sprints, avoiding developer burnout while ensuring modular and dependent components (such as auth before bookings, and registration before admin verification) are developed sequentially.

---

## 4. Burndown Chart Management

A **Burndown Chart** is a graphical representation of the work remaining in the backlog versus time. 
*   **Y-Axis:** Represents the remaining story points (starting at 55 SP and trending down to 0 SP).
*   **X-Axis:** Represents time (days or sprints).
*   **Ideal Effort Line:** A straight line from the top-left (Day 0: 55 SP) to the bottom-right (Day 24: 0 SP) representing the optimal completion rate of approximately **2.29 Story Points per day**.
*   **Actual Effort Line:** The actual remaining points logged daily. Keeping this line close to the ideal effort line ensures that team progress is on track and risks of delayed sprint releases are mitigated.

---

**Velocity & Progress Calculation Reference:**  
![Screen Shot 2016-06-16 at 1.37.43 PM][image1]

**Agile Best Practice References:**  
*   [What is Scrum Agile Project Management?](https://www.atlassian.com/agile/project-management)  
*   [How to Implement Scrum Boards](https://www.atlassian.com/agile/tutorials/how-to-do-scrum-with-jira-software)  
*   [Working with User Stories and Epics](https://www.atlassian.com/agile/tutorials/epics)  
*   [Planning and Estimating Story Points](https://www.atlassian.com/agile/project-management/estimation)  
*   [Managing Sprint Burndown Charts](https://www.atlassian.com/agile/tutorials/burndown-charts)  

----charts)  


[image1]: <data:image/png;base64,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>