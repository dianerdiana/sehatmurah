import { ApiError } from '../../common/api-error';
import { UserRole } from '../../common/enums/user-role.enum';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { UserModel } from '../../models/user.model';

interface DoctorQuery {
  specialist?: string;
  city?: string;
  search?: string;
}

export const listDoctors = async (query: DoctorQuery) => {
  const filter: Record<string, unknown> = {};

  if (query.specialist) {
    filter.specialist = query.specialist;
  }

  if (query.city) {
    filter['practiceLocation.city'] = { $regex: query.city, $options: 'i' };
  }

  if (query.search) {
    filter.fullName = { $regex: query.search, $options: 'i' };
  }

  return DoctorProfileModel.find(filter)
    .populate('specialist', 'name slug icon')
    .sort({ ratingAverage: -1, createdAt: -1 });
};

export const getDoctorById = async (doctorId: string) => {
  const doctor = await DoctorProfileModel.findById(doctorId).populate(
    'specialist',
    'name slug icon',
  );
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return doctor;
};

export const createDoctor = async (payload: Record<string, unknown>) => {
  const userId = String(payload.user ?? '');
  if (!userId) {
    throw new ApiError(400, 'user is required');
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.role !== UserRole.DOCTOR) {
    throw new ApiError(400, 'User role must be DOCTOR');
  }

  const existingProfile = await DoctorProfileModel.findOne({ user: userId });
  if (existingProfile) {
    throw new ApiError(409, 'Doctor profile already exists for this user');
  }

  return DoctorProfileModel.create(payload);
};

export const updateDoctor = async (
  doctorId: string,
  payload: Record<string, unknown>,
  requester: { id: string; role: UserRole },
) => {
  const existingDoctor = await DoctorProfileModel.findById(doctorId);
  if (!existingDoctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  if (
    requester.role === UserRole.DOCTOR &&
    existingDoctor.user.toString() !== requester.id
  ) {
    throw new ApiError(403, 'Forbidden');
  }

  Object.assign(existingDoctor, payload);
  await existingDoctor.save();

  return existingDoctor;
};

export const updateDoctorSchedule = async (
  doctorId: string,
  schedule: unknown[],
  requester: { id: string; role: UserRole },
) => {
  const doctor = await DoctorProfileModel.findById(doctorId);
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  if (
    requester.role === UserRole.DOCTOR &&
    doctor.user.toString() !== requester.id
  ) {
    throw new ApiError(403, 'Forbidden');
  }

  doctor.schedule = schedule as typeof doctor.schedule;
  await doctor.save();

  return doctor;
};

export const deleteDoctor = async (doctorId: string) => {
  const doctor = await DoctorProfileModel.findByIdAndDelete(doctorId);
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return doctor;
};
