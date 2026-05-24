import { queryOptions } from '@tanstack/react-query';

import { doctorApi } from './doctor.api';
import type { ListDoctorsCitiesDto, ListDoctorsDto, ListReviewsByDoctorDto } from './doctor.schema';

export const doctorQueryOptions = {
  list: (params?: ListDoctorsDto) =>
    queryOptions({
      queryKey: ['/doctors', params],
      queryFn: () => doctorApi.list(params),
    }),

  cities: (params?: ListDoctorsCitiesDto) =>
    queryOptions({
      queryKey: ['/doctors/cities', params],
      queryFn: () => doctorApi.cities(params),
    }),

  getById: (id: string) =>
    queryOptions({
      queryKey: ['/doctors', id],
      queryFn: () => doctorApi.getById(id),
      enabled: !!id,
    }),

  getDoctorReviews: (id: string, params?: ListReviewsByDoctorDto) =>
    queryOptions({
      queryKey: ['/doctors', id, 'reviews', params],
      queryFn: () => doctorApi.getDoctorReviews(id, params),
      enabled: !!id,
    }),
};
