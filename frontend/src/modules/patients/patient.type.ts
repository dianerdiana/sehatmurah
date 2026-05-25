import type { Gender } from '@/types/enums/gender.enum';

type PatientUser = {
  _id?: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
};

export type PatientProfile = {
  _id: string;
  user: string | PatientUser;
  fullName: string;
  dateOfBirth?: string;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
};

export type PatientListItem = Omit<PatientProfile, 'user'> & {
  user: Required<PatientUser>;
};
