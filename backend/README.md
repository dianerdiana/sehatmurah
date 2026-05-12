Berikut rancangan **MVP RESTful API Doctor Appointment** berdasarkan template `sehatmurah`.

## 1. System Analysis

Template HTML sudah mendukung flow utama:

`Search Doctor → Doctor Detail → Booking Confirmation → Payment Details → Success Page → My Booking`

Untuk capstone 1–2 minggu, entity utama cukup:

1. `User`
   Untuk login semua role: `PATIENT`, `DOCTOR`, `ADMIN`.

2. `PatientProfile`
   Biodata tambahan untuk user dengan role `PATIENT`.

3. `DoctorProfile`
   Data dokter, spesialis, lokasi, biaya, rating, dan jadwal praktik.

4. `Appointment`
   Data booking antara patient dan doctor.

5. `Review`
   Rating dan ulasan dokter oleh patient.

Relasi utama:

```txt
User 1---1 PatientProfile
User 1---1 DoctorProfile
Specialist 1---many DoctorProfile
DoctorProfile many---1 Specialist
PatientProfile 1---many Appointment
DoctorProfile 1---many Appointment
DoctorProfile 1---many Review
PatientProfile 1---many Review
```

### Embed vs Reference

Gunakan **reference** untuk data utama:

- `Appointment.patient` → refer ke `PatientProfile`
- `Appointment.doctor` → refer ke `DoctorProfile`
- `Review.patient` → refer ke `PatientProfile`
- `Review.doctor` → refer ke `DoctorProfile`

Gunakan **embedded document** untuk data yang sederhana:

- Jadwal praktik dokter disimpan langsung di `DoctorProfile.schedule`
- Lokasi praktik disimpan langsung di `DoctorProfile.practiceLocation`

Alasannya: jadwal dan lokasi relatif kecil, tidak perlu collection terpisah untuk MVP.

---

# 2. Database Design

## Collection: `users`

| Field    | Type    | Required | Default |
| -------- | ------- | -------: | ------- |
| name     | String  |      Yes | -       |
| email    | String  |      Yes | -       |
| password | String  |      Yes | -       |
| role     | Enum    |      Yes | PATIENT |
| isActive | Boolean |       No | true    |

Index:

```ts
email: unique;
role;
```

---

## Collection: `patient_profiles`

| Field       | Type              | Required | Default |
| ----------- | ----------------- | -------: | ------- |
| user        | ObjectId ref User |      Yes | -       |
| fullName    | String            |      Yes | -       |
| dateOfBirth | Date              |       No | -       |
| gender      | Enum              |       No | -       |
| phoneNumber | String            |       No | -       |
| address     | String            |       No | -       |

Index:

```ts
user: unique;
phoneNumber;
```

---

## Collection: `doctor_profiles`

| Field            | Type              | Required | Default |
| ---------------- | ----------------- | -------: | ------- |
| user             | ObjectId ref User |      Yes | -       |
| fullName         | String            |      Yes | -       |
| specialist       | String            |      Yes | -       |
| profilePhoto     | String            |       No | -       |
| experienceYears  | Number            |       No | 0       |
| description      | String            |       No | -       |
| practiceLocation | Object            |      Yes | -       |
| schedule         | Array             |       No | []      |
| consultationFee  | Number            |      Yes | 0       |
| ratingAverage    | Number            |       No | 0       |
| ratingCount      | Number            |       No | 0       |
| isAvailable      | Boolean           |       No | true    |

Index:

```ts
user: unique;
specialist;
isAvailable;
ratingAverage;
```

---

## Collection: `appointments`

| Field           | Type                        | Required | Default |
| --------------- | --------------------------- | -------: | ------- |
| patient         | ObjectId ref PatientProfile |      Yes | -       |
| doctor          | ObjectId ref DoctorProfile  |      Yes | -       |
| appointmentDate | Date                        |      Yes | -       |
| startTime       | String                      |      Yes | -       |
| endTime         | String                      |      Yes | -       |
| reason          | String                      |       No | -       |
| status          | Enum                        |      Yes | pending |
| bookingCode     | String                      |      Yes | auto    |
| notes           | String                      |       No | -       |

Index:

```ts
bookingCode: unique
doctor + appointmentDate + startTime: unique
patient + appointmentDate
status
```

---

## Collection: `reviews`

| Field       | Type                        | Required | Default |
| ----------- | --------------------------- | -------: | ------- |
| patient     | ObjectId ref PatientProfile |      Yes | -       |
| doctor      | ObjectId ref DoctorProfile  |      Yes | -       |
| appointment | ObjectId ref Appointment    |       No | -       |
| rating      | Number                      |      Yes | -       |
| comment     | String                      |       No | -       |

Index:

```ts
doctor
patient + doctor + appointment: unique optional
```

## Collection: `specialists`

| Field       | Type    | Required | Default |
| ----------- | ------- | -------: | ------- |
| name        | String  |      Yes | -       |
| slug        | String  |      Yes | -       |
| description | String  |       No | -       |
| icon        | String  |       No | -       |
| image       | String  |       No | -       |
| isActive    | Boolean |       No | true    |
| sortOrder   | Number  |       No | 0       |

Index:

```ts
slug: unique;
name;
isActive;
sortOrder;
```

---

# 3. Mongoose Schema TypeScript

## `src/common/enums/user-role.enum.ts`

```ts
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}
```

## `src/common/enums/gender.enum.ts`

```ts
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
```

## `src/common/enums/appointment-status.enum.ts`

```ts
export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}
```

---

## `src/models/user.model.ts`

```ts
import { Schema, model, Document } from 'mongoose';
import { UserRole } from '../common/enums/user-role.enum';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PATIENT,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

export const UserModel = model<IUser>('User', userSchema);
```

---

## `src/models/patient-profile.model.ts`

```ts
import { Schema, model, Document, Types } from 'mongoose';
import { Gender } from '../common/enums/gender.enum';

export interface IPatientProfile extends Document {
  user: Types.ObjectId;
  fullName: string;
  dateOfBirth?: Date;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
}

const patientProfileSchema = new Schema<IPatientProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

patientProfileSchema.index({ user: 1 }, { unique: true });
patientProfileSchema.index({ phoneNumber: 1 });

export const PatientProfileModel = model<IPatientProfile>(
  'PatientProfile',
  patientProfileSchema,
);
```

---

## `src/models/doctor-profile.model.ts`

```ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IPracticeLocation {
  clinicName: string;
  address: string;
  city: string;
}

export interface IDoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface IDoctorProfile extends Document {
  user: Types.ObjectId;
  fullName: string;
  specialist: Types.ObjectId;
  profilePhoto?: string;
  experienceYears: number;
  description?: string;
  practiceLocation: IPracticeLocation;
  schedule: IDoctorSchedule[];
  consultationFee: number;
  ratingAverage: number;
  ratingCount: number;
  isAvailable: boolean;
}

const practiceLocationSchema = new Schema<IPracticeLocation>(
  {
    clinicName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const doctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    day: {
      type: String,
      required: true,
      enum: [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const doctorProfileSchema = new Schema<IDoctorProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    specialist: {
      type: Schema.Types.ObjectId,
      ref: 'Specialist',
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    practiceLocation: {
      type: practiceLocationSchema,
      required: true,
    },
    schedule: {
      type: [doctorScheduleSchema],
      default: [],
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

doctorProfileSchema.index({ user: 1 }, { unique: true });
doctorProfileSchema.index({ specialist: 1 });
doctorProfileSchema.index({ isAvailable: 1 });
doctorProfileSchema.index({ ratingAverage: -1 });

export const DoctorProfileModel = model<IDoctorProfile>(
  'DoctorProfile',
  doctorProfileSchema,
);
```

---

## `src/models/appointment.model.ts`

```ts
import { Schema, model, Document, Types } from 'mongoose';
import { AppointmentStatus } from '../common/enums/appointment-status.enum';

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  reason?: string;
  status: AppointmentStatus;
  bookingCode: string;
  notes?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'PatientProfile',
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'DoctorProfile',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
      required: true,
    },
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

appointmentSchema.index({ bookingCode: 1 }, { unique: true });
appointmentSchema.index(
  { doctor: 1, appointmentDate: 1, startTime: 1 },
  { unique: true },
);
appointmentSchema.index({ patient: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1 });

export const AppointmentModel = model<IAppointment>(
  'Appointment',
  appointmentSchema,
);
```

---

## `src/models/review.model.ts`

```ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  appointment?: Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema<IReview>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'PatientProfile',
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'DoctorProfile',
      required: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ doctor: 1 });
reviewSchema.index(
  { patient: 1, doctor: 1, appointment: 1 },
  { unique: true, sparse: true },
);

export const ReviewModel = model<IReview>('Review', reviewSchema);
```

## `src/models/specialist.model.ts`

```ts
import { Schema, model, Document } from 'mongoose';

export interface ISpecialist extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
}

const specialistSchema = new Schema<ISpecialist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

specialistSchema.index({ slug: 1 }, { unique: true });
specialistSchema.index({ name: 1 });
specialistSchema.index({ isActive: 1 });
specialistSchema.index({ sortOrder: 1 });

export const SpecialistModel = model<ISpecialist>(
  'Specialist',
  specialistSchema,
);
```

---

# 4. Project Structure

Gunakan struktur sederhana, bukan enterprise-level.

```txt
src/
 ├── app.ts
 ├── server.ts
 ├── config/
 │   ├── database.ts
 │   └── env.ts
 │
 ├── common/
 │   └── enums/
 │       ├── user-role.enum.ts
 │       ├── gender.enum.ts
 │       └── appointment-status.enum.ts
 │
 ├── models/
 │   ├── user.model.ts
 │   ├── patient-profile.model.ts
 │   ├── doctor-profile.model.ts
 │   ├── appointment.model.ts
 |   ├── review.model.ts
 │   └── specialist.model.ts
 │
 ├── modules/
 │   ├── auth/
 │   │   ├── auth.routes.ts
 │   │   ├── auth.controller.ts
 │   │   └── auth.service.ts
 │   │
 │   ├── doctors/
 │   │   ├── doctor.routes.ts
 │   │   ├── doctor.controller.ts
 │   │   └── doctor.service.ts
 │   │
 │   ├── appointments/
 │   │   ├── appointment.routes.ts
 │   │   ├── appointment.controller.ts
 │   │   └── appointment.service.ts
 │   │
 │   ├── patients/
 │   │   ├── patient.routes.ts
 │   │   ├── patient.controller.ts
 │   │   └── patient.service.ts
 │   │
 │   ├── reviews/
 │   │   ├── review.routes.ts
 │   │   ├── review.controller.ts
 │   │   └── review.service.ts
 │   │
 │   └── specialists/
 │       ├── specialist.routes.ts
 │       ├── specialist.controller.ts
 │       └── specialist.service.ts
 │
 ├── middlewares/
 │   ├── auth.middleware.ts
 │   ├── role.middleware.ts
 │   └── error.middleware.ts
 │
 ├── utils/
 │   ├── generate-booking-code.ts
 │   ├── jwt.ts
 │   └── password.ts
 │
 └── types/
     └── express.d.ts
```

---

# 5. API Endpoint Recommendation

## Auth

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

Register body sederhana:

```json
{
  "name": "Patient One",
  "email": "patient@mail.com",
  "password": "password123",
  "role": "PATIENT"
}
```

---

## Doctors

```txt
GET    /api/doctors
GET    /api/doctors/:id
POST   /api/doctors              ADMIN only
PATCH  /api/doctors/:id          ADMIN / DOCTOR
DELETE /api/doctors/:id          ADMIN only
```

Query yang penting:

```txt
GET /api/doctors?specialist=Cardiology&city=Jakarta
GET /api/doctors?search=raze
```

Saat membuat doctor:

```json
{
  "user": "userId",
  "fullName": "Dr. Ahmad",
  "specialist": "specialistId",
  "experienceYears": 8,
  "consultationFee": 150000,
  "practiceLocation": {
    "clinicName": "Klinik Sehat Murah",
    "address": "Jl. Merdeka No. 10",
    "city": "Jakarta"
  }
}
```

Saat mengambil list doctor, gunakan populate:

```json
DoctorProfileModel
  .find()
  .populate('specialist', 'name slug icon')
  .sort({ ratingAverage: -1 });
```

---

## Doctor Schedule

Untuk MVP, jadwal bisa update langsung ke doctor profile.

```txt
PATCH /api/doctors/:id/schedule
```

Body:

```json
{
  "schedule": [
    {
      "day": "MONDAY",
      "startTime": "09:00",
      "endTime": "15:00",
      "isAvailable": true
    }
  ]
}
```

---

## Appointments

```txt
POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/:id
PATCH  /api/appointments/:id/status
DELETE /api/appointments/:id
```

Booking body:

```json
{
  "doctor": "doctorProfileId",
  "appointmentDate": "2026-05-20",
  "startTime": "09:30",
  "endTime": "10:30",
  "reason": "Konsultasi kesehatan umum"
}
```

Status update:

```json
{
  "status": "confirmed"
}
```

Role behavior:

```txt
PATIENT: hanya melihat appointment miliknya
DOCTOR: melihat appointment dokter tersebut
ADMIN: melihat semua appointment
```

---

## Patients

```txt
GET    /api/patients/me
PATCH  /api/patients/me
GET    /api/patients/:id          ADMIN only
```

---

## Reviews

```txt
POST   /api/reviews
GET    /api/doctors/:doctorId/reviews
DELETE /api/reviews/:id           ADMIN only
```

Body:

```json
{
  "doctor": "doctorProfileId",
  "appointment": "appointmentId",
  "rating": 5,
  "comment": "Dokternya ramah dan jelas."
}
```

## Specialist

```json
GET    /api/specialists
GET    /api/specialists/:id
POST   /api/specialists          ADMIN only
PATCH  /api/specialists/:id      ADMIN only
DELETE /api/specialists/:id      ADMIN only
```

Untuk home category:

```json
GET /api/specialists?isActive=true
```

Response contoh:

```json
[
  {
    "_id": "specialistId",
    "name": "Cardiology",
    "slug": "cardiology",
    "description": "Heart and cardiovascular specialist",
    "icon": "/icons/cardiology.svg",
    "image": "/images/cardiology.jpg",
    "isActive": true,
    "sortOrder": 1
  }
]
```

---

# 6. Development Priority

## Wajib dikerjakan dulu

1. Setup Express + TypeScript + MongoDB
2. User auth: register, login, JWT
3. Role middleware
4. Doctor list dan doctor detail
5. Appointment booking
6. My booking / appointment history patient
7. Update status appointment oleh doctor/admin

## Setelah core selesai

1. Doctor schedule update
2. Review dan rating dokter
3. Search dokter berdasarkan spesialis/lokasi
4. Admin create/update doctor

## Optional jika waktu masih ada

1. Upload foto dokter
2. Upload bukti pembayaran
3. Payment verification
4. Email notification
5. Dashboard statistik admin
6. Pagination kompleks
7. Reminder appointment

## Bisa dilewati jika waktu mepet

1. Payment system
2. Upload image
3. Real-time notification
4. Calendar integration
5. Multi-clinic doctor
6. Medical records

---

# 7. Simplification Strategy

Untuk capstone 1–2 minggu, gunakan aturan ini:

1. **Jangan buat collection `schedules` terpisah**
   Jadwal dokter cukup embed di `DoctorProfile`.

2. **Jangan buat payment kompleks**
   Template memang punya payment page, tetapi requirement utama adalah appointment. Payment bisa dibuat static atau optional.

3. **Gunakan satu collection `users` untuk semua role**
   Jangan pisahkan `admins`, `patients`, dan `doctors` menjadi collection login terpisah.

4. **Gunakan `PatientProfile` dan `DoctorProfile` untuk detail tambahan**
   Ini lebih rapi daripada memasukkan semua field ke `User`.

5. **Gunakan bookingCode sederhana**
   Contoh: `BK-20260509-8F3A`.

6. **Validasi bentrok jadwal cukup sederhana**
   Cek unique index:

```ts
doctor + appointmentDate + startTime;
```

Sudah cukup untuk MVP.

---

# Recommended MVP Collections

Final paling ideal:

```txt
users
patient_profiles
doctor_profiles
specialists
appointments
reviews
```

Itu sudah cukup untuk mendukung:

- Register/login
- Role patient/doctor/admin
- List dokter
- Detail dokter
- Jadwal dokter
- Booking appointment
- Status appointment
- Riwayat booking patient
- Review dokter
