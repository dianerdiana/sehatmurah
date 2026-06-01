import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router';
import type { SortingState, Updater } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { SpecialistsTable } from '@/modules/specialists/components/specialists-table';
import { SpecialistsTablePagination } from '@/modules/specialists/components/specialists-table-pagination';
import { SpecialistsTableToolbar } from '@/modules/specialists/components/specialists-table-toolbar';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';
import type { ListSpecialistsSearchState } from '@/modules/specialists/specialist.schema';
import { listSpecialistsSchema } from '@/modules/specialists/specialist.schema';
import type { Specialist } from '@/modules/specialists/specialist.type';

import { hasPermission } from '@/utils/auth/has-permission';
import { Can } from '@/utils/context/ability-context';

export const Route = createFileRoute('/_layout-dashboard/app/specialists/')({
  validateSearch: listSpecialistsSchema,
  component: SpecialistsListPage,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'read', 'ListSpecialist')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

type SortableColumn = 'name' | 'createdAt' | 'sortOrder';

const isSortableColumn = (value: string): value is SortableColumn => {
  return value === 'name' || value === 'createdAt' || value === 'sortOrder';
};

function SpecialistsListPage() {
  const navigate = useNavigate({ from: '/app/specialists/' });
  const search = Route.useSearch() as ListSpecialistsSearchState;

  const query = useQuery({
    ...specialistQueryOptions.list(search),
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

  const updateSearch = (patch: Partial<ListSpecialistsSearchState>, resetPage = false) => {
    navigate({
      to: '/app/specialists',
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

  const handleCategoryChange = (value: string) => {
    updateSearch({ category: value }, true);
  };

  const handleStatusChange = (value: 'all' | 'true' | 'false') => {
    updateSearch({ isActive: value }, true);
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        category: '',
        isActive: 'all',
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
              <h1 className='text-2xl font-semibold tracking-tight'>Specialists List</h1>
              <p className='max-w-2xl text-sm text-muted-foreground'>
                Manage specialist categories with server-side search, filtering, sorting, and pagination.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{totalItems}</span> specialists
              </div>

              <Can I='create' a='Specialist'>
                <Button className='rounded-full' asChild>
                  <Link to='/app/specialists/create'>Add Specialist</Link>
                </Button>
              </Can>
            </div>
          </div>
        </CardContent>
      </Card>

      <SpecialistsTableToolbar
        search={search.search}
        category={search.category}
        isActive={search.isActive}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />

      {query.isError ? (
        <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center shadow-sm'>
          <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <SearchX className='size-7' />
          </div>
          <h2 className='text-lg font-semibold'>Unable to load specialists</h2>
          <p className='mt-2 max-w-md text-sm text-muted-foreground'>
            {query.error instanceof Error ? query.error.message : 'Please try again after refreshing the page.'}
          </p>
          <Button className='mt-6' onClick={() => query.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <SpecialistsTable
            data={data as Specialist[]}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={query.isPending}
          />

          <SpecialistsTablePagination
            page={search.page}
            limit={search.limit}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {search.search || search.category || search.isActive !== 'all' ? (
        <p className='text-sm text-muted-foreground'>
          Showing {totalItems} specialist{totalItems === 1 ? '' : 's'}
          {search.search ? ` for "${search.search}"` : ''}
          {search.category ? ` in category "${search.category}"` : ''}
          {search.isActive === 'true' ? ' with active status' : ''}
          {search.isActive === 'false' ? ' with inactive status' : ''}.
        </p>
      ) : null}
    </div>
  );
}
