# Kumpulan Prompt Generate Gambar Data Flow Diagrams (DFD) - SehatMurah

Dokumen ini berisi kumpulan prompt (dalam bahasa Inggris untuk hasil optimal) yang siap digunakan pada berbagai AI Image Generators (seperti **DALL-E 3**, **Midjourney**) untuk menghasilkan gambar ilustrasi konseptual 3D yang premium, serta prompt untuk diagramming tools (**Miro AI**, **Eraser.io**, **Diagram Copilot**) dan kode **Mermaid** untuk diagram teknis interaktif.

Kumpulan diagram ini mencakup 3 level:
1. **DFD Level 0 (Context Diagram)** - Hubungan eksternal entitas dengan batas sistem.
2. **DFD Level 1 (Process Decomposition Diagram)** - Dekomposisi proses 1.0 sampai 4.0 dan interaksinya dengan MongoDB Collections.
3. **DFD Level 2 (Secure Document Upload & Streaming Process)** - Alur teknis detail penyimpanan file rekam medis menggunakan Multer dan database mapping.

---

### **1. DFD Level 0: Context Diagram**

#### **A. Prompt Konseptual 3D Isometric (DALL-E 3 / Midjourney)**
*Gunakan prompt ini untuk menghasilkan ilustrasi 3D modern, premium, dan estetik untuk disisipkan ke dalam dokumen.*

```text
A premium, high-resolution 3D isometric technical illustration representing a Data Flow Diagram (DFD) Level 0 (Context Diagram) for a clinical web application named 'SehatMurah'. The illustration is set on a clean dark slate-grey background (#1e293b), using a clinical color palette of deep teal (#0e7490), bright medical blue, and clean white accents.

- In the center: A large, glowing translucent rounded glass sphere representing the central system '((SehatMurah MERN System Boundary))'.
- Surrounding the center: Three floating translucent glass cards representing the external entities: 'Patient (External Entity)', 'Doctor (External Entity)', and 'Administrator (External Entity)'.
- Connections: Sleek, glowing neon teal and blue fiber-optic data transfer lines with arrows connect the cards to the central sphere. 
- Minimalist labels next to the glowing lines showing data flows: 'Credentials', 'Booking Requests', 'Timetable Settings', and 'Audit Commands'.

High-tech aesthetic, clean glassmorphism, professional tech presentation slide graphic, no realistic human faces, sharp vector-like icons.
```

#### **B. Prompt Diagram Blok Teknis (Miro AI / Eraser.io / Diagram Copilot)**
*Gunakan prompt ini untuk menghasilkan diagram alir teknis secara otomatis di Miro AI atau Eraser.*

```text
Create a professional DFD Level 0 (Context Diagram) for the 'SehatMurah Doctor Appointment Platform'. Group and connect the system boundary and external entities using a clinical color scheme (Teal for the system, Dark Slate Grey for entities):

1. Central Node: "((SehatMurah MERN System Boundary))" (circle/oval shape, colored deep teal #0e7490)
2. External Entities (rectangles, colored #1e293b, white text):
   - "Patient (External Entity)"
   - "Doctor (External Entity)"
   - "Administrator (External Entity)"

Draw directional flow arrows with the following labels:
- From Patient to System: "1. Credentials / Registration", "2. Search & Calendar Filters", "3. Booking Requests"
- From System to Patient: "4. Doctor Directories & Availability"
- From Doctor to System: "1. Registration & License Files", "2. Timetable & Slot Settings", "3. Accept/Reject Status Actions"
- From System to Doctor: "4. Booking Request Alerts & Details", "5. Secure Medical Records Stream [Future Phase]"
- From Administrator to System: "1. Audit Commands & Queries", "2. Doctor Approval/Reject Actions"
- From System to Administrator: "3. Doctor Applications & System Feeds"
```

---

### **2. DFD Level 1: Process Decomposition Diagram**

#### **A. Prompt Konseptual 3D Isometric (DALL-E 3 / Midjourney)**
```text
A premium, high-resolution 3D isometric technical diagram showing the process decomposition flow (DFD Level 1) of the 'SehatMurah Doctor Appointment Platform'. The design is set on a clean dark slate-grey background (#1e293b) using clinical colors.

- Floating in the center: Four distinct translucent teal-colored process boxes labeled: '(1.0 Auth & Profile Engine)', '(2.0 Doctor Onboarding Portal)', '(3.0 Scheduling & Booking Gateway)', and '(4.0 Notifications & Governance)'.
- Surrounding them: Three cylindrical database icons labeled 'MongoDB: Users', 'MongoDB: Doctors', and 'MongoDB: Appointments', plus a file folder storage icon labeled '/uploads folder'.
- Connectors: Glowing orange and teal data flow lines show read and write interactions between the processes, databases, and external cards (Patient, Doctor, Admin).
- Minimalist labels on the flow lines showing operations like 'Salt-hashed data', 'JWT signed sessions', 'Save PDF', 'Read file stream'.

Sleek, modern software architecture design, soft ambient lighting, clean glassmorphism, no human characters.
```

#### **B. Prompt Diagram Blok Teknis (Miro AI / Eraser.io / Diagram Copilot)**
```text
Create a professional DFD Level 1 (Process Decomposition Diagram) for the 'SehatMurah Doctor Appointment Platform'. Use a clean clinical color theme (Teal for processes, Dark Slate Grey for entities, and Light Grey for database collections):

1. External Entities:
   - "Patient"
   - "Doctor"
   - "Administrator"

2. Processes (rounded rectangles, deep teal #0e7490):
   - "(1.0 Auth & Profile Engine)"
   - "(2.0 Doctor Onboarding Portal)"
   - "(3.0 Scheduling & Booking Gateway)"
   - "(4.0 Notifications & Governance)"

3. Data Stores (cylinders or horizontal parallel lines, light grey):
   - "MongoDB: Users Collection"
   - "MongoDB: Doctors Collection"
   - "MongoDB: Appointments Collection"
   - "Secure Directory: uploads/ folder"

Draw direct directional flow lines with labels:
- Patient -> "Credentials" -> (1.0 Auth & Profile Engine)
- (1.0 Auth & Profile Engine) -> "Salt-hashed data" -> MongoDB: Users Collection
- MongoDB: Users Collection -> "User record" -> (1.0 Auth & Profile Engine)
- (1.0 Auth & Profile Engine) -> "JWT signed sessions" -> Patient
- Doctor -> "Onboarding data & license files" -> (2.0 Doctor Onboarding Portal)
- (2.0 Doctor Onboarding Portal) -> "Pending profile record" -> MongoDB: Doctors Collection
- Administrator -> "Approve/Reject actions" -> (2.0 Doctor Onboarding Portal)
- (2.0 Doctor Onboarding Portal) -> "Updated approval state" -> MongoDB: Doctors Collection
- (2.0 Doctor Onboarding Portal) -> "Set isDoctor=true" -> MongoDB: Users Collection
- Patient -> "Specialty Search" -> (3.0 Scheduling & Booking Gateway)
- MongoDB: Doctors Collection -> "Approved listings" -> (3.0 Scheduling & Booking Gateway)
- (3.0 Scheduling & Booking Gateway) -> "Available slots" -> Patient
- Patient -> "Booking & PDF Upload" -> (3.0 Scheduling & Booking Gateway)
- (3.0 Scheduling & Booking Gateway) -> "Save file metadata" -> MongoDB: Appointments Collection
- (3.0 Scheduling & Booking Gateway) -> "Save PDF binary" -> Secure Directory: uploads/ folder
- Doctor -> "Request file stream" -> (3.0 Scheduling & Booking Gateway)
- Secure Directory: uploads/ folder -> "Stream PDF file data" -> (3.0 Scheduling & Booking Gateway)
- (3.0 Scheduling & Booking Gateway) -> "Authorized file stream" -> Doctor
- Doctor -> "Approve/Reject booking" -> (3.0 Scheduling & Booking Gateway)
- (3.0 Scheduling & Booking Gateway) -> "Update booking status" -> MongoDB: Appointments Collection
- (3.0 Scheduling & Booking Gateway) -> "Trigger alerts" -> (4.0 Notifications & Governance)
- (2.0 Doctor Onboarding Portal) -> "Trigger alerts" -> (4.0 Notifications & Governance)
- (4.0 Notifications & Governance) -> "In-app alerts" -> Patient
- (4.0 Notifications & Governance) -> "In-app alerts" -> Doctor
```

---

### **3. DFD Level 2: Secure Document Upload & Streaming Process**

#### **A. Prompt Konseptual 3D Isometric (DALL-E 3 / Midjourney)**
```text
A premium, high-resolution 3D isometric technical diagram showing a secure document upload and streaming pipeline (DFD Level 2) for the 'SehatMurah' web application. Clean dark background.

- On the Left: A 'Patient' glass card uploading a clinical PDF file into a green-glowing middleware node labeled 'Multer Middleware'.
- In the Center: Multer splits the action: saving physical binary data into a directory chest labeled 'uploads/ folder' and sending mapping metadata to a cylinder database labeled 'MongoDB: Appointments'.
- On the Right: A 'Doctor' glass card sending a GET request secured with a key labeled 'JWT' to a blue-glowing server engine labeled 'Document Streaming Engine'.
- Inside the Stream Engine: It performs checks against 'MongoDB: Appointments' (to verify the assigned doctor role) and reads the binary file from 'uploads/ folder', then outputs a secure direct download stream back to the 'Doctor'.

High contrast, tech flow visualization, clean typography, soft cyan and teal glowing lights, secure data flow aesthetic.
```

#### **B. Prompt Diagram Blok Teknis (Miro AI / Eraser.io / Diagram Copilot)**
```text
Create a DFD Level 2 (Secure Document Upload & Streaming Process) diagram for the 'SehatMurah Doctor Appointment Platform'. Color theme: Teal, Dark Slate Grey, and Accent Green/Blue.

1. Actors:
   - "Patient"
   - "Doctor"

2. Functional Modules (rounded rectangles):
   - "[Multer Middleware Gateway]"
   - "[Appointment Controller Schema]"
   - "[Document Streaming Engine]"

3. Storage & DB:
   - "MongoDB: Appointments Collection" (cylinder)
   - "Secure Directory: uploads/ folder" (folder/directory shape)

Draw the upload and download sequences:
- Patient -> "1. Submit Booking + PDF" -> [Multer Middleware Gateway]
- [Multer Middleware Gateway] -> "2. Hash filename & Save binary" -> Secure Directory: uploads/ folder
- [Multer Middleware Gateway] -> "3. Pass file-path & Booking metadata" -> [Appointment Controller Schema]
- [Appointment Controller Schema] -> "4. Create mapping record" -> MongoDB: Appointments Collection
- [Appointment Controller Schema] -->> Patient: "5. Return Booking Confirmation"

- Doctor -> "6. Dispatch GET with JWT token" -> [Document Streaming Engine]
- [Document Streaming Engine] -> "7. Verify assigned doctor role" -> MongoDB: Appointments Collection
- MongoDB: Appointments Collection -> "8. Return document path" -> [Document Streaming Engine]
- [Document Streaming Engine] -> "9. Fetch binary file data" -> Secure Directory: uploads/ folder
- Secure Directory: uploads/ folder -> "10. Read binary stream" -> [Document Streaming Engine]
- [Document Streaming Engine] -> "11. Authorized file stream" -> Doctor
```

---

### **Langkah Penyelesaian & Pengambilan Gambar**
1. **Menggunakan AI Image Generator (DALL-E 3 / Midjourney):**
   - Salin salah satu prompt konseptual **3D Isometric** di atas.
   - Generate dan unduh gambar yang paling bersih, minim teks yang rusak (*gibberish text*), dan merepresentasikan diagram dengan baik.
   - Ubah nama gambar dan simpan ke folder:
     * Level 0: `deliverables/need-to-submit-phase-wise-template/Requirement Analysis/images/sehatmurah_dfd_level0.png`
     * Level 1: `deliverables/need-to-submit-phase-wise-template/Requirement Analysis/images/sehatmurah_dfd_level1.png`
     * Level 2: `deliverables/need-to-submit-phase-wise-template/Requirement Analysis/images/sehatmurah_dfd_level2.png`

2. **Menggunakan Miro AI atau Eraser.io:**
   - Buka board Miro baru atau Eraser.io, gunakan fitur AI-diagram-generator.
   - Paste prompt **Diagram Blok Teknis** di atas.
   - Sesuaikan tata letak agar rapi dan simpan screenshot gambar tersebut dengan nama yang sama pada direktori `/images/` di atas.
   
3. **Menggunakan Kode Mermaid Langsung:**
   - Anda juga dapat menggunakan kode Mermaid yang sudah ada di berkas [Data Flow Diagrams and User Stories.docx.md](file:///c:/Users/DianErdiana/personal-projects/sehatmurah/deliverables/need-to-submit-phase-wise-template/Requirement%20Analysis/Data%20Flow%20Diagrams%20and%20User%20Stories.docx.md) dengan menyalinnya ke editor visual seperti Mermaid Live Editor (https://mermaid.live) untuk diekspor sebagai PNG/SVG beresolusi tinggi.
