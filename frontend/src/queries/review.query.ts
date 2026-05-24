import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { api } from '@/configs/api-config';
import type { ApiResponse } from '@/types/api-response.type';
import type { Review } from '@/types/reviews.type';

type ListReviewsByDoctorParams = {
  page?: number;
  limit?: number;
};

export type CreateReviewDto = {
  doctor: string;
  appointment?: string;
  rating: number;
  comment?: string;
};

export const reviewQueries = {
  listByDoctor: (doctorId: string, params?: ListReviewsByDoctorParams) =>
    queryOptions<Review[]>({ queryKey: [`/doctors/${doctorId}/reviews`, params] }),
};

export const reviewMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['reviews', 'create'],
      mutationFn: async (payload: CreateReviewDto) => {
        const response = await api.post<CreateReviewDto, ApiResponse<Review>>('/reviews', payload);

        return response.data;
      },
    }),
  delete: (id: string) =>
    mutationOptions({
      mutationKey: ['reviews', 'delete', id],
      mutationFn: async () => {
        const response = await api.delete<ApiResponse<Record<string, never>>>(`/reviews/${id}`);

        return response.data;
      },
    }),
};
