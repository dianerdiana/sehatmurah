import { Types } from 'mongoose';

import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { generateBookingCode } from '../../utils/generate-booking-code';

export interface IAppointmentSeed {
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

export function generateAppointments(
  patientProfileIds: Types.ObjectId[],
  doctorProfileIds: Types.ObjectId[],
): IAppointmentSeed[] {
  const today = new Date();
  const appointments: IAppointmentSeed[] = [];

  // Generate 8 appointments with various statuses and future dates
  const appointmentDates = [1, 3, 5, 7, 10, 14, 21, 30]; // Days from now

  appointmentDates.forEach((daysFromNow, index) => {
    const appointmentDate = new Date(today);
    appointmentDate.setDate(appointmentDate.getDate() + daysFromNow);
    appointmentDate.setHours(9, 0, 0, 0); // Set to 9 AM

    const statuses: AppointmentStatus[] = [
      AppointmentStatus.PENDING,
      AppointmentStatus.CONFIRMED,
      AppointmentStatus.PENDING,
      AppointmentStatus.CONFIRMED,
      AppointmentStatus.COMPLETED,
      AppointmentStatus.PENDING,
      AppointmentStatus.CONFIRMED,
      AppointmentStatus.CANCELLED,
    ];

    const reasons = [
      'General checkup',
      'Heart examination',
      'Skin consultation',
      'Joint pain consultation',
      'Child vaccination',
      'Routine check',
      'Follow-up consultation',
      'Emergency checkup',
    ];

    appointments.push({
      patient: patientProfileIds[index % patientProfileIds.length],
      doctor: doctorProfileIds[index % doctorProfileIds.length],
      appointmentDate,
      startTime: '09:00',
      endTime: '09:30',
      reason: reasons[index],
      status: statuses[index],
      bookingCode: generateBookingCode(),
      notes: index % 3 === 0 ? 'Please come 15 minutes earlier' : undefined,
    });
  });

  return appointments;
}
