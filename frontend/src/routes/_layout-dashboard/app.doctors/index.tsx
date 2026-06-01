import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import type { SortingState, Updater } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { DoctorsTable } from '@/modules/doctors/components/doctors-table';
import { DoctorsTablePagination } from '@/modules/doctors/components/doctors-table-pagination';
import { DoctorsTableToolbar, type DoctorStatusFilter } from '@/modules/doctors/components/doctors-table-toolbar';
import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { listDoctorsSchema, type ListDoctorsSearchState } from '@/modules/doctors/doctor.schema';
import type { Doctor } from '@/modules/doctors/doctor.type';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

import { hasPermission } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/doctors/')({
  validateSearch: listDoctorsSchema,
  component: DoctorsListPage,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'read', 'ListDoctor')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

type SortableColumn = 'fullName' | 'createdAt';

const isSortableColumn = (value: string): value is SortableColumn => {
  return value === 'fullName' || value === 'createdAt';
};

function DoctorsListPage() {
  const navigate = useNavigate({ from: '/app/doctors/' });
  const search = Route.useSearch() as ListDoctorsSearchState;

  const query = useQuery({
    ...doctorQueryOptions.list(search),
  });

  const specialistsQuery = useQuery({
    ...specialistQueryOptions.list({
      page: 1,
      limit: 100,
      search: '',
      category: '',
      isActive: 'all',
      column: 'name',
      sort: 'asc',
    }),
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

  const updateSearch = (patch: Partial<ListDoctorsSearchState>, resetPage = false) => {
    navigate({
      to: '/app/doctors',
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
    const nextColumn = nextSortingState?.id ?? 'createdAt';

    updateSearch(
      {
        column: isSortableColumn(nextColumn) ? nextColumn : 'createdAt',
        sort: nextSortingState?.desc ? 'desc' : 'asc',
      },
      true,
    );
  };

  const handleSearchChange = (value: string) => {
    updateSearch({ search: value }, true);
  };

  const handleSpecialistChange = (value: string) => {
    updateSearch({ specialist: value }, true);
  };

  const handleStatusChange = (value: DoctorStatusFilter) => {
    updateSearch({ status: value }, true);
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        specialist: '',
        status: 'all',
        column: 'createdAt',
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

  const specialistOptions = (specialistsQuery.data?.items ?? []).map((item) => ({
    id: item._id,
    name: item.name,
  }));

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>Dashboard</p>
              <h1 className='text-2xl font-semibold tracking-tight'>Doctors List</h1>
              <p className='max-w-2xl text-sm text-muted-foreground'>
                Manage doctors with server-side search, filtering, sorting, and pagination.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{totalItems}</span> doctors
              </div>

              <Button className='rounded-full' asChild>
                <Link to='/app/doctors/create'>Add Doctor</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DoctorsTableToolbar
        search={search.search}
        specialist={search.specialist}
        status={search.status}
        specialistOptions={specialistOptions}
        onSearchChange={handleSearchChange}
        onSpecialistChange={handleSpecialistChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />

      {query.isError ? (
        <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center shadow-sm'>
          <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <SearchX className='size-7' />
          </div>
          <h2 className='text-lg font-semibold'>Unable to load doctors</h2>
          <p className='mt-2 max-w-md text-sm text-muted-foreground'>
            {query.error instanceof Error ? query.error.message : 'Please try again after refreshing the page.'}
          </p>
          <Button className='mt-6' onClick={() => query.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <DoctorsTable
            data={data as Doctor[]}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={query.isPending}
          />

          <DoctorsTablePagination
            page={search.page}
            limit={search.limit}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {search.search || search.specialist || search.status !== 'all' ? (
        <p className='text-sm text-muted-foreground'>
          Showing {totalItems} doctor{totalItems === 1 ? '' : 's'}
          {search.search ? ` for "${search.search}"` : ''}
          {search.status === 'pending' ? ' with pending approval status' : ''}
          {search.status === 'approved' ? ' with approved status' : ''}
          {search.status === 'rejected' ? ' with rejected status' : ''}.
        </p>
      ) : null}
    </div>
  );
}
