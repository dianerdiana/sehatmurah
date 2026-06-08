import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { DoctorApprovalStatus } from '../../common/enums/doctor-approval-status.enum';
import { ReviewStatus } from '../../common/enums/review-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { ReviewModel } from '../../models/review.model';
import { UserModel } from '../../models/user.model';
import { AuthUser } from '../../types/auth-user.type';

import {
  AdminDashboardSummary,
  DashboardAppointmentItem,
  DashboardDoctorItem,
  DashboardMetric,
  DashboardReviewItem,
  DashboardScheduleItem,
  DashboardSummary,
  DoctorDashboardSummary,
} from './dashboard.type';

const JAKARTA_TIMEZONE = 'Asia/Jakarta';
const JAKARTA_OFFSET_MS = 7 * 60 * 60 * 1000;

type CountRow = {
  _id: string;
  count: number;
};

type PopulatedSpecialist = {
  _id?: unknown;
  name?: string;
  slug?: string;
};

type PopulatedDoctor = {
  _id?: unknown;
  fullName?: string;
  specialist?: PopulatedSpecialist | string;
};

type PopulatedPatient = {
  _id?: unknown;
  fullName?: string;
  createdAt?: string | Date;
  user?: {
    _id?: unknown;
    email?: string;
    isActive?: boolean;
  };
};

type PopulatedAppointment = {
  _id?: unknown;
  appointmentDate?: string | Date;
  startTime?: string;
  endTime?: string;
  status?: AppointmentStatus;
  bookingCode?: string;
  reason?: string;
  createdAt?: string | Date;
  patient?: PopulatedPatient | string;
  doctor?: PopulatedDoctor | string;
};

type PopulatedReview = {
  _id?: unknown;
  rating?: number;
  comment?: string;
  status?: ReviewStatus;
  createdAt?: string | Date;
  patient?: PopulatedPatient | string;
  doctor?: PopulatedDoctor | string;
};

type PopulatedDoctorProfile = {
  _id?: unknown;
  fullName?: string;
  specialist?: PopulatedSpecialist | string;
  practiceLocation?: {
    clinicName?: string;
    city?: string;
  };
  approvalStatus?: DoctorApprovalStatus;
  isAvailable?: boolean;
  ratingAverage?: number;
  ratingCount?: number;
  consultationFee?: number;
  experienceYears?: number;
  schedule?: DashboardScheduleItem[];
  createdAt?: string | Date;
};

const metric = (
  label: string,
  value: number | string,
  helper?: string,
  format?: DashboardMetric['format'],
  tone?: DashboardMetric['tone'],
): DashboardMetric => ({
  label,
  value,
  helper,
  format,
  tone,
});

const zeroedCountMap = <T extends string>(values: readonly T[]) => {
  return Object.fromEntries(values.map((value) => [value, 0])) as Record<T, number>;
};

const applyCountRows = <T extends string>(values: readonly T[], rows: CountRow[]) => {
  const result = zeroedCountMap(values);

  for (const row of rows) {
    if (values.includes(row._id as T)) {
      result[row._id as T] = row.count;
    }
  }

  return result;
};

const getJakartaDayRange = () => {
  const now = new Date();
  const jakartaNow = new Date(now.getTime() + JAKARTA_OFFSET_MS);

  const startUtc = Date.UTC(
    jakartaNow.getUTCFullYear(),
    jakartaNow.getUTCMonth(),
    jakartaNow.getUTCDate(),
    0,
    0,
    0,
    0,
  );
  const endUtc = Date.UTC(
    jakartaNow.getUTCFullYear(),
    jakartaNow.getUTCMonth(),
    jakartaNow.getUTCDate(),
    23,
    59,
    59,
    999,
  );

  return {
    start: new Date(startUtc - JAKARTA_OFFSET_MS),
    end: new Date(endUtc - JAKARTA_OFFSET_MS),
  };
};

const getJakartaDayLabel = () => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: JAKARTA_TIMEZONE,
  })
    .format(new Date())
    .toUpperCase();
};

const toISOString = (value: string | Date | undefined) => {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
};

const getValueFromReference = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as Record<string, unknown>;
};

const getStringFromReference = (value: unknown, key: string) => {
  const reference = getValueFromReference(value);

  return reference && typeof reference[key] === 'string' ? (reference[key] as string) : '';
};

const getSpecialistName = (value: unknown) => {
  const specialist = getValueFromReference(value);

  return specialist && typeof specialist.name === 'string' ? specialist.name : 'Unknown specialist';
};

const getDoctorSummary = (doctor: PopulatedDoctorProfile, createdAt?: string): DashboardDoctorItem => ({
  id: String(doctor._id ?? ''),
  fullName: doctor.fullName ?? '-',
  specialistName: getSpecialistName(doctor.specialist),
  city: doctor.practiceLocation?.city ?? '-',
  status: doctor.approvalStatus ?? DoctorApprovalStatus.PENDING,
  isAvailable: Boolean(doctor.isAvailable),
  ratingAverage: Number(doctor.ratingAverage ?? 0),
  ratingCount: Number(doctor.ratingCount ?? 0),
  consultationFee: Number(doctor.consultationFee ?? 0),
  createdAt: createdAt ?? toISOString(doctor.createdAt),
});

const getAppointmentSummary = (appointment: PopulatedAppointment): DashboardAppointmentItem => {
  const patient = getValueFromReference(appointment.patient);
  const doctor = getValueFromReference(appointment.doctor);
  const specialist = doctor ? getValueFromReference(doctor.specialist) : null;

  return {
    id: String(appointment._id ?? ''),
    appointmentDate: toISOString(appointment.appointmentDate),
    startTime: appointment.startTime ?? '-',
    endTime: appointment.endTime ?? '-',
    status: appointment.status ?? AppointmentStatus.PENDING,
    bookingCode: appointment.bookingCode ?? '-',
    patientName: typeof patient?.fullName === 'string' ? patient.fullName : '-',
    doctorName: typeof doctor?.fullName === 'string' ? doctor.fullName : '-',
    specialistName: typeof specialist?.name === 'string' ? specialist.name : undefined,
    reason: appointment.reason || undefined,
    createdAt: toISOString(appointment.createdAt),
  };
};

const getReviewSummary = (review: PopulatedReview): DashboardReviewItem => {
  const patient = getValueFromReference(review.patient);
  const doctor = getValueFromReference(review.doctor);
  const specialist = doctor ? getValueFromReference(doctor.specialist) : null;

  return {
    id: String(review._id ?? ''),
    patientName: typeof patient?.fullName === 'string' ? patient.fullName : '-',
    doctorName: typeof doctor?.fullName === 'string' ? doctor.fullName : '-',
    specialistName: typeof specialist?.name === 'string' ? specialist.name : undefined,
    rating: Number(review.rating ?? 0),
    comment: review.comment || undefined,
    status: review.status ?? ReviewStatus.PENDING,
    createdAt: toISOString(review.createdAt),
  };
};

const getPatientSummary = (patient: PopulatedPatient, createdAt?: string) => ({
  id: String(patient._id ?? ''),
  fullName: patient.fullName ?? '-',
  email: typeof patient.user?.email === 'string' ? patient.user.email : '-',
  isActive: Boolean(patient.user?.isActive),
  createdAt: createdAt ?? '',
});

const countDocumentsByStatus = async <T extends string>(
  model: { aggregate: (pipeline: any[]) => any },
  match: Record<string, unknown>,
  field: string,
  values: readonly T[],
) => {
  const rows = (await model.aggregate([
    { $match: match },
    {
      $group: {
        _id: `$${field}`,
        count: { $sum: 1 },
      },
    },
  ])) as CountRow[];

  return applyCountRows(values, rows);
};

const getAdminDashboardSummary = async (): Promise<AdminDashboardSummary> => {
  const appointmentFilter: Record<string, unknown> = {};
  const reviewFilter: Record<string, unknown> = {};
  const doctorFilter: Record<string, unknown> = {};
  const patientFilter: Record<string, unknown> = {};

  const { start, end } = getJakartaDayRange();
  const appointmentStatuses = Object.values(AppointmentStatus) as AppointmentStatus[];
  const doctorStatuses = Object.values(DoctorApprovalStatus) as DoctorApprovalStatus[];
  const reviewStatuses = Object.values(ReviewStatus) as ReviewStatus[];

  const [
    totalUsers,
    activeUsers,
    totalDoctors,
    doctorStatusCounts,
    totalPatients,
    totalAppointments,
    todayAppointments,
    appointmentStatusCounts,
    totalReviews,
    reviewStatusCounts,
    recentAppointments,
    pendingDoctors,
    recentPatients,
    recentReviews,
  ] = await Promise.all([
    UserModel.countDocuments(),
    UserModel.countDocuments({ isActive: true }),
    DoctorProfileModel.countDocuments(doctorFilter),
    countDocumentsByStatus(DoctorProfileModel, doctorFilter, 'approvalStatus', doctorStatuses),
    PatientProfileModel.countDocuments(patientFilter),
    AppointmentModel.countDocuments(appointmentFilter),
    AppointmentModel.countDocuments({
      ...appointmentFilter,
      appointmentDate: {
        $gte: start,
        $lte: end,
      },
    }),
    countDocumentsByStatus(AppointmentModel, appointmentFilter, 'status', appointmentStatuses),
    ReviewModel.countDocuments(reviewFilter),
    countDocumentsByStatus(ReviewModel, reviewFilter, 'status', reviewStatuses),
    AppointmentModel.find(appointmentFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('patient', 'fullName')
      .populate({
        path: 'doctor',
        select: 'fullName specialist',
        populate: {
          path: 'specialist',
          select: 'name slug',
        },
      })
      .lean<PopulatedAppointment[]>(),
    DoctorProfileModel.find({ approvalStatus: DoctorApprovalStatus.PENDING })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('specialist', 'name slug')
      .lean<PopulatedDoctorProfile[]>(),
    PatientProfileModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'email isActive')
      .lean<PopulatedPatient[]>(),
    ReviewModel.find(reviewFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('patient', 'fullName')
      .populate({
        path: 'doctor',
        select: 'fullName specialist',
        populate: {
          path: 'specialist',
          select: 'name slug',
        },
      })
      .lean<PopulatedReview[]>(),
  ]);

  return {
    role: UserRole.ADMIN,
    title: 'Admin dashboard',
    description: 'Monitor platform health, keep the approval queue moving, and spot activity trends at a glance.',
    metrics: [
      metric('Total Users', totalUsers, 'All registered accounts', 'number', 'info'),
      metric('Active Users', activeUsers, 'Accounts currently active', 'number', 'success'),
      metric('Doctor Profiles', totalDoctors, 'Clinics and practitioners on record', 'number', 'warning'),
      metric('Patient Profiles', totalPatients, 'Patients available in the system', 'number', 'default'),
    ],
    statusMetrics: [
      metric("Today's Appointments", todayAppointments, 'Scheduled within the Jakarta day', 'number', 'info'),
      metric(
        'Pending Doctors',
        doctorStatusCounts[DoctorApprovalStatus.PENDING],
        'Waiting for review',
        'number',
        'warning',
      ),
      metric(
        'Pending Appointments',
        appointmentStatusCounts[AppointmentStatus.PENDING],
        'Need confirmation',
        'number',
        'warning',
      ),
      metric(
        'Pending Reviews',
        reviewStatusCounts[ReviewStatus.PENDING],
        'Waiting moderation',
        'number',
        'danger',
      ),
      metric(
        'Approved Doctors',
        doctorStatusCounts[DoctorApprovalStatus.APPROVED],
        'Ready to receive bookings',
        'number',
        'success',
      ),
      metric(
        'Completed Appointments',
        appointmentStatusCounts[AppointmentStatus.COMPLETED],
        'Finished consultations',
        'number',
        'success',
      ),
    ],
    recentAppointments: recentAppointments.map(getAppointmentSummary),
    pendingDoctors: pendingDoctors.map((doctor) => getDoctorSummary(doctor, toISOString(doctor.createdAt))),
    recentPatients: recentPatients.map((patient) => getPatientSummary(patient, toISOString(patient.createdAt))),
    recentReviews: recentReviews.map(getReviewSummary),
  };
};

const getDoctorDashboardSummary = async (authUser: AuthUser): Promise<DoctorDashboardSummary> => {
  const doctor = await DoctorProfileModel.findOne({ user: authUser.id })
    .populate('specialist', 'name slug')
    .lean<PopulatedDoctorProfile | null>();

  if (!doctor) {
    return {
      role: UserRole.DOCTOR,
      title: 'Doctor dashboard',
      description: 'Complete your doctor profile to unlock appointment and review analytics.',
      doctor: null,
      metrics: [
        metric('Total Appointments', 0, 'No doctor profile yet', 'number', 'default'),
        metric("Today's Appointments", 0, 'No data available', 'number', 'info'),
        metric('Upcoming Appointments', 0, 'No data available', 'number', 'warning'),
        metric('Completed Appointments', 0, 'No data available', 'number', 'success'),
      ],
      statusMetrics: [
        metric('Pending Appointments', 0, 'No profile yet', 'number', 'warning'),
        metric('Cancelled Appointments', 0, 'No profile yet', 'number', 'danger'),
        metric('Average Rating', '0.0', 'No reviews yet', 'rating', 'default'),
        metric('Review Count', 0, 'No reviews yet', 'number', 'default'),
      ],
      todaySchedule: [],
      upcomingAppointments: [],
      recentReviews: [],
      profileMissing: true,
    };
  }

  const doctorId = String(doctor._id ?? '');
  const schedule = Array.isArray(doctor.schedule) ? doctor.schedule : [];
  const todayDay = getJakartaDayLabel();
  const todaySchedule = schedule.filter((item) => item.day === todayDay);
  const { start, end } = getJakartaDayRange();
  const appointmentStatuses = Object.values(AppointmentStatus) as AppointmentStatus[];

  const [
    totalAppointments,
    todayAppointments,
    upcomingAppointmentsCount,
    appointmentStatusCounts,
    totalReviews,
    recentAppointments,
    recentReviews,
  ] = await Promise.all([
    AppointmentModel.countDocuments({ doctor: doctorId }),
    AppointmentModel.countDocuments({
      doctor: doctorId,
      appointmentDate: {
        $gte: start,
        $lte: end,
      },
    }),
    AppointmentModel.countDocuments({
      doctor: doctorId,
      appointmentDate: { $gte: start },
      status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
    }),
    countDocumentsByStatus(AppointmentModel, { doctor: doctorId }, 'status', appointmentStatuses),
    ReviewModel.countDocuments({ doctor: doctorId }),
    AppointmentModel.find({
      doctor: doctorId,
      appointmentDate: { $gte: start },
      status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
    })
      .sort({ appointmentDate: 1, startTime: 1 })
      .limit(5)
      .populate('patient', 'fullName')
      .populate({
        path: 'doctor',
        select: 'fullName specialist',
        populate: {
          path: 'specialist',
          select: 'name slug',
        },
      })
      .lean<PopulatedAppointment[]>(),
    ReviewModel.find({ doctor: doctorId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('patient', 'fullName')
      .populate({
        path: 'doctor',
        select: 'fullName specialist',
        populate: {
          path: 'specialist',
          select: 'name slug',
        },
      })
      .lean<PopulatedReview[]>(),
  ]);

  return {
    role: UserRole.DOCTOR,
    title: `Welcome back, ${doctor.fullName ?? 'Doctor'}`,
    description: "Review your schedule, check today's queue, and keep an eye on the patient experience.",
    doctor: {
      id: doctorId,
      fullName: doctor.fullName ?? '-',
      specialistName: getSpecialistName(doctor.specialist),
      specialistSlug: getStringFromReference(doctor.specialist, 'slug'),
      clinicName: doctor.practiceLocation?.clinicName ?? '-',
      city: doctor.practiceLocation?.city ?? '-',
      approvalStatus: doctor.approvalStatus ?? DoctorApprovalStatus.PENDING,
      isAvailable: Boolean(doctor.isAvailable),
      ratingAverage: Number(doctor.ratingAverage ?? 0),
      ratingCount: Number(doctor.ratingCount ?? 0),
      consultationFee: Number(doctor.consultationFee ?? 0),
      experienceYears: Number(doctor.experienceYears ?? 0),
    },
    metrics: [
      metric('Total Appointments', totalAppointments, 'All appointments linked to your profile', 'number', 'info'),
      metric("Today's Appointments", todayAppointments, 'Appointments scheduled in Jakarta today', 'number', 'warning'),
      metric('Upcoming Appointments', upcomingAppointmentsCount, 'Confirmed and pending future visits', 'number', 'success'),
      metric('Total Reviews', totalReviews, 'Patient feedback collected so far', 'number', 'default'),
    ],
    statusMetrics: [
      metric(
        'Pending Appointments',
        appointmentStatusCounts[AppointmentStatus.PENDING],
        'Need your confirmation',
        'number',
        'warning',
      ),
      metric(
        'Completed Appointments',
        appointmentStatusCounts[AppointmentStatus.COMPLETED],
        'Consultations finished',
        'number',
        'success',
      ),
      metric(
        'Cancelled Appointments',
        appointmentStatusCounts[AppointmentStatus.CANCELLED],
        'Cancelled or rescheduled',
        'number',
        'danger',
      ),
      metric(
        'Average Rating',
        doctor.ratingAverage?.toFixed?.(1) ?? '0.0',
        'Current rating from reviews',
        'rating',
        'info',
      ),
      metric('Review Count', doctor.ratingCount ?? 0, 'All submitted reviews', 'number', 'default'),
    ],
    todaySchedule,
    upcomingAppointments: recentAppointments.map(getAppointmentSummary),
    recentReviews: recentReviews.map(getReviewSummary),
  };
};

export const getDashboardSummary = async (authUser: AuthUser): Promise<DashboardSummary> => {
  if (authUser.role === UserRole.ADMIN) {
    return getAdminDashboardSummary();
  }

  if (authUser.role === UserRole.DOCTOR) {
    return getDoctorDashboardSummary(authUser);
  }

  throw new Error('Dashboard is only available for admin and doctor users');
};
