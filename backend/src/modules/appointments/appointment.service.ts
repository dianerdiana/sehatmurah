import { ApiError } from '../../common/api-error';
import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { normalizePagination } from '../../common/pagination';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { AuthUser } from '../../types/auth-user.type';
import { generateBookingCode } from '../../utils/generate-booking-code';

import { CreateAppointmentSchema, ListAppointmentsSchema } from './appointment.schema';

const getPatientProfileId = async (userId: string): Promise<string> => {
  const patientProfile = await PatientProfileModel.findOne({ user: userId });
  if (!patientProfile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  return patientProfile._id.toString();
};

const getDoctorProfileIdByUserId = async (userId: string): Promise<string> => {
  const doctorProfile = await DoctorProfileModel.findOne({ user: userId });
  if (!doctorProfile) {
    throw new ApiError(404, 'Doctor profile not found');
  }

  return doctorProfile._id.toString();
};

export const createAppointment = async (user: AuthUser, payload: CreateAppointmentSchema) => {
  if (user.role !== UserRole.PATIENT) {
    throw new ApiError(403, 'Only Patient can create appointment');
  }

  const patientId = await getPatientProfileId(user.id);

  const doctor = await DoctorProfileModel.findById(payload.doctor);
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  if (!doctor.isAvailable) {
    throw new ApiError(400, 'Doctor is not available');
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

export const listAppointments = async (user: AuthUser, payload: ListAppointmentsSchema) => {
  const filter: Record<string, unknown> = {};

  if (user.role === UserRole.PATIENT) {
    const patientId = await getPatientProfileId(user.id);
    filter.patient = patientId;
  }

  if (user.role === UserRole.DOCTOR) {
    const doctorId = await getDoctorProfileIdByUserId(user.id);
    filter.doctor = doctorId;
  }

  const { page, limit, skip } = normalizePagination(payload);
  const totalItems = await AppointmentModel.countDocuments(filter);

  const items = await AppointmentModel.find(filter)
    .populate('patient', 'fullName')
    .populate('doctor', 'fullName consultationFee')
    .sort({ appointmentDate: -1, startTime: 1 })
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
    const patientId = await getPatientProfileId(user.id);
    if (appointment.patient._id.toString() !== patientId) {
      throw new ApiError(403, 'Forbidden');
    }
    return appointment;
  }

  const doctorId = await getDoctorProfileIdByUserId(user.id);
  if (appointment.doctor._id.toString() !== doctorId) {
    throw new ApiError(403, 'Forbidden');
  }

  return appointment;
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentStatus,
  user: AuthUser,
) => {
  if (![UserRole.ADMIN, UserRole.DOCTOR].includes(user.role)) {
    throw new ApiError(403, 'Forbidden');
  }

  const appointment = await AppointmentModel.findById(appointmentId).populate('doctor', 'user');
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (user.role === UserRole.DOCTOR) {
    const doctorId = await getDoctorProfileIdByUserId(user.id);
    if (appointment.doctor._id.toString() !== doctorId) {
      throw new ApiError(403, 'Forbidden');
    }
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
    const patientId = await getPatientProfileId(user.id);
    if (appointment.patient.toString() !== patientId) {
      throw new ApiError(403, 'Forbidden');
    }

    if (appointment.status !== AppointmentStatus.PENDING) {
      throw new ApiError(400, 'Only pending appointment can be cancelled');
    }

    await appointment.deleteOne();
    return;
  }

  throw new ApiError(403, 'Forbidden');
};
