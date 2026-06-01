import { queryOptions } from '@tanstack/react-query';

import { reviewApi } from './review.api';
import { reviewKeys } from './review.key';
import type { ListReviewsByDoctorDto, ListReviewsDto } from './review.schema';

export const reviewQueryOptions = {
  getById: (id: string) =>
    queryOptions({
      queryKey: reviewKeys.detail(id),
      queryFn: () => reviewApi.getById(id),
      enabled: !!id,
    }),

  getByAppointmentId: (appointmentId: string) =>
    queryOptions({
      queryKey: reviewKeys.detail(appointmentId),
      queryFn: () => reviewApi.getByAppointmentId(appointmentId),
      enabled: !!appointmentId,
    }),

  list: (params?: ListReviewsDto) =>
    queryOptions({
      queryKey: reviewKeys.list(params),
      queryFn: () => reviewApi.list(params),
    }),

  listByDoctor: (doctorId: string, params?: ListReviewsByDoctorDto) =>
    queryOptions({
      queryKey: reviewKeys.doctorList(doctorId, params),
      queryFn: () => reviewApi.listByDoctor(doctorId, params),
      enabled: !!doctorId,
    }),
};
