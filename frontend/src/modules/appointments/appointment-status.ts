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

export const appointmentStatusBadgeVariants: Record<
  AppointmentStatus,
  'secondary' | 'success' | 'outline' | 'destructive'
> = {
  [AppointmentStatus.PENDING]: 'secondary',
  [AppointmentStatus.CONFIRMED]: 'success',
  [AppointmentStatus.COMPLETED]: 'outline',
  [AppointmentStatus.CANCELLED]: 'destructive',
};

export const appointmentStatusOrder: AppointmentStatus[] = [
  AppointmentStatus.PENDING,
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.COMPLETED,
  AppointmentStatus.CANCELLED,
];
