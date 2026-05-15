import { Types } from 'mongoose';

import { IDoctorSchedule, IPracticeLocation } from '../../models/doctor-profile.model';

export interface IDoctorProfileSeed {
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

export function generateDoctorProfiles(
  doctorUserIds: Types.ObjectId[],
  specialistIds: Types.ObjectId[],
): IDoctorProfileSeed[] {
  const scheduleTemplate: IDoctorSchedule[] = [
    { day: 'MONDAY', startTime: '08:00', endTime: '12:00', isAvailable: true },
    { day: 'MONDAY', startTime: '13:00', endTime: '17:00', isAvailable: true },
    { day: 'TUESDAY', startTime: '08:00', endTime: '12:00', isAvailable: true },
    { day: 'TUESDAY', startTime: '13:00', endTime: '17:00', isAvailable: true },
    { day: 'WEDNESDAY', startTime: '08:00', endTime: '12:00', isAvailable: true },
    { day: 'WEDNESDAY', startTime: '13:00', endTime: '17:00', isAvailable: true },
    { day: 'THURSDAY', startTime: '08:00', endTime: '12:00', isAvailable: true },
    { day: 'THURSDAY', startTime: '13:00', endTime: '17:00', isAvailable: true },
    { day: 'FRIDAY', startTime: '08:00', endTime: '12:00', isAvailable: true },
    { day: 'FRIDAY', startTime: '13:00', endTime: '16:00', isAvailable: true },
  ];

  const doctorProfiles: IDoctorProfileSeed[] = [
    {
      user: doctorUserIds[0],
      fullName: 'Dr. Ahmad Wijaya, Sp.J',
      specialist: specialistIds[0], // Cardiologist
      profilePhoto: 'https://via.placeholder.com/200?text=Dr+Ahmad',
      experienceYears: 15,
      description:
        'Experienced cardiologist with expertise in heart disease prevention and treatment',
      practiceLocation: {
        clinicName: 'Klinik Jantung Sehat',
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta',
      },
      schedule: scheduleTemplate,
      consultationFee: 300000,
      ratingAverage: 4.8,
      ratingCount: 42,
      isAvailable: true,
    },
    {
      user: doctorUserIds[1],
      fullName: 'Dr. Siti Nurhaliza, Sp.KK',
      specialist: specialistIds[1], // Dermatologist
      profilePhoto: 'https://via.placeholder.com/200?text=Dr+Siti',
      experienceYears: 12,
      description: 'Dermatologist specializing in skin care and aesthetic treatments',
      practiceLocation: {
        clinicName: 'Klinik Kecantikan Kulit',
        address: 'Jl. Gatot Subroto No. 456',
        city: 'Jakarta',
      },
      schedule: scheduleTemplate,
      consultationFee: 250000,
      ratingAverage: 4.6,
      ratingCount: 38,
      isAvailable: true,
    },
    {
      user: doctorUserIds[2],
      fullName: 'Dr. Budi Santoso, Sp.OT',
      specialist: specialistIds[2], // Orthopedic
      profilePhoto: 'https://via.placeholder.com/200?text=Dr+Budi',
      experienceYears: 18,
      description: 'Orthopedic specialist with expertise in bone fractures and joint replacements',
      practiceLocation: {
        clinicName: 'Klinik Tulang Sehat',
        address: 'Jl. Rasuna Said No. 789',
        city: 'Bandung',
      },
      schedule: scheduleTemplate,
      consultationFee: 350000,
      ratingAverage: 4.9,
      ratingCount: 55,
      isAvailable: true,
    },
    {
      user: doctorUserIds[3],
      fullName: 'Dr. Eka Putri, Sp.A',
      specialist: specialistIds[3], // Pediatrician
      profilePhoto: 'https://via.placeholder.com/200?text=Dr+Eka',
      experienceYears: 10,
      description: 'Pediatrician dedicated to child health and development',
      practiceLocation: {
        clinicName: 'Klinik Anak Ceria',
        address: 'Jl. Ahmad Yani No. 234',
        city: 'Surabaya',
      },
      schedule: scheduleTemplate,
      consultationFee: 200000,
      ratingAverage: 4.7,
      ratingCount: 31,
      isAvailable: true,
    },
    {
      user: doctorUserIds[4],
      fullName: 'Dr. Roni Hermawan, Sp.JP',
      specialist: specialistIds[4], // Psychiatrist
      profilePhoto: 'https://via.placeholder.com/200?text=Dr+Roni',
      experienceYears: 14,
      description: 'Psychiatrist providing mental health counseling and treatment',
      practiceLocation: {
        clinicName: 'Klinik Jiwa Sejahtera',
        address: 'Jl. Diponegoro No. 567',
        city: 'Yogyakarta',
      },
      schedule: scheduleTemplate,
      consultationFee: 280000,
      ratingAverage: 4.5,
      ratingCount: 28,
      isAvailable: true,
    },
  ];

  return doctorProfiles;
}
