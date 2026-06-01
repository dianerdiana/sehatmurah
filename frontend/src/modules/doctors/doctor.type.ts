export type DoctorSpecialist = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
};

export type DoctorPracticeLocation = {
  clinicName: string;
  address: string;
  city: string;
};

export type DoctorSchedule = {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type Doctor = {
  __v: number;
  _id: string;
  user: string;
  fullName: string;
  specialist: DoctorSpecialist;
  profilePhoto: string;
  experienceYears: number;
  description: string;
  practiceLocation: DoctorPracticeLocation;
  schedule: DoctorSchedule[];
  consultationFee: number;
  ratingAverage: number;
  ratingCount: number;
  isAvailable: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};
