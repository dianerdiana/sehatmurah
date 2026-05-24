import { mutationOptions } from '@tanstack/react-query';

import { api } from '@/configs/api-config';
import type { CreateAppointmentDto } from '@/modules/public-facing/types/public-facing.type';
import type { ApiResponse } from '@/types/api-response.type';

export const createAppointmentOptions = () => {
  return mutationOptions({
    mutationKey: ['appointments', 'create'],
    mutationFn: async (payload: CreateAppointmentDto) => {
      const response = await api.post<CreateAppointmentDto, ApiResponse<unknown>>('/appointments', payload);

      return response.data;
    },
  });
};
