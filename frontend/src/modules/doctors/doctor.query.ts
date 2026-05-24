import { queryOptions } from '@tanstack/react-query';

import { doctorApi } from './doctor.api';
import { doctorKeys } from './doctor.key';
import type { ListDoctorsCitiesDto, ListDoctorsDto, ListReviewsByDoctorDto } from './doctor.schema';

export const doctorQueryOptions = {
  list: (params?: ListDoctorsDto) =>
    queryOptions({
      queryKey: doctorKeys.list(params),
      queryFn: () => doctorApi.list(params),
    }),

  cities: (params?: ListDoctorsCitiesDto) =>
    queryOptions({
      queryKey: doctorKeys.cities(params),
      queryFn: () => doctorApi.cities(params),
    }),

  getById: (id: string) =>
    queryOptions({
      queryKey: doctorKeys.detail(id),
      queryFn: () => doctorApi.getById(id),
      enabled: !!id,
    }),

  getDoctorReviews: (id: string, params?: ListReviewsByDoctorDto) =>
    queryOptions({
      queryKey: doctorKeys.reviews(id, params),
      queryFn: () => doctorApi.getDoctorReviews(id, params),
      enabled: !!id,
    }),
};
