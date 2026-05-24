import { mutationOptions } from '@tanstack/react-query';

import { reviewApi } from './review.api';
import { reviewKeys } from './review.key';
import type { CreateReviewDto } from './review.schema';

export const reviewMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: reviewKeys.create(),
      mutationFn: (payload: CreateReviewDto) => reviewApi.create(payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: reviewKeys.delete(id),
      mutationFn: () => reviewApi.delete(id),
    }),
};
