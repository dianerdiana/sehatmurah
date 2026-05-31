import type { DateRange } from 'react-day-picker';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { appointmentQueryOptions } from '@/modules/appointments/appointment.query';
import { listAppointmentsSchema } from '@/modules/appointments/appointment.schema';
import type { Appointment } from '@/modules/appointments/appointment.type';
import { type AppointmentStatusFilter } from '@/modules/appointments/appointment-status';
import { AppointmentsTableToolbar } from '@/modules/appointments/components/appointments-table-toolbar';
import {
  CardAppointment,
  CardAppointmentNotFound,
  CardAppointmentSkeleton,
} from '@/modules/appointments/components/card-appointment';

import { requireAuthenticated } from '@/utils/auth/route-guard';

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
  const navigate = useNavigate({ from: '/appointments' });
  const search = Route.useSearch();

  const appointmentsQuery = useQuery({
    ...appointmentQueryOptions.list(search),
  });

  const appointments = appointmentsQuery.data?.items ?? [];
  const meta = appointmentsQuery.data?.meta ?? {};
  const totalItems = meta.totalItems ?? appointments.length;
  const totalPages = Math.max(meta.totalPages ?? 0, totalItems > 0 ? Math.ceil(totalItems / search.limit) : 0);

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

  const handleSelectDateChange = (value: DateRange | undefined) => {
    if (value && value?.from && value?.to) {
      updateSearch({ startDate: value.from.toISOString(), endDate: value.to.toISOString() });
    }
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

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <main className='space-y-4 px-4 py-6'>
      <AppointmentsTableToolbar
        search={search.search}
        status={search.status}
        startDate={search.startDate}
        endDate={search.endDate}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        handleSelectDateChange={handleSelectDateChange}
        onClearFilters={handleClearFilters}
      />

      {appointmentsQuery.isError ? (
        <Card className='rounded-3xl shadow-none border-none'>
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

          {totalPages > 1 ? (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(search.page - 1)}
                    disabled={search.page <= 1}
                    aria-disabled={search.page <= 1}
                  />
                </PaginationItem>

                {pageNumbers.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink isActive={search.page === pageNumber} onClick={() => handlePageChange(pageNumber)}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(search.page + 1)}
                    disabled={search.page >= totalPages}
                    aria-disabled={search.page >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : null}
        </>
      )}
    </main>
  );
}
