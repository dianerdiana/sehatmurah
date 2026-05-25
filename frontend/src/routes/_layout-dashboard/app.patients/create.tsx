import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout-dashboard/app/patients/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout-dashboard/app/patients/create"!</div>
}
