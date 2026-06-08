import { createFileRoute, Outlet } from '@tanstack/react-router';

import { useTheme } from '@/utils/hooks/use-theme';

export const Route = createFileRoute('/_layout-public-blank')({
  head: () => ({
    meta: [{ title: 'Sehatmurah' }],
  }),
  component: PublicBlankLayout,
});

function PublicBlankLayout() {
  const { setTheme } = useTheme();

  setTheme('light');

  return (
    <div className='mx-auto max-w-170 overflow-hidden min-h-screen'>
      <Outlet />
    </div>
  );
}
