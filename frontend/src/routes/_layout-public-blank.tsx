import { createFileRoute, Outlet } from '@tanstack/react-router';

import { useTheme } from '@/utils/hooks/use-theme';

export const Route = createFileRoute('/_layout-public-blank')({
  component: PublicBlankLayout,
});

function PublicBlankLayout() {
  const { setTheme } = useTheme();

  setTheme('light');

  return (
    <main className='mx-auto max-w-170 overflow-hidden pb-24.5 min-h-screen'>
      <Outlet />
    </main>
  );
}
