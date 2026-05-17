import { api } from '@/configs/api-config';
import { toApiError } from '@/configs/auth/jwt-service';
import type { HttpResponse } from '@/types/http-response';
import type { SpecialistResponse } from './public-facing.response';

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
