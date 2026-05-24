import { mutationOptions } from '@tanstack/react-query';

import { specialistApi } from './specialist.api';
import { specialistKeys } from './specialist.key';
import type { CreateSpecialistDto, UpdateSpecialistDto } from './specialist.schema';

export const specialistMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: specialistKeys.create(),
      mutationFn: (payload: CreateSpecialistDto) => specialistApi.create(payload),
    }),

  update: (id: string) =>
    mutationOptions({
      mutationKey: specialistKeys.update(id),
      mutationFn: (payload: UpdateSpecialistDto) => specialistApi.update(id, payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: specialistKeys.delete(id),
      mutationFn: () => specialistApi.delete(id),
    }),
};
