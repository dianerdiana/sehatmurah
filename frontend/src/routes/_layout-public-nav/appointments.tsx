import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { appointmentQueryOptions } from '@/modules/appointments/appointment.query';
import { listAppointmentsSchema } from '@/modules/appointments/appointment.schema';
import type { Appointment } from '@/modules/appointments/appointment.type';
import { type AppointmentStatusFilter, appointmentStatusLabels } from '@/modules/appointments/appointment-status';
import { AppointmentsTablePagination } from '@/modules/appointments/components/appointments-table-pagination';
import { AppointmentsTableToolbar } from '@/modules/appointments/components/appointments-table-toolbar';
import {
  CardAppointment,
  CardAppointmentNotFound,
  CardAppointmentSkeleton,
} from '@/modules/appointments/components/card-appointment';

import { requireAuthenticated } from '@/utils/auth/route-guard';
import { useAuth } from '@/utils/hooks/use-auth';

import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-public-nav/appointments')({
  validateSearch: listAppointmentsSchema,
  beforeLoad: ({ context, location }) => {
    const redirectTarget = location.href;

    requireAuthenticated(context.auth, redirectTarget);

    if (context.auth.isAuthenticated && context.auth.userData.role !== UserRole.PATIENT) {
      throw redirect({ to: '/dashboard', replace: true });
    }
  },
  component: UserAppointmentList,
});

function UserAppointmentList() {
  const { userData } = useAuth();
  const navigate = useNavigate({ from: '/appointments' });
  const search = Route.useSearch();

  const appointmentsQuery = useQuery({
    ...appointmentQueryOptions.list(search),
  });

  const appointments = appointmentsQuery.data?.items ?? [];
  const meta = appointmentsQuery.data?.meta ?? {};
  const totalItems = meta.totalItems ?? appointments.length;
  const totalPages = meta.totalPages;

  const updateSearch = (patch: Partial<typeof search>, resetPage = false) => {
    navigate({
      to: '/appointments',
      replace: true,
      search: (previous) => ({
        ...previous,
        ...patch,
        page: resetPage ? 1 : (patch.page ?? previous.page),
      }),
    });
  };

  const handleSearchChange = (value: string) => {
    updateSearch({ search: value }, true);
  };

  const handleStatusChange = (value: AppointmentStatusFilter) => {
    updateSearch({ status: value }, true);
  };

  const handleStartDateChange = (value: string) => {
    updateSearch({ startDate: value }, true);
  };

  const handleEndDateChange = (value: string) => {
    updateSearch({ endDate: value }, true);
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        status: 'all',
        startDate: '',
        endDate: '',
        page: 1,
      },
      true,
    );
  };

  const handlePageChange = (page: number) => {
    updateSearch({ page });
  };

  const handleLimitChange = (limit: number) => {
    updateSearch({ limit, page: 1 });
  };

  return (
    <main className='space-y-4 px-4 py-6'>
      <Card className='rounded-3xl'>
        <CardContent className='space-y-2'>
          <p className='text-sm font-medium text-muted-foreground'>Appointments</p>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900'>My Appointment List</h1>
          <p className='max-w-2xl text-sm text-muted-foreground'>
            Browse your appointments, search by booking code, doctor, or specialist, and filter by appointment date and
            status.
          </p>
          <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
            <span className='font-semibold text-foreground'>{totalItems}</span> appointment{totalItems === 1 ? '' : 's'}
            for {userData.name || 'you'}
          </div>
        </CardContent>
      </Card>

      <AppointmentsTableToolbar
        search={search.search}
        status={search.status}
        startDate={search.startDate}
        endDate={search.endDate}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onClearFilters={handleClearFilters}
      />

      {appointmentsQuery.isError ? (
        <Card className='rounded-3xl'>
          <CardContent className='flex min-h-80 flex-col items-center justify-center gap-3 text-center'>
            <SearchX className='size-8 text-muted-foreground' />
            <h2 className='text-lg font-semibold text-gray-900'>Unable to load appointments</h2>
            <p className='max-w-md text-sm text-muted-foreground'>
              {appointmentsQuery.error instanceof Error
                ? appointmentsQuery.error.message
                : 'Please try again after refreshing the page.'}
            </p>
            <Button onClick={() => appointmentsQuery.refetch()}>Retry</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <section className='space-y-4'>
            {appointmentsQuery.isPending ? (
              Array.from({ length: 3 }).map((_, index) => <CardAppointmentSkeleton key={index} />)
            ) : appointments.length ? (
              appointments.map((appointment) => (
                <CardAppointment appointment={appointment as Appointment} key={appointment._id} />
              ))
            ) : (
              <CardAppointmentNotFound />
            )}
          </section>

          <AppointmentsTablePagination
            page={search.page}
            limit={search.limit}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {search.search || search.status !== 'all' || search.startDate || search.endDate ? (
        <p className='text-sm text-muted-foreground'>
          Showing {totalItems} appointment{totalItems === 1 ? '' : 's'}
          {search.search ? ` for “${search.search}”` : ''}
          {search.status !== 'all' ? ` with status ${appointmentStatusLabels[search.status]}` : ''}
          {search.startDate ? ` from ${search.startDate}` : ''}
          {search.endDate ? ` to ${search.endDate}` : ''}.
        </p>
      ) : null}
    </main>
  );
}
