import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout-blank')({
  component: BlankLayout,
});

function BlankLayout() {
  return <Outlet />;
}
