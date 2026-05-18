import { queryOptions } from '@tanstack/react-query';

import type { Specialist } from '@/types/specialist.type';

export const specialistQueries = {
  list: (params?: { limit?: number }) => queryOptions<Specialist[]>({ queryKey: ['/specialists', params] }),
};
