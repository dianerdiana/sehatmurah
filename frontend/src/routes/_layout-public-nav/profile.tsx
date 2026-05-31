import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { requireAuthenticated } from '@/utils/auth/route-guard';

import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-public-nav/profile')({
  component: Outlet,
  beforeLoad: ({ context, location }) => {
    const redirectTarget = location.pathname + location.search + location.hash;

    requireAuthenticated(context.auth, redirectTarget);

    const canAccessProfile = context.auth.userData?.role === UserRole.PATIENT;
    if (!canAccessProfile) {
      throw redirect({ to: '/dashboard', replace: true });
    }
  },
});
