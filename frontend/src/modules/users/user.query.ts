import { queryOptions } from '@tanstack/react-query';

import { userApi } from './user.api';
import { userKeys } from './user.key';
import type { ListUsersDto } from './user.schema';

export const userQueryOptions = {
  list: (params?: ListUsersDto) =>
    queryOptions({
      queryKey: userKeys.list(params),
      queryFn: () => userApi.list(params),
    }),

  getById: (id: string) =>
    queryOptions({
      queryKey: userKeys.detail(id),
      queryFn: () => userApi.getById(id),
      enabled: !!id,
    }),
};
