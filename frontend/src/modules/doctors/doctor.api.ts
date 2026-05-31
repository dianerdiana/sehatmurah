import { api } from '@/configs/api-config';

import type { Review } from '@/modules/reviews/reviews.type';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type {
  CreateDoctorDto,
  ListDoctorsCitiesDto,
  ListDoctorsDto,
  ListReviewsByDoctorDto,
  UpdateDoctorDto,
  UpdateDoctorScheduleDto,
} from './doctor.schema';
import type { Doctor } from './doctor.type';

export const doctorApi = {
  list: async (params?: ListDoctorsDto) => {
    try {
      const response = await api.get<ApiResponse<Doctor[]>>('/doctors', {
        params,
      });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  cities: async (params?: ListDoctorsCitiesDto) => {
    try {
      const response = await api.get<ApiResponse<string[]>>('/doctors/cities', {
        params,
      });

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Doctor>>(`/doctors/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getMe: async () => {
    try {
      const response = await api.get<ApiResponse<Doctor>>('/doctors/me');

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getDoctorReviews: async (id: string, params?: ListReviewsByDoctorDto) => {
    try {
      const response = await api.get<ApiResponse<Review[]>>(`/doctors/${id}/reviews`, { params });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  create: async (payload: CreateDoctorDto) => {
    try {
      const response = await api.post<CreateDoctorDto, ApiResponse<Doctor>>('/doctors', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  update: async (id: string, payload: UpdateDoctorDto) => {
    try {
      const response = await api.put<UpdateDoctorDto, ApiResponse<Doctor>>(`/doctors/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  updateSchedule: async (id: string, payload: UpdateDoctorScheduleDto) => {
    try {
      const response = await api.patch<UpdateDoctorScheduleDto, ApiResponse<Doctor>>(
        `/doctors/${id}/schedule`,
        payload,
      );

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<Record<string, never>>>(`/doctors/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
