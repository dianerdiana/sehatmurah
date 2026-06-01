import mongoose from 'mongoose';

import { ApiError } from '../../common/api-error';
import { DoctorApprovalStatus } from '../../common/enums/doctor-approval-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { normalizePagination } from '../../common/pagination';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { SpecialistModel } from '../../models/specialist.model';
import { UserModel } from '../../models/user.model';
import { AuthUser } from '../../types/auth-user.type';
import { escapeRegex } from '../../utils/escape-regex';

import {
  ApproveDoctorDto,
  CreateDoctorDto,
  CreateDoctorRequestDto,
  ListDoctorsCitiesDto,
  ListDoctorsDto,
  RejectDoctorDto,
  UpdateDoctorDto,
} from './doctor.schema';

const resolveSpecialistFilter = async (
  specialist?: string,
): Promise<mongoose.Types.ObjectId | string | undefined> => {
  if (!specialist) {
    return undefined;
  }

  const isObjectId = mongoose.Types.ObjectId.isValid(specialist);

  if (isObjectId) {
    return specialist;
  }

  const specialistData = await SpecialistModel.findOne({
    $or: [{ slug: specialist }, { name: { $regex: specialist, $options: 'i' } }],
  }).select('_id');

  if (specialistData) {
    return specialistData._id;
  }

  return new mongoose.Types.ObjectId();
};

const assertDoctorCanBeApproved = (status: DoctorApprovalStatus) => {
  if (status !== DoctorApprovalStatus.PENDING) {
    throw new ApiError(409, 'Only pending doctor can be approved');
  }
};

const assertDoctorCanBeRejected = (status: DoctorApprovalStatus) => {
  if (status !== DoctorApprovalStatus.PENDING) {
    throw new ApiError(409, 'Only pending doctor can be rejected');
  }
};

export const listDoctors = async (query: ListDoctorsDto) => {
  const filter: Record<string, unknown> = {};

  if (query.status !== 'all') {
    filter.approvalStatus = query.status;
  }

  if (query.isAvailable !== 'all') {
    filter.isAvailable = query.isAvailable === 'true';
  }

  const specialistFilter = await resolveSpecialistFilter(query.specialist);

  if (specialistFilter) {
    filter.specialist = specialistFilter;
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

  filter.approvalStatus = DoctorApprovalStatus.APPROVED;

  if (query.search) {
    filter['practiceLocation.city'] = { $regex: query.search, $options: 'i' };
  }

  // Use distinct to get unique city names directly from database.
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

export const getMyDoctorProfile = async (userId: string) => {
  const doctor = await DoctorProfileModel.findOne({ user: userId }).populate(
    'specialist',
    'name slug icon',
  );

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return doctor;
};

export const createDoctor = async (payload: CreateDoctorDto) => {
  const { userId, ...doctorPayload } = payload;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, 'Invalid userId');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await UserModel.findById(userId).session(session);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const existingProfile = await DoctorProfileModel.findOne({ user: userId }).session(session);

    if (existingProfile) {
      throw new ApiError(409, 'Doctor profile already exists for this user');
    }

    const [doctorProfile] = await DoctorProfileModel.create(
      [
        {
          ...doctorPayload,
          user: userId,
        },
      ],
      { session },
    );

    if (user.role !== UserRole.DOCTOR) {
      user.role = UserRole.DOCTOR;
      await user.save({ session });
    }

    await session.commitTransaction();

    return doctorProfile;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const requestDoctor = async (payload: CreateDoctorRequestDto, authUser: AuthUser) => {
  const { userId, ...doctorPayload } = payload;

  if (userId !== authUser.id) {
    throw new ApiError(403, 'You can only submit a request for your own account');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, 'Invalid userId');
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.role !== UserRole.PATIENT) {
    throw new ApiError(403, 'Only patients can submit doctor requests');
  }

  const existingProfile = await DoctorProfileModel.findOne({ user: userId });

  if (existingProfile) {
    throw new ApiError(409, 'Doctor profile already exists for this user');
  }

  const specialist = await SpecialistModel.findById(payload.specialist);

  if (!specialist) {
    throw new ApiError(404, 'Specialist not found');
  }

  const doctorProfile = await DoctorProfileModel.create({
    ...doctorPayload,
    user: userId,
    approvalStatus: DoctorApprovalStatus.PENDING,
  });

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

export const approveDoctor = async (
  doctorId: string,
  payload: ApproveDoctorDto,
  user: AuthUser,
) => {
  const doctor = await DoctorProfileModel.findById(doctorId);

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  assertDoctorCanBeApproved(doctor.approvalStatus);

  doctor.approvalStatus = payload.status;
  doctor.approvedAt = new Date();
  doctor.approvedBy = new mongoose.Types.ObjectId(user.id);
  doctor.rejectedAt = undefined;
  doctor.rejectedBy = undefined;
  doctor.rejectionReason = undefined;

  await doctor.save();
  await UserModel.findByIdAndUpdate(doctor.user, { role: UserRole.DOCTOR });

  return doctor;
};

export const rejectDoctor = async (doctorId: string, payload: RejectDoctorDto, user: AuthUser) => {
  const doctor = await DoctorProfileModel.findById(doctorId);

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  assertDoctorCanBeRejected(doctor.approvalStatus);

  doctor.approvalStatus = payload.status;
  doctor.rejectedAt = new Date();
  doctor.rejectedBy = new mongoose.Types.ObjectId(user.id);
  doctor.rejectionReason = payload.rejectionReason;
  doctor.approvedAt = undefined;
  doctor.approvedBy = undefined;

  await doctor.save();

  return doctor;
};
