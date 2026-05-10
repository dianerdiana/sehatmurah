import { ApiError } from '../../common/api-error';
import { PatientProfileModel } from '../../models/patient-profile.model';

import { UpdateMyProfileDto } from './patient.schema';

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
