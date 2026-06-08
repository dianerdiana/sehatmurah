import { queryOptions } from '@tanstack/react-query';

import { dashboardApi } from './dashboard.api';
import { dashboardKeys } from './dashboard.key';

export const dashboardQueryOptions = {
  summary: () =>
    queryOptions({
      queryKey: dashboardKeys.summary(),
      queryFn: () => dashboardApi.summary(),
      staleTime: 0,
    }),
};
