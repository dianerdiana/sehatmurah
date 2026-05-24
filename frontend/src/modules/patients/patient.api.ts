import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { UpdateMyProfileDto } from './patient.schema';
import type { PatientProfile } from './patient.type';

export const patientApi = {
  getMyProfile: async () => {
    try {
      const response = await api.get<ApiResponse<PatientProfile>>('/patients/me');

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<PatientProfile>>(`/patients/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  updateMyProfile: async (payload: UpdateMyProfileDto) => {
    try {
      const response = await api.patch<UpdateMyProfileDto, ApiResponse<PatientProfile>>('/patients/me', payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
