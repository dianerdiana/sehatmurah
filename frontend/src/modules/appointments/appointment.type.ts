import type { AppointmentStatus } from '@/types/enums/appointment-status.enum';

export type AppointmentParty = {
  _id: string;
  fullName: string;
  consultationFee?: number;
  user?: string;
};

export type Appointment = {
  _id: string;
  patient: string | AppointmentParty;
  doctor: string | AppointmentParty;
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
