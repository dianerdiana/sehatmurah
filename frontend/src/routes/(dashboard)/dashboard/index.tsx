import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return <div>Ini adalah Dashboard</div>;
}
