import { AppointmentStatus } from '@/types/enums/appointment-status.enum';

export type AppointmentStatusFilter = 'all' | AppointmentStatus;

export const appointmentStatusOptions: Array<{
  value: AppointmentStatusFilter;
  label: string;
}> = [
  { value: 'all', label: 'All statuses' },
  { value: AppointmentStatus.PENDING, label: 'Pending' },
  { value: AppointmentStatus.CONFIRMED, label: 'Confirmed' },
  { value: AppointmentStatus.COMPLETED, label: 'Completed' },
  { value: AppointmentStatus.CANCELLED, label: 'Cancelled' },
];

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PENDING]: 'Pending',
  [AppointmentStatus.CONFIRMED]: 'Confirmed',
  [AppointmentStatus.COMPLETED]: 'Completed',
  [AppointmentStatus.CANCELLED]: 'Cancelled',
};

export const appointmentStatusBadgeVariants: Record<AppointmentStatus, 'warning' | 'success' | 'primary' | 'danger'> = {
  [AppointmentStatus.PENDING]: 'warning',
  [AppointmentStatus.CONFIRMED]: 'success',
  [AppointmentStatus.COMPLETED]: 'primary',
  [AppointmentStatus.CANCELLED]: 'danger',
};

export const appointmentStatusOrder: AppointmentStatus[] = [
  AppointmentStatus.PENDING,
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.COMPLETED,
  AppointmentStatus.CANCELLED,
];
