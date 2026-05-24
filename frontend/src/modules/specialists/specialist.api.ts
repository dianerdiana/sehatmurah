import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { CreateSpecialistDto, ListSpecialistsDto, UpdateSpecialistDto } from './specialist.schema';
import type { Specialist } from './specialist.type';

export const specialistApi = {
  list: async (params?: ListSpecialistsDto) => {
    try {
      const response = await api.get<ApiResponse<Specialist[]>>('/specialists', {
        params,
      });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Specialist>>(`/specialists/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  create: async (payload: CreateSpecialistDto) => {
    try {
      const response = await api.post<CreateSpecialistDto, ApiResponse<Specialist>>('/specialists', payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  update: async (id: string, payload: UpdateSpecialistDto) => {
    try {
      const response = await api.patch<UpdateSpecialistDto, ApiResponse<Specialist>>(`/specialists/${id}`, payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<Record<string, never>>>(`/specialists/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
