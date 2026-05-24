import { queryOptions } from '@tanstack/react-query';

import { specialistApi } from './specialist.api';
import { specialistKeys } from './specialist.key';
import type { ListSpecialistsDto } from './specialist.schema';

export const specialistQueryOptions = {
  list: (params?: ListSpecialistsDto) =>
    queryOptions({
      queryKey: specialistKeys.list(params),
      queryFn: () => specialistApi.list(params),
    }),

  getById: (id: string) =>
    queryOptions({
      queryKey: specialistKeys.detail(id),
      queryFn: () => specialistApi.getById(id),
      enabled: !!id,
    }),
};
