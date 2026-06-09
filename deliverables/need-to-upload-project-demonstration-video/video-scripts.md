# Project Demonstration Video Script

## Instruksi Pemakaian

- Gunakan dokumen ini sebagai panduan rekaman video demonstrasi project.
- Semua kalimat yang dibacakan di video ditulis dalam bahasa Inggris.
- Instruksi teknis dan catatan untuk kamu saya tulis dalam bahasa Indonesia supaya lebih mudah diikuti saat rekaman.
- Kalau ada akun demo atau data seed, pakai akun tersebut agar demo berjalan cepat dan konsisten.
- Idealnya video berdurasi sekitar 10 menit agar kamu punya cukup ruang untuk menunjukkan booking approval, status update, review flow, dan join-doctor flow.

## Alur Demo yang Disarankan

1. Opening dan perkenalan project.
2. Login sebagai patient.
3. Cari dokter, buka detail dokter, lalu booking appointment.
4. Tunjukkan konfirmasi appointment oleh doctor/admin terkait.
5. Tunjukkan status booking yang ter-update dari sisi patient.
6. Tunjukkan review hanya bisa dibuat saat appointment `completed`.
7. Login sebagai doctor, lalu tunjukkan profile dan schedule management.
8. Jika sempat, tunjukkan join-doctor flow dari sisi patient/user.
9. Login sebagai admin, lalu tunjukkan approval request join-doctor dan pengelolaan users, doctors, specialists, serta reviews.
10. Tutup video dengan ringkasan singkat.

## Video Script

### Scene 1 - Opening

**On-screen instruction:**
- Buka halaman utama SehatMurah.
- Tampilkan judul project atau landing page sebentar.

**Narration:**
> Hello everyone, my name is Dian Erdiana, and this is SehatMurah, a doctor appointment booking platform built to help patients find doctors, book appointments, and manage healthcare-related interactions in one place.
>
> In this demonstration, I will show the main features of the platform from the patient, doctor, and admin perspectives.

### Scene 2 - Login

**On-screen instruction:**
- Buka halaman login.
- Login menggunakan akun demo patient.

**Narration:**
> First, I will log in as a patient.  
> The platform uses secure authentication with JWT, so users can access only the pages that match their role.

### Scene 3 - Patient Doctor Search

**On-screen instruction:**
- Arahkan ke halaman pencarian doctor.
- Tunjukkan filter berdasarkan specialty, city, atau availability.
- Buka salah satu detail doctor.

**Narration:**
> After logging in, the patient can search for doctors using filters such as name, specialty, city, and availability.
>
> Here, I can open a doctor detail page to view the profile, practice location, schedule, and available review information before making a booking decision.

### Scene 4 - Appointment Booking

**On-screen instruction:**
- Buka halaman booking dokter.
- Pilih schedule yang tersedia.
- Isi data booking yang dibutuhkan.
- Submit booking.

**Narration:**
> Next, the patient can book an appointment directly from the doctor page.
>
> The booking flow is designed to be simple and fast, so the patient can select an available schedule and confirm the appointment in just a few steps.

### Scene 5 - Appointment Confirmation by Doctor/Admin

**On-screen instruction:**
- Logout lalu login sebagai doctor atau admin.
- Buka halaman appointment management.
- Pilih satu appointment baru dan ubah statusnya menjadi approved, accepted, atau status yang relevan di project kamu.

**Narration:**
> After the appointment is created, the doctor or admin can review the booking and confirm it from the dashboard.
>
> This confirmation step helps the platform control the consultation flow and makes the booking status easier to manage.

### Scene 6 - Appointment Status for Patient

**On-screen instruction:**
- Logout lalu login kembali sebagai patient.
- Buka appointment history atau appointment detail.
- Tunjukkan status booking yang sudah berubah.

**Narration:**
> From the patient side, the updated appointment status is visible in the appointment history or detail page.
>
> This makes the booking process transparent, because the patient can immediately see whether the appointment is still pending, approved, or completed.

### Scene 7 - Review After Completed Appointment

**On-screen instruction:**
- Pastikan appointment berada pada status `completed`.
- Buka halaman review creation.
- Tunjukkan bahwa review bisa dibuat hanya setelah appointment selesai.

**Narration:**
> Once the appointment status becomes completed, the patient can submit a review.
>
> This ensures that reviews are tied to finished consultations, which keeps the feedback flow more meaningful and reliable.

### Scene 8 - Doctor View

**On-screen instruction:**
- Logout lalu login sebagai doctor demo.
- Buka halaman doctor profile atau schedule settings.
- Tunjukkan update profile dan update schedule.

**Narration:**
> Now I will switch to the doctor account.
>
> From the doctor dashboard, the doctor can update profile information, manage practice details, and adjust weekly availability so the booking schedule stays accurate.

### Scene 9 - Join-Doctor Flow

**On-screen instruction:**
- Jika sempat, login sebagai patient atau user biasa.
- Buka halaman `join-doctor`.
- Isi data permintaan menjadi doctor dan submit request.

**Narration:**
> If needed, a user can also submit a request to join the platform as a doctor.
>
> This flow is useful for onboarding new doctors in a controlled way before the admin reviews the request.

### Scene 10 - Admin Approval for Join-Doctor

**On-screen instruction:**
- Logout lalu login sebagai admin.
- Buka dashboard approval atau doctor management.
- Tunjukkan request join-doctor yang masuk.
- Approve request jika data valid.

**Narration:**
> From the admin dashboard, the join-doctor request can be reviewed and approved if the submitted information is valid.
>
> This gives the platform a clear verification step before a user becomes an active doctor on the system.

### Scene 11 - Admin View

**On-screen instruction:**
- Logout lalu login sebagai admin demo.
- Buka dashboard admin.
- Tunjukkan daftar users, doctors, specialists, dan reviews.
- Jika memungkinkan, buka salah satu form edit atau approval.

**Narration:**
> Finally, I will switch to the admin account.
>
> The admin dashboard provides centralized control for managing users, doctors, specialists, appointments, and reviews.
>
> This makes it easier to maintain platform quality, verify records, and keep the system organized.

### Scene 12 - Upload Support

**On-screen instruction:**
- Jika ada waktu, tampilkan fitur upload profile photo atau specialist asset.

**Narration:**
> The platform also includes media upload support for assets such as doctor profile photos and specialist images, which helps keep the user interface visually complete and consistent.

### Scene 13 - Closing

**On-screen instruction:**
- Kembali ke homepage atau dashboard utama.
- Tampilkan halaman penutup singkat.

**Narration:**
> In summary, SehatMurah brings together doctor discovery, appointment booking, profile management, review handling, and admin governance in one healthcare platform.
>
> Thank you for watching this demonstration.

## Short Closing Version

Kalau kamu ingin versi video yang lebih singkat, kamu bisa pakai urutan ini:

1. Opening.
2. Patient login and doctor booking.
3. Doctor/admin appointment confirmation.
4. Patient status update and review after completed appointment.
5. Doctor profile and schedule management.
6. Join-doctor request and admin approval.
7. Admin dashboard.
8. Closing.

## Catatan Penting Saat Rekaman

- Usahakan suara stabil dan tempo bicara tidak terlalu cepat.
- Kalau halaman loading, tunggu sampai data tampil sebelum melanjutkan narasi.
- Jangan terlalu banyak membaca teks dengan nada datar; usahakan seperti presentasi nyata.
- Kalau fitur review atau upload belum ingin ditunjukkan, kamu bisa melewatinya dan tetap menutup dengan ringkasan fitur utama.
