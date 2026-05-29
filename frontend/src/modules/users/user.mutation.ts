import { mutationOptions } from '@tanstack/react-query';

import { userApi } from './user.api';
import { userKeys } from './user.key';

export const userMutationOptions = {
  delete: (id: string) =>
    mutationOptions({
      mutationKey: userKeys.delete(id),
      mutationFn: () => userApi.delete(id),
    }),
};
