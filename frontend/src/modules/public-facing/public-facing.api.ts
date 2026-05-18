import type { DoctorResponse, SpecialistResponse } from './public-facing.response';

import { api } from '@/configs/api-config';
import { toApiError } from '@/configs/auth/jwt-service';
import type { HttpResponse } from '@/types/http-response';

export const getSpecialists = async ({ limit = 10, page = 1 }: { limit?: number; page?: number }) => {
  try {
    const res = await api.get<HttpResponse<SpecialistResponse[]>>('/specialists', {
      params: {
        isActive: true,
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};

export const getDoctors = async ({ specialist, city }: { specialist?: string; city?: string }) => {
  try {
    const res = await api.get<HttpResponse<DoctorResponse[]>>('/doctors', { params: { specialist, city } });
    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};

export const getDoctorsCities = async ({ search }: { search?: string }) => {
  try {
    const res = await api.get<HttpResponse<string[]>>('/doctors/cities', { params: { search } });
    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const res = await api.get<HttpResponse<DoctorResponse>>(`/doctors/${id}`);
    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};
