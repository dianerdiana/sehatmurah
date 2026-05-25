import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout-dashboard/app/specialists/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout-dashboard/app/specialists/create"!</div>;
}
