import { Types } from 'mongoose';

import { Gender } from '../../common/enums/gender.enum';

export interface IPatientProfileSeed {
  user: Types.ObjectId;
  fullName: string;
  dateOfBirth?: Date;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
}

export function generatePatientProfiles(patientUserIds: Types.ObjectId[]): IPatientProfileSeed[] {
  const patientProfiles: IPatientProfileSeed[] = [
    {
      user: patientUserIds[0],
      fullName: 'John Doe',
      dateOfBirth: new Date('1990-05-15'),
      gender: Gender.MALE,
      phoneNumber: '+62812-3456-7890',
      address: 'Jl. Merdeka No. 123, Jakarta',
    },
    {
      user: patientUserIds[1],
      fullName: 'Jane Smith',
      dateOfBirth: new Date('1992-08-22'),
      gender: Gender.FEMALE,
      phoneNumber: '+62813-4567-8901',
      address: 'Jl. Sudirman No. 456, Jakarta',
    },
    {
      user: patientUserIds[2],
      fullName: 'Rini Kusuma',
      dateOfBirth: new Date('1988-03-10'),
      gender: Gender.FEMALE,
      phoneNumber: '+62814-5678-9012',
      address: 'Jl. Gatot Subroto No. 789, Bandung',
    },
    {
      user: patientUserIds[3],
      fullName: 'Bambang Irawan',
      dateOfBirth: new Date('1985-11-28'),
      gender: Gender.MALE,
      phoneNumber: '+62815-6789-0123',
      address: 'Jl. Ahmad Yani No. 234, Surabaya',
    },
    {
      user: patientUserIds[4],
      fullName: 'Dina Marlina',
      dateOfBirth: new Date('1995-06-30'),
      gender: Gender.FEMALE,
      phoneNumber: '+62816-7890-1234',
      address: 'Jl. Rasuna Said No. 567, Medan',
    },
    {
      user: patientUserIds[5],
      fullName: 'Hendra Wijaya',
      dateOfBirth: new Date('1987-09-14'),
      gender: Gender.MALE,
      phoneNumber: '+62817-8901-2345',
      address: 'Jl. Diponegoro No. 890, Yogyakarta',
    },
    {
      user: patientUserIds[6],
      fullName: 'Yuki Tanaka',
      dateOfBirth: new Date('1993-02-19'),
      gender: Gender.MALE,
      phoneNumber: '+62818-9012-3456',
      address: 'Jl. Jenderal Sudirman No. 345, Makassar',
    },
    {
      user: patientUserIds[7],
      fullName: 'Lina Rahman',
      dateOfBirth: new Date('1991-12-05'),
      gender: Gender.FEMALE,
      phoneNumber: '+62819-0123-4567',
      address: 'Jl. Imam Bonjol No. 678, Palembang',
    },
  ];

  return patientProfiles;
}
