import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout-public-nav/appointments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout-public-nav/appointments"!</div>
}
