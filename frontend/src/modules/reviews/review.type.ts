import type { ReviewStatus } from '@/types/enums/review-status.enum';

export type Review = {
  _id: string;
  __v: number;
  patient: Patient;
  doctor: string | Doctor;
  appointment?: string;
  rating: number;
  comment?: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
};

export type Patient = {
  _id: string;
  fullName: string;
};

export type Doctor = {
  _id: string;
  fullName: string;
  specialist?: Specialist;
};

export type Specialist = {
  _id: string;
  name: string;
  slug: string;
};
