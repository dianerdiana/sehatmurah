import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { DoctorApprovalStatus } from '../../common/enums/doctor-approval-status.enum';
import { ReviewStatus } from '../../common/enums/review-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';

export type DashboardMetricTone = 'default' | 'info' | 'success' | 'warning' | 'danger';

export type DashboardMetric = {
  label: string;
  value: number | string;
  helper?: string;
  format?: 'number' | 'currency' | 'rating' | 'text';
  tone?: DashboardMetricTone;
};

export type DashboardAppointmentItem = {
  id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  bookingCode: string;
  patientName: string;
  doctorName: string;
  specialistName?: string;
  reason?: string;
  createdAt: string;
};

export type DashboardReviewItem = {
  id: string;
  patientName: string;
  doctorName: string;
  specialistName?: string;
  rating: number;
  comment?: string;
  status: ReviewStatus;
  createdAt: string;
};

export type DashboardDoctorItem = {
  id: string;
  fullName: string;
  specialistName: string;
  city: string;
  status: DoctorApprovalStatus;
  isAvailable: boolean;
  ratingAverage: number;
  ratingCount: number;
  consultationFee: number;
  createdAt: string;
};

export type DashboardPatientItem = {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
};

export type DashboardScheduleItem = {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type AdminDashboardSummary = {
  role: UserRole.ADMIN;
  title: string;
  description: string;
  metrics: DashboardMetric[];
  statusMetrics: DashboardMetric[];
  recentAppointments: DashboardAppointmentItem[];
  pendingDoctors: DashboardDoctorItem[];
  recentPatients: DashboardPatientItem[];
  recentReviews: DashboardReviewItem[];
};

export type DoctorDashboardSummary = {
  role: UserRole.DOCTOR;
  title: string;
  description: string;
  doctor: {
    id: string;
    fullName: string;
    specialistName: string;
    specialistSlug: string;
    clinicName: string;
    city: string;
    approvalStatus: DoctorApprovalStatus;
    isAvailable: boolean;
    ratingAverage: number;
    ratingCount: number;
    consultationFee: number;
    experienceYears: number;
  } | null;
  metrics: DashboardMetric[];
  statusMetrics: DashboardMetric[];
  todaySchedule: DashboardScheduleItem[];
  upcomingAppointments: DashboardAppointmentItem[];
  recentReviews: DashboardReviewItem[];
  profileMissing?: boolean;
};

export type DashboardSummary = AdminDashboardSummary | DoctorDashboardSummary;
