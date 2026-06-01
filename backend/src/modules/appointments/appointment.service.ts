import { ApiError } from '../../common/api-error';
import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { DoctorApprovalStatus } from '../../common/enums/doctor-approval-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { normalizePagination } from '../../common/pagination';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { SpecialistModel } from '../../models/specialist.model';
import { AuthUser } from '../../types/auth-user.type';
import { escapeRegex } from '../../utils/escape-regex';
import { generateBookingCode } from '../../utils/generate-booking-code';
import { getPatientProfileId } from '../patients/patient.port';

import { CreateAppointmentDto, ListAppointmentsDto } from './appointment.schema';

const getDoctorProfileIdByUserId = async (userId: string): Promise<string> => {
  const doctorProfile = await DoctorProfileModel.findOne({ user: userId });

  if (!doctorProfile) {
    throw new ApiError(404, 'Doctor profile not found');
  }

  return doctorProfile._id.toString();
};

const normalizeRefId = (value: unknown): string => {
  if (value && typeof value === 'object' && '_id' in value) {
    return String((value as { _id: unknown })._id);
  }

  return String(value);
};

const assertPatientOwnsAppointment = async (
  userId: string,
  appointmentPatientRef: unknown,
): Promise<void> => {
  const patientId = await getPatientProfileId(userId);

  if (normalizeRefId(appointmentPatientRef) !== patientId) {
    throw new ApiError(403, 'Forbidden');
  }
};

const assertDoctorOwnsAppointment = async (
  userId: string,
  appointmentDoctorRef: unknown,
): Promise<void> => {
  const doctorId = await getDoctorProfileIdByUserId(userId);

  if (normalizeRefId(appointmentDoctorRef) !== doctorId) {
    throw new ApiError(403, 'Forbidden');
  }
};

export const createAppointment = async (user: AuthUser, payload: CreateAppointmentDto) => {
  const patientId = await getPatientProfileId(user.id);

  const doctor = await DoctorProfileModel.findById(payload.doctor);

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  if (!doctor.isAvailable) {
    throw new ApiError(400, 'Doctor is not available');
  }

  if (doctor.approvalStatus !== DoctorApprovalStatus.APPROVED) {
    throw new ApiError(400, 'Doctor is not approved');
  }

  const appointment = await AppointmentModel.create({
    patient: patientId,
    doctor: payload.doctor,
    appointmentDate: new Date(payload.appointmentDate),
    startTime: payload.startTime,
    endTime: payload.endTime,
    reason: payload.reason,
    status: AppointmentStatus.PENDING,
    bookingCode: generateBookingCode(),
  });

  return appointment;
};

export const listAppointments = async (user: AuthUser, payload: ListAppointmentsDto) => {
  const filter: Record<string, unknown> = {};

  if (user.role === UserRole.PATIENT) {
    const patientId = await getPatientProfileId(user.id);
    filter.patient = patientId;
  }

  if (user.role === UserRole.DOCTOR) {
    const doctorId = await getDoctorProfileIdByUserId(user.id);
    filter.doctor = doctorId;
  }

  if (payload.status !== 'all') {
    filter.status = payload.status;
  }

  if (payload.startDate || payload.endDate) {
    const dateFilter: Record<string, Date> = {};

    if (payload.startDate) {
      const startDate = new Date(payload.startDate);

      if (!Number.isNaN(startDate.getTime())) {
        startDate.setHours(0, 0, 0, 0);
        dateFilter.$gte = startDate;
      }
    }

    if (payload.endDate) {
      const endDate = new Date(payload.endDate);

      if (!Number.isNaN(endDate.getTime())) {
        endDate.setHours(23, 59, 59, 999);
        dateFilter.$lte = endDate;
      }
    }

    if (Object.keys(dateFilter).length > 0) {
      filter.appointmentDate = dateFilter;
    }
  }

  const searchText = payload.search.trim();

  if (searchText) {
    const regex = new RegExp(escapeRegex(searchText), 'i');

    const [patients, doctors, specialists] = await Promise.all([
      PatientProfileModel.find({ fullName: regex }).select('_id').lean(),
      DoctorProfileModel.find({ fullName: regex }).select('_id').lean(),
      SpecialistModel.find({ name: regex }).select('_id').lean(),
    ]);

    const specialistIds = specialists.map((specialist) => specialist._id);
    const specialistDoctors =
      specialistIds.length > 0
        ? await DoctorProfileModel.find({ specialist: { $in: specialistIds } })
            .select('_id')
            .lean()
        : [];

    const doctorIds = Array.from(
      new Set([
        ...doctors.map((doctor) => doctor._id.toString()),
        ...specialistDoctors.map((doctor) => doctor._id.toString()),
      ]),
    );

    filter.$or = [
      { bookingCode: regex },
      { patient: { $in: patients.map((patient) => patient._id) } },
      { doctor: { $in: doctorIds } },
    ];
  }

  const { page, limit, skip } = normalizePagination(payload);
  const totalItems = await AppointmentModel.countDocuments(filter);

  const sortDirection = payload.sort === 'asc' ? 1 : -1;

  const items = await AppointmentModel.find(filter)
    .populate('patient', 'fullName')
    .populate({
      path: 'doctor',
      select: 'fullName consultationFee profilePhoto specialist',
      populate: {
        path: 'specialist',
        select: 'name slug',
      },
    })
    .sort({ [payload.column]: sortDirection })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const getAppointmentById = async (appointmentId: string, user: AuthUser) => {
  const appointment = await AppointmentModel.findById(appointmentId)
    .populate('patient', 'fullName user')
    .populate('doctor', 'fullName user');

  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (user.role === UserRole.ADMIN) {
    return appointment;
  }

  if (user.role === UserRole.PATIENT) {
    await assertPatientOwnsAppointment(user.id, appointment.patient);
    return appointment;
  }

  await assertDoctorOwnsAppointment(user.id, appointment.doctor);

  return appointment;
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentStatus,
  user: AuthUser,
) => {
  const appointment = await AppointmentModel.findById(appointmentId).populate('doctor', 'user');

  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (user.role === UserRole.DOCTOR) {
    await assertDoctorOwnsAppointment(user.id, appointment.doctor);
  }

  appointment.status = status;
  await appointment.save();

  return appointment;
};

export const deleteAppointment = async (appointmentId: string, user: AuthUser) => {
  const appointment = await AppointmentModel.findById(appointmentId);
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (user.role === UserRole.ADMIN) {
    await appointment.deleteOne();
    return;
  }

  if (user.role === UserRole.PATIENT) {
    await assertPatientOwnsAppointment(user.id, appointment.patient);

    if (appointment.status !== AppointmentStatus.PENDING) {
      throw new ApiError(400, 'Only pending appointment can be cancelled');
    }

    await appointment.deleteOne();
    return;
  }

  throw new ApiError(403, 'Forbidden');
};
