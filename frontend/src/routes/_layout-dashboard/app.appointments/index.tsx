import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { SortingState, Updater } from '@tanstack/react-table';
import { format } from 'date-fns';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { appointmentQueryOptions } from '@/modules/appointments/appointment.query';
import { listAppointmentsSchema } from '@/modules/appointments/appointment.schema';
import type { Appointment } from '@/modules/appointments/appointment.type';
import { type AppointmentStatusFilter, appointmentStatusLabels } from '@/modules/appointments/appointment-status';
import { AppointmentsTable } from '@/modules/appointments/components/appointments-table';
import { AppointmentsTablePagination } from '@/modules/appointments/components/appointments-table-pagination';
import { AppointmentsTableToolbar } from '@/modules/appointments/components/appointments-table-toolbar';

import { hasPermissionPage } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/appointments/')({
  head: () => ({
    meta: [{ title: 'Appointments | Sehatmurah' }],
  }),
  validateSearch: listAppointmentsSchema,
  component: AppointmentsListPage,
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'read', 'ListAppointment');
  },
});

type SortableColumn = 'appointmentDate' | 'status';

type AppointmentsSearchState = {
  page: number;
  limit: number;
  search: string;
  status: AppointmentStatusFilter;
  startDate: string;
  endDate: string;
  column: SortableColumn;
  sort: 'asc' | 'desc';
};

function AppointmentsListPage() {
  const navigate = useNavigate({ from: '/app/appointments/' });
  const search = Route.useSearch() as AppointmentsSearchState;

  const query = useQuery({
    ...appointmentQueryOptions.list(search),
  });

  const data = query.data?.items ?? [];
  const meta = query.data?.meta ?? {};
  const totalItems = meta.totalItems ?? data.length;
  const totalPages = meta.totalPages;

  const sorting: SortingState = [
    {
      id: search.column,
      desc: search.sort === 'desc',
    },
  ];

  const updateSearch = (patch: Partial<AppointmentsSearchState>, resetPage = false) => {
    navigate({
      to: '/app/appointments',
      replace: true,
      search: (previous) => ({
        ...previous,
        ...patch,
        page: resetPage ? 1 : (patch.page ?? previous.page),
      }),
    });
  };

  const handleSortingChange = (updater: Updater<SortingState>) => {
    const nextSorting = typeof updater === 'function' ? updater(sorting) : updater;
    const nextSortingState = nextSorting[0];

    updateSearch(
      {
        column: (nextSortingState?.id as SortableColumn) ?? 'appointmentDate',
        sort: nextSortingState?.desc ? 'desc' : 'asc',
      },
      true,
    );
  };

  const handleSearchChange = (value: string) => {
    updateSearch(
      {
        search: value,
      },
      true,
    );
  };

  const handleStatusChange = (value: AppointmentStatusFilter) => {
    updateSearch(
      {
        status: value,
      },
      true,
    );
  };

  const handleStartDateChange = (value: string) => {
    updateSearch({ startDate: value ? new Date(value).toISOString() : '' }, true);
  };

  const handleEndDateChange = (value: string) => {
    updateSearch({ endDate: value ? new Date(value).toISOString() : '' }, true);
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        status: 'all',
        startDate: '',
        endDate: '',
        column: 'appointmentDate',
        sort: 'desc',
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
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>Dashboard</p>
              <h1 className='text-2xl font-semibold tracking-tight'>Appointments List</h1>
              <p className='max-w-2xl text-sm text-muted-foreground'>
                Browse, search, filter, sort, and update appointment status inline without leaving the table.
              </p>
            </div>

            <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
              <span className='font-medium text-foreground'>{totalItems}</span> appointments
            </div>
          </div>
        </CardContent>
      </Card>

      <AppointmentsTableToolbar
        isDashboard
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

      {query.isError ? (
        <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center shadow-sm'>
          <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <SearchX className='size-7' />
          </div>
          <h2 className='text-lg font-semibold'>Unable to load appointments</h2>
          <p className='mt-2 max-w-md text-sm text-muted-foreground'>
            {query.error instanceof Error ? query.error.message : 'Please try again after refreshing the page.'}
          </p>
          <Button className='mt-6' onClick={() => query.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <AppointmentsTable
            data={data as Appointment[]}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={query.isPending}
          />

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
          {search.startDate ? ` from ${format(new Date(search.startDate), 'dd MMM yyyy')}` : ''}
          {search.endDate ? ` to ${format(new Date(search.endDate), 'dd MMM yyyy')}` : ''}.
        </p>
      ) : null}
    </div>
  );
}
