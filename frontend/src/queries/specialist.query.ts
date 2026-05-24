import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { api } from '@/configs/api-config';
import type { ApiResponse } from '@/types/api-response.type';
import type { Specialist } from '@/types/specialist.type';

type SpecialistListParams = {
  isActive?: boolean;
  page?: number;
  limit?: number;
};

export type CreateSpecialistDto = {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive?: boolean;
  sortOrder?: number;
};

export type UpdateSpecialistDto = Partial<CreateSpecialistDto>;

export const specialistQueries = {
  list: (params?: SpecialistListParams) => queryOptions<Specialist[]>({ queryKey: ['/specialists', params] }),
  getById: (id: string) => queryOptions<Specialist>({ queryKey: [`/specialists/${id}`] }),
};

export const specialistMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['specialists', 'create'],
      mutationFn: async (payload: CreateSpecialistDto) => {
        const response = await api.post<CreateSpecialistDto, ApiResponse<Specialist>>('/specialists', payload);

        return response.data;
      },
    }),
  update: (id: string) =>
    mutationOptions({
      mutationKey: ['specialists', 'update', id],
      mutationFn: async (payload: UpdateSpecialistDto) => {
        const response = await api.patch<UpdateSpecialistDto, ApiResponse<Specialist>>(`/specialists/${id}`, payload);

        return response.data;
      },
    }),
  delete: (id: string) =>
    mutationOptions({
      mutationKey: ['specialists', 'delete', id],
      mutationFn: async () => {
        const response = await api.delete<ApiResponse<Record<string, never>>>(`/specialists/${id}`);

        return response.data;
      },
    }),
};
