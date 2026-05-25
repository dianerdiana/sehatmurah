import { ApiError } from '../../common/api-error';
import { normalizePagination } from '../../common/pagination';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { escapeRegex } from '../../utils/escape-regex';

import { ListPatientsDto, UpdateMyProfileDto } from './patient.schema';

export const getMyProfile = async (userId: string) => {
  const profile = await PatientProfileModel.findOne({ user: userId }).populate(
    'user',
    'name email role',
  );

  if (!profile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  return profile;
};

export const updateMyProfile = async (userId: string, payload: UpdateMyProfileDto) => {
  const profile = await PatientProfileModel.findOne({ user: userId });

  if (!profile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  const allowedFields: (keyof UpdateMyProfileDto)[] = [
    'fullName',
    'dateOfBirth',
    'gender',
    'phoneNumber',
    'address',
  ];

  for (const field of allowedFields) {
    const value = payload[field];

    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (profile as any)[field] = value;
    }
  }

  await profile.save();

  return profile;
};

export const getPatientById = async (patientId: string) => {
  const profile = await PatientProfileModel.findById(patientId).populate(
    'user',
    'name email role isActive',
  );

  if (!profile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  return profile;
};

export const listPatients = async (query: ListPatientsDto) => {
  const filters: Record<string, unknown>[] = [];

  if (query.gender !== 'all') {
    filters.push({ gender: query.gender });
  }

  const search = query.search.trim();
  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), 'i');
    filters.push({
      $or: [{ fullName: searchRegex }, { phoneNumber: searchRegex }],
    });
  }

  const filter =
    filters.length === 0
      ? {}
      : filters.length === 1
        ? filters[0]
        : ({ $and: filters } as Record<string, unknown>);

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await PatientProfileModel.countDocuments(filter);

  const sortField = query.column === 'fullName' ? 'fullName' : 'createdAt';
  const sortDirection = query.sort === 'asc' ? 1 : -1;

  const items = await PatientProfileModel.find(filter)
    .populate('user', 'name email role isActive')
    .sort({ [sortField]: sortDirection })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const deletePatient = async (patientId: string) => {
  const profile = await PatientProfileModel.findByIdAndDelete(patientId);

  if (!profile) {
    throw new ApiError(404, 'Patient not found');
  }

  return {};
};
