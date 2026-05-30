import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import z from 'zod';

import { getSafeRedirectTarget } from '@/utils/auth/route-guard';

export const Route = createFileRoute('/_layout-blank/auth')({
  validateSearch: z.object({
    redirect: z.string().optional(),
    reason: z.enum(['booking-auth']).optional(),
  }),
  component: Outlet,
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: getSafeRedirectTarget(search.redirect),
        replace: true,
      });
    }
  },
});
