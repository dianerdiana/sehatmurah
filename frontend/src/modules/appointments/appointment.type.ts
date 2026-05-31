import type { AppointmentStatus } from '@/types/enums/appointment-status.enum';

export type AppointmentParty = {
  _id: string;
  fullName: string;
  consultationFee?: number;
  user?: string;
};

export type AppointmentSpecialistParty = {
  _id: string;
  name: string;
  slug: string;
};

export type AppointmentDoctorParty = AppointmentParty & {
  profilePhoto?: string;
  specialist?: string | AppointmentSpecialistParty;
};

export type Appointment = {
  _id: string;
  patient: string | AppointmentParty;
  doctor: string | AppointmentDoctorParty;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  reason?: string;
  status: AppointmentStatus;
  bookingCode: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
