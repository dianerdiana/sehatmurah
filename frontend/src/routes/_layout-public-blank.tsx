import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout-public-blank')({
  component: PublicFacingBlankLayout,
});

function PublicFacingBlankLayout() {
  return (
    <main className='mx-auto max-w-170 overflow-hidden pb-24.5 min-h-screen'>
      <Outlet />
    </main>
  );
}
