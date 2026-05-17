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

export type SpecialistResponse = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  countDoctors: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type DoctorResponse = {
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
  __v: number;
  createdAt: string;
  updatedAt: string;
};
