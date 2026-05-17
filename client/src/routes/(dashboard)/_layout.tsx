import { createFileRoute } from '@tanstack/react-router';

import { DashboardLayout } from '@/layouts/dashboard-layout';

export const Route = createFileRoute('/(dashboard)/_layout')({
  component: DashboardLayout,
});
