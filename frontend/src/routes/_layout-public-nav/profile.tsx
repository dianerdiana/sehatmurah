import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout-public-nav/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout-public-nav/profile"!</div>;
}
