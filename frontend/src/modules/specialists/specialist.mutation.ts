import { mutationOptions } from '@tanstack/react-query';

import { specialistApi } from './specialist.api';
import { specialistKeys } from './specialist.key';

export const specialistMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: specialistKeys.create(),
      mutationFn: (payload: FormData) => specialistApi.create(payload),
    }),

  update: (id: string) =>
    mutationOptions({
      mutationKey: specialistKeys.update(id),
      mutationFn: (payload: FormData) => specialistApi.update(id, payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: specialistKeys.delete(id),
      mutationFn: () => specialistApi.delete(id),
    }),
};
