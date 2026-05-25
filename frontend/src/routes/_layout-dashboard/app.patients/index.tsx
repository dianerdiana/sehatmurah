import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { SortingState, Updater } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { PatientsTable } from '@/modules/patients/components/patients-table';
import { PatientsTablePagination } from '@/modules/patients/components/patients-table-pagination';
import { PatientsTableToolbar } from '@/modules/patients/components/patients-table-toolbar';
import { patientQueryOptions } from '@/modules/patients/patient.query';
import type { ListPatientsSearchState } from '@/modules/patients/patient.schema';
import { listPatientsSchema } from '@/modules/patients/patient.schema';
import type { PatientListItem } from '@/modules/patients/patient.type';

export const Route = createFileRoute('/_layout-dashboard/app/patients/')({
  validateSearch: listPatientsSchema,
  component: PatientsListPage,
});

type SortableColumn = 'fullName' | 'createdAt';

const isSortableColumn = (value: string): value is SortableColumn => {
  return value === 'fullName' || value === 'createdAt';
};

function PatientsListPage() {
  const navigate = useNavigate({ from: '/app/patients/' });
  const search = Route.useSearch() as ListPatientsSearchState;

  const query = useQuery({
    ...patientQueryOptions.list(search),
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

  const updateSearch = (patch: Partial<ListPatientsSearchState>, resetPage = false) => {
    navigate({
      to: '/app/patients',
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

  const handleGenderChange = (value: 'all' | 'MALE' | 'FEMALE') => {
    updateSearch({ gender: value }, true);
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        gender: 'all',
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

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>Dashboard</p>
              <h1 className='text-2xl font-semibold tracking-tight'>Patients List</h1>
              <p className='max-w-2xl text-sm text-muted-foreground'>
                Manage registered patients with server-side search, filtering, sorting, and pagination.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{totalItems}</span> patients
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PatientsTableToolbar
        search={search.search}
        gender={search.gender}
        onSearchChange={handleSearchChange}
        onGenderChange={handleGenderChange}
        onClearFilters={handleClearFilters}
      />

      {query.isError ? (
        <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center shadow-sm'>
          <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <SearchX className='size-7' />
          </div>
          <h2 className='text-lg font-semibold'>Unable to load patients</h2>
          <p className='mt-2 max-w-md text-sm text-muted-foreground'>
            {query.error instanceof Error ? query.error.message : 'Please try again after refreshing the page.'}
          </p>
          <Button className='mt-6' onClick={() => query.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <PatientsTable
            data={data as PatientListItem[]}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={query.isPending}
          />

          <PatientsTablePagination
            page={search.page}
            limit={search.limit}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {search.search || search.gender !== 'all' ? (
        <p className='text-sm text-muted-foreground'>
          Showing {totalItems} patient{totalItems === 1 ? '' : 's'}
          {search.search ? ` matching "${search.search}"` : ''}
          {search.gender !== 'all'
            ? ` with gender "${search.gender.charAt(0) + search.gender.slice(1).toLowerCase()}"`
            : ''}
          .
        </p>
      ) : null}
    </div>
  );
}
