# Prompt Board Miro AI untuk Fase Brainstorming & Ideasi - SehatMurah

Dokumen ini berisi kumpulan prompt dalam bahasa Inggris (karena AI di Miro bekerja optimal dengan instruksi bahasa Inggris) yang siap disalin dan ditempel (*copy-paste*) ke Miro AI guna menghasilkan board kolaborasi secara otomatis. Setelah board digenerate, Anda dapat menyesuaikan tampilan/warnanya secara manual jika diperlukan lalu mengambil screenshot untuk laporan.

---

### **1. Image 1: Team Gathering & Problem Statement Selection Board**

* **Visual Concept**: Bounding box/frame atau sticky notes berwarna-warni yang dikelompokkan berdasarkan Stakeholder Pain Points (Patient, Doctor, Admin) dengan kartu utama di tengah berisi *Problem Statement (How Might We)*.
* **Fitur Miro AI yang Digunakan**: **"Generate Board"** atau **"Generate Grid/Sticky Notes"**.
* **Prompt untuk Miro AI**:
  ```text
  Create a digital brainstorming board for the 'SehatMurah Doctor Appointment Booking Platform'. The board must have three distinct sections of color-coded sticky notes and a large, prominent central card. 

  1. Section 1: 'Patient Pain Points' (use Red/Orange sticky notes) containing:
     - "Difficulty in searching and identifying verified, licensed, and highly-rated medical professionals."
     - "Inefficient booking systems leading to long, unpredictable queue times at clinics and hospitals."
     - "Loss or fragmentation of crucial medical history or referral records, typically stored as paper documents."

  2. Section 2: 'Doctor Pain Points' (use Blue sticky notes) containing:
     - "Inefficient in managing daily appointment schedules and calendars manually."
     - "Lack of a secure and centralized system to review patient-uploaded health documents before consultation sessions."
     - "Time-consuming onboarding and credential verification processes to list on a reliable platform."

  3. Section 3: 'Platform Administrator Pain Points' (use Yellow sticky notes) containing:
     - "Risk of human error in verifying doctor medical credentials (SIP/STR licensing) without a structured system."
     - "Absence of a centralized governance tool to monitor user bookings and resolve booking conflicts."

  4. Section 4: A large prominent card in the center labeled 'FINAL PROBLEM STATEMENT (How Might We)' containing:
     - "How might we build a secure, user-friendly, and cost-effective doctor appointment booking platform (SehatMurah) using the MERN stack that enables patients to seamlessly discover verified doctors and upload medical documents securely, while empowering doctors to manage their consultation schedules systematically?"
  ```
* **Langkah Penggunaan**:
  1. Buka board Miro baru.
  2. Klik ikon **Miro AI** di toolbar sebelah kiri (ikon bintang/sparkles).
  3. Pilih **Generate board** / **Generate design**.
  4. Tempelkan prompt di atas lalu klik **Generate**.
  5. Atur susunannya agar rapi dan posisikan Problem Statement di bagian tengah yang paling terlihat. Ambil screenshot.

---

### **2. Image 2: Affinity Mapping (Idea Listing & Grouping)**

* **Visual Concept**: Peta afinitas dengan 4 kotak besar (Category A, B, C, D) yang berisi pengelompokan sticky notes fitur-fitur SehatMurah.
* **Fitur Miro AI yang Digunakan**: **"Generate Mind Map"** atau **"Generate Board"** (bisa menggunakan opsi template Affinity Diagram).
* **Prompt untuk Miro AI**:
  ```text
  Create an Affinity Mapping board to group brainstormed features for the 'SehatMurah Doctor Appointment Platform'. Group the features into 4 large distinct containers with clear headers:

  Container A: 'Patient-Centric Core Features'
  Include these features as sticky notes inside:
  - "Secure Registration & Profile Creation: User accounts with encrypted passwords (bcrypt) and session security via JWT"
  - "Doctor Search & Filtration: Filter verified doctors by name, specialty, location, and real-time availability"
  - "Seamless Appointment Booking Form: Interactive interface to select available consultation slots"
  - "Appointment Consultation History: Dashboard displaying past and upcoming bookings with status labels"

  Container B: 'Doctor Dashboard & Autonomy'
  Include these features as sticky notes inside:
  - "Profile & Availability Management: Update bio details, fees, specialty, address, and practice timings dynamically"
  - "Inbound Booking Dashboard: Review incoming patient requests and update status (Approve/Reject)"

  Container C: 'Platform Governance & Admin Controls'
  Include these features as sticky notes inside:
  - "Onboarding & Verification Portal: Review STR/SIP medical licenses of new doctor applicants and grant/revoke access"
  - "Role-Based Access Control (RBAC): Middleware protection to separate Patient, Doctor, and Admin access"

  Container D: 'Inventions & Future Roadmap Scope'
  Include these features as sticky notes inside:
  - "Medical Document Upload & Access: Multer file upload for patient medical history and secure doctor download"
  - "In-App Notifications: Real-time status update alerts and seen/unseen controls on dashboard headers"
  - "Direct Video Consultations (Telemedicine): WebRTC integration for peer-to-peer virtual checkups"
  - "Automated SMS & WhatsApp Reminders: Notification gateways to alert patients 1 day before appointments"
  - "Digital Payment Integration: Midtrans payment gateway to process consultation fees securely"
  - "AI Symptom Checker: Lightweight AI wizard recommending medical specialties based on symptoms"
  ```
* **Langkah Penggunaan**:
  1. Gunakan Miro AI dengan memilih **Generate template / board**.
  2. Masukkan prompt di atas.
  3. Setelah terbuat, Anda bisa memberikan warna pastel yang berbeda untuk masing-masing container (Category A, B, C, D) agar visualnya terlihat premium dan menarik. Ambil screenshot.

---

### **3. Image 3: 2x2 Impact vs. Effort Prioritization Grid**

* **Visual Concept**: Matriks 2x2 dengan sumbu X (Effort: Low to High) dan sumbu Y (Impact: Low to High). Sticky notes ditempatkan sesuai prioritasnya.
* **Fitur Miro AI yang Digunakan**: **"Generate Board"** (sebutkan bahwa Anda ingin template 2x2 Matrix).
* **Prompt untuk Miro AI**:
  ```text
  Create an Impact vs Effort Prioritization Matrix (2x2 Grid) for the 'SehatMurah Doctor Appointment Platform' features. The matrix should have a Y-axis representing 'Impact' (Low to High) and an X-axis representing 'Effort' (Low to High), resulting in 4 quadrants. Place the following features (as sticky notes) in their respective quadrants:

  Quadrant 1: Top Left - High Impact, Low Effort (Quick Wins)
  - "Dynamic Search & Specialty Filtration"

  Quadrant 2: Top Right - High Impact, High Effort (Core MVP / Strategic)
  - "JWT Authentication, Bcrypt Hashing, and RBAC Middleware"
  - "Booking Form (Select & Confirm Slots)"
  - "Doctor Dashboard (Accept/Reject Slots)"
  - "Admin Doctor Licensing Verification Flow"
  - "Multer File Upload (Medical Documents)"

  Quadrant 3: Bottom Left - Low Impact, Low Effort (Fill-ins)
  - "UI Minor Styling Adjustments (e.g., Dark Mode toggle)"

  Quadrant 4: Bottom Right - Low Impact, High Effort (Postponed / Nice to Have)
  - "AI Symptom Diagnostic Checker"
  - "WebRTC Telemedicine Video Consultations"
  - "Midtrans Payment Gateway Integration"
  - "In-App Notifications & Seen/Unseen Logs"
  ```
* **Langkah Penggunaan**:
  1. Pilih opsi **Generate board** pada Miro AI.
  2. Masukkan prompt di atas. Miro AI secara cerdas akan meletakkan sticky notes pada grid matriks 2x2 yang dibuatnya.
  3. Pastikan posisinya sudah presisi dan terbaca jelas sebelum mengambil screenshot.
