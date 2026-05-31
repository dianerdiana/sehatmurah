import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { requireAuthenticated } from '@/utils/auth/route-guard';

import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-public-nav/profile')({
  component: Outlet,
  beforeLoad: ({ context, location }) => {
    const canAccessProfile = context.auth.userData.role === UserRole.PATIENT;

    let redirectTarget = location.href;

    if (!canAccessProfile) {
      redirectTarget = '/dashboard';
    }

    if (context.auth.isAuthenticated && !canAccessProfile) {
      throw redirect({ to: redirectTarget, replace: true });
    } else {
      requireAuthenticated(context.auth, redirectTarget);
    }
  },
});
