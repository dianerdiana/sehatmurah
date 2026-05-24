import { queryOptions } from '@tanstack/react-query';

import { reviewApi } from './review.api';
import { reviewKeys } from './review.key';
import type { ListReviewsByDoctorDto } from './review.schema';

export const reviewQueryOptions = {
  listByDoctor: (doctorId: string, params?: ListReviewsByDoctorDto) =>
    queryOptions({
      queryKey: reviewKeys.doctorList(doctorId, params),
      queryFn: () => reviewApi.listByDoctor(doctorId, params),
      enabled: !!doctorId,
    }),
};
