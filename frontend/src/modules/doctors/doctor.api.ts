import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';
import type { Review } from '@/types/reviews.type';

import type { ListDoctorsCitiesDto, ListDoctorsDto, ListReviewsByDoctorDto } from './doctor.schema';
import type { Doctor } from './doctor.type';

export const doctorApi = {
  list: async (params?: ListDoctorsDto) => {
    try {
      const res = await api.get<ApiResponse<Doctor[]>>('/doctors', { params });

      return unwrapPaginatedApiResponse(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
  cities: async (params?: ListDoctorsCitiesDto) => {
    try {
      const res = await api.get<ApiResponse<string[]>>('/doctors/cities', { params });

      return unwrapApiResponse(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
  getById: async (id: string) => {
    try {
      const res = await api.get<ApiResponse<Doctor>>(`/doctors/${id}`);

      return unwrapApiResponse(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
  getDoctorReviews: async (id: string, params?: ListReviewsByDoctorDto) => {
    try {
      const res = await api.get<ApiResponse<Review[]>>(`/doctors/${id}/reviews`, { params });

      return unwrapApiResponse(res.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
