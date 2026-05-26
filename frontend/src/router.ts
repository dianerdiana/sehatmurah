import { createRouter } from '@tanstack/react-router';

import { UserRole } from '@/types/enums/user-role.enum';
import type { RouterContext } from '@/types/router-context.type';

import { queryClient } from './integrations/tanstack-query/root-provider';
import { routeTree } from './routeTree.gen';

const defaultRouterContext: RouterContext = {
  queryClient,
  auth: {
    isAuthenticated: false,
    isInitialLoading: true,
    userData: {
      id: '',
      name: '',
      role: UserRole.PATIENT,
      email: '',
    },
  },
};

export const router = createRouter({
  routeTree,
  context: defaultRouterContext,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
