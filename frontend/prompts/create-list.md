Bertindaklah sebagai Expert Frontend Developer yang mahir dalam React, TypeScript, TanStack Table (v8), Shadcn UI, dan TanStack Query (React Query).

Saya butuh rencana komprehensif beserta kode implementasi lengkap untuk membuat halaman "Daftar User" (Users List). Silakan gunakan struktur halaman `frontend/src/routes/_layout-dashboard/app.specialists/index.tsx` sebagai referensi acuan standar pengkodean Anda.

### 1. Konteks & Struktur File

- **Target Halaman**: `frontend/src/routes/_layout-dashboard/app.users/index.tsx`
- **Folder Komponen Kustom**: `frontend/src/modules/users/components/`
- **Sumber Data Fetching**: `frontend/src/modules/users/user.query.ts`

### 2. Fitur Utama yang Dibutuhkan

- **Judul Tabel**: Tambahkan judul tabel yang jelas dan bergaya (styled) di atas data table.
- **Data Table**: Implementasi menggunakan komponen Data Table dari Shadcn UI (yang membungkus TanStack Table).
- **Operasi Server-Side**: Fitur-fitur berikut WAJIB menggunakan fetching sisi server melalui TanStack Query (JANGAN menggunakan filtering/sorting/pagination di sisi klien):
  - **Pencarian (Search)**: Input untuk mencari user (menggunakan debounce jika memungkinkan).
  - **Penyaringan (Filtering)**: Opsi filter berdasarkan kolom yang relevan (misalnya: Status, Poliklinik/Spesialisasi).
  - **Pengurutan (Sorting)**: Header kolom yang dapat diklik untuk mengurutkan data (misalnya: Nama, Tanggal Dibuat).
  - **Paginasi (Pagination)**: Tombol Next/Previous, pemilih ukuran halaman (page size selector), dan indikator halaman saat ini yang sinkron dengan state server.

- **Kolom Aksi (Actions Column)**: Tambahkan kolom `Actions` di akhir baris tabel yang berisi 3 tombol ikon:
  1. **Ikon Edit**: Mengarahkan pengguna ke halaman detail edit di `/app/users/$patientId/edit`.
  2. **Ikon Eye (Lihat)**: Menampilkan Shadcn `Dialog` (Modal) yang berisi detail lengkap data user tersebut.
  3. **Ikon Trash (Hapus)**: Menampilkan Shadcn `Popover` untuk konfirmasi hapus data dengan tombol pilihan "Yes" dan "No".

### 3. Permintaan Rencana Eksekusi (Execution Plan)

Sebelum memberikan kode implementasi, berikan penjelasan singkat mengenai:

1. Bagaimana Anda mengelola sinkronisasi state (URL search params vs React state) untuk paginasi, pengurutan, penyaringan, dan pencarian agar fetching server-side berjalan mulus.
2. Daftar komponen persis yang akan Anda buat di dalam folder komponen kustom.

### 4. Permintaan Kode Implementasi

Berikan kode TypeScript yang lengkap, bersih (clean code), siap produksi (production-ready), dan bertipe ketat (strictly typed) untuk:

1. File rute utama (`app.users.tsx`).
2. File definisi kolom (`columns.tsx`) yang mencakup implementasi fitur `Actions` (Edit link, Detail Modal, & Delete Popover).
3. Komponen wrapper untuk filter/pencarian kustom di dalam folder modul user.

Pastikan semua komponen responsif dan mengikuti praktik terbaik (best practices) dari Tailwind CSS.
