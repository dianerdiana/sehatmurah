import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout-dashboard/app/users/$userId/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout-dashboard/app/users/$userId/edit"!</div>
}
