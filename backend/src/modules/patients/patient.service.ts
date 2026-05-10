import { ApiError } from '../../middlewares/error.middleware';
import { PatientProfileModel } from '../../models/patient-profile.model';

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

export const updateMyProfile = async (
  userId: string,
  payload: Record<string, unknown>,
) => {
  const profile = await PatientProfileModel.findOne({ user: userId });

  if (!profile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  const allowedFields = [
    'fullName',
    'dateOfBirth',
    'gender',
    'phoneNumber',
    'address',
  ];

  for (const field of allowedFields) {
    if (field in payload) {
      (profile as unknown as Record<string, unknown>)[field] = payload[field];
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
