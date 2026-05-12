import { ApiError } from '../../common/api-error';
import { UserRole } from '../../common/enums/user-role.enum';
import { normalizePagination } from '../../common/pagination';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { UserModel } from '../../models/user.model';
import { AuthUser } from '../../types/auth-user.type';

import { CreateDoctorDto, ListDoctorsDto, UpdateDoctorDto } from './doctor.schema';

export const listDoctors = async (query: ListDoctorsDto) => {
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

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await DoctorProfileModel.countDocuments(filter);

  const items = await DoctorProfileModel.find(filter)
    .populate('specialist', 'name slug icon')
    .sort({ ratingAverage: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
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

export const createDoctor = async (payload: CreateDoctorDto) => {
  const userId = payload.userId;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.role !== UserRole.DOCTOR) {
    throw new ApiError(400, 'User role must be Doctor');
  }

  const existingProfile = await DoctorProfileModel.findOne({ user: userId });

  if (existingProfile) {
    throw new ApiError(409, 'Doctor profile already exists for this user');
  }

  return DoctorProfileModel.create(payload);
};

export const updateDoctor = async (doctorId: string, payload: UpdateDoctorDto, user: AuthUser) => {
  const existingDoctor = await DoctorProfileModel.findById(doctorId);

  if (!existingDoctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  if (user.role === UserRole.DOCTOR && existingDoctor.user.toString() !== user.id) {
    throw new ApiError(403, 'Forbidden');
  }

  Object.assign(existingDoctor, payload);
  await existingDoctor.save();

  return existingDoctor;
};

export const updateDoctorSchedule = async (
  doctorId: string,
  schedule: unknown[],
  user: AuthUser,
) => {
  const doctor = await DoctorProfileModel.findById(doctorId);

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  if (user.role === UserRole.DOCTOR && doctor.user.toString() !== user.id) {
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
