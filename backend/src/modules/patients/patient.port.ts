import { ApiError } from '../../common/api-error';
import { PatientProfileModel } from '../../models/patient-profile.model';

export const getPatientProfileId = async (userId: string): Promise<string> => {
  const patientProfile = await PatientProfileModel.findOne({ user: userId });

  if (!patientProfile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  return patientProfile._id.toString();
};
