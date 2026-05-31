import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { ListPatientsDto, UpdateMyProfileDto, UpdatePatientDto } from './patient.schema';
import type { PatientListItem, PatientProfile } from './patient.type';

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

  list: async (params?: ListPatientsDto) => {
    try {
      const response = await api.get<ApiResponse<PatientListItem[]>>('/patients', { params });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  updateMyProfile: async (payload: UpdateMyProfileDto) => {
    try {
      const response = await api.put<UpdateMyProfileDto, ApiResponse<PatientProfile>>('/patients/me', payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  update: async (id: string, payload: UpdatePatientDto) => {
    try {
      const response = await api.put<UpdatePatientDto, ApiResponse<PatientProfile>>(`/patients/${id}`, payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<Record<string, never>>>(`/patients/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
