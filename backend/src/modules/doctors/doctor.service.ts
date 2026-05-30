import mongoose from 'mongoose';

import { ApiError } from '../../common/api-error';
import { UserRole } from '../../common/enums/user-role.enum';
import { normalizePagination } from '../../common/pagination';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { SpecialistModel } from '../../models/specialist.model';
import { UserModel } from '../../models/user.model';
import { AuthUser } from '../../types/auth-user.type';
import { escapeRegex } from '../../utils/escape-regex';

import {
  CreateDoctorDto,
  ListDoctorsCitiesDto,
  ListDoctorsDto,
  UpdateDoctorDto,
} from './doctor.schema';

export const listDoctors = async (query: ListDoctorsDto) => {
  const filter: Record<string, unknown> = {};

  if (query.isAvailable !== 'all') {
    filter.isAvailable = query.isAvailable === 'true';
  }

  if (query.specialist) {
    const isObjectId = mongoose.Types.ObjectId.isValid(query.specialist);

    if (isObjectId) {
      filter.specialist = query.specialist;
    } else {
      const specialistData = await SpecialistModel.findOne({
        $or: [
          { slug: query.specialist },
          { name: { $regex: query.specialist, $options: 'i' } }, // Case-insensitive
        ],
      }).select('_id');

      if (specialistData) {
        filter.specialist = specialistData._id;
      } else {
        // Jika spesialis tidak ditemukan, paksa hasil pencarian dokter kosong
        filter.specialist = new mongoose.Types.ObjectId();
      }
    }
  }

  if (query.city) {
    filter['practiceLocation.city'] = { $regex: escapeRegex(query.city), $options: 'i' };
  }

  if (query.search) {
    filter.fullName = { $regex: escapeRegex(query.search), $options: 'i' };
  }

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await DoctorProfileModel.countDocuments(filter);

  const sortDirection = query.sort === 'asc' ? 1 : -1;
  const sortByColumn: Record<ListDoctorsDto['column'], string> = {
    fullName: 'fullName',
    createdAt: 'createdAt',
  };

  const primarySortField = sortByColumn[query.column];
  const sortOption: Record<string, 1 | -1> = {
    [primarySortField]: sortDirection,
    _id: 1,
  };

  if (primarySortField !== 'createdAt') {
    sortOption.createdAt = -1;
  }

  if (primarySortField !== 'fullName') {
    sortOption.fullName = 1;
  }

  const items = await DoctorProfileModel.find(filter)
    .populate('specialist', 'name slug icon')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const listDoctorsCities = async (query: ListDoctorsCitiesDto) => {
  const filter: Record<string, unknown> = {};

  if (query.search) {
    filter['practiceLocation.city'] = { $regex: query.search, $options: 'i' };
  }

  // Gunakan distinct untuk mengambil daftar nama kota unik langsung dari database
  const items = await DoctorProfileModel.distinct('practiceLocation.city', filter);

  const totalItems = items.length;

  return { items, totalItems };
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

  const existingProfile = await DoctorProfileModel.findOne({ user: userId });

  if (existingProfile) {
    throw new ApiError(409, 'Doctor profile already exists for this user');
  }

  const doctorProfile = await DoctorProfileModel.create(payload);

  if (user.role !== UserRole.DOCTOR) {
    try {
      user.role = UserRole.DOCTOR;
      await user.save();
    } catch (error) {
      await DoctorProfileModel.findByIdAndDelete(doctorProfile._id);
      throw error;
    }
  }

  return doctorProfile;
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
