import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { CreateReviewDto, ListReviewsByDoctorDto, ListReviewsDto, UpdateReviewDto } from './review.schema';
import type { Review } from './review.type';

export const reviewApi = {
  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Review>>(`/reviews/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getByAppointmentId: async (appointmentId: string) => {
    try {
      const response = await api.get<ApiResponse<Review>>(`/reviews/appointments/${appointmentId}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  list: async (params?: ListReviewsDto) => {
    try {
      const response = await api.get<ApiResponse<Review[]>>('/reviews', {
        params,
      });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  listByDoctor: async (doctorId: string, params?: ListReviewsByDoctorDto) => {
    try {
      const response = await api.get<ApiResponse<Review[]>>(`/doctors/${doctorId}/reviews`, {
        params,
      });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  create: async (payload: CreateReviewDto) => {
    try {
      const response = await api.post<CreateReviewDto, ApiResponse<Review>>('/reviews', payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  update: async (id: string, payload: UpdateReviewDto) => {
    try {
      const response = await api.put<UpdateReviewDto, ApiResponse<Review>>(`/reviews/${id}`, payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<Record<string, never>>>(`/reviews/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
