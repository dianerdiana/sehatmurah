import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { ListSpecialistsDto } from './specialist.schema';
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

  create: async (payload: FormData) => {
    try {
      const response = await api.post<FormData, ApiResponse<Specialist>>('/specialists', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  update: async (id: string, payload: FormData) => {
    try {
      const response = await api.put<FormData, ApiResponse<Specialist>>(`/specialists/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
