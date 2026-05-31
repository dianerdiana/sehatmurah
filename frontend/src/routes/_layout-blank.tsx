import { createFileRoute, Outlet } from '@tanstack/react-router';

import { useTheme } from '@/utils/hooks/use-theme';

export const Route = createFileRoute('/_layout-blank')({
  component: BlankLayout,
});

function BlankLayout() {
  const { setTheme } = useTheme();

  setTheme('light');

  return <Outlet />;
}
