import { mutationOptions } from '@tanstack/react-query';

import { userApi } from './user.api';
import { userKeys } from './user.key';
import type { CreateUserDto, UpdateUserDto } from './user.schema';

export const userMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: userKeys.create(),
      mutationFn: (payload: CreateUserDto) => userApi.create(payload),
    }),

  update: (id: string) =>
    mutationOptions({
      mutationKey: userKeys.update(id),
      mutationFn: (payload: UpdateUserDto) => userApi.update(id, payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: userKeys.delete(id),
      mutationFn: () => userApi.delete(id),
    }),
};
