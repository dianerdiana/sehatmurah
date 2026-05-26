import type { QueryClient } from '@tanstack/react-query';

import type { UserData } from './user-data.type';

export type RouterContext = {
  queryClient: QueryClient;
  auth: {
    isAuthenticated: boolean;
    isInitialLoading: boolean;
    userData: UserData;
  };
};
