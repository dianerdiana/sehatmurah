import type { DoctorResponse, SpecialistResponse } from './public-facing.response';

import { api } from '@/configs/api-config';
import { toApiError } from '@/configs/auth/jwt-service';
import type { HttpResponse } from '@/types/http-response';

export const getSpecialists = async () => {
  try {
    const res = await api.get<HttpResponse<SpecialistResponse[]>>('/specialists', {
      params: {
        isActive: true,
        page: 1,
        limit: 6,
      },
    });
    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};

export const getDoctors = async ({ specialist }: { specialist?: string }) => {
  try {
    const res = await api.get<HttpResponse<DoctorResponse[]>>('/doctors', { params: { specialist } });
    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};
