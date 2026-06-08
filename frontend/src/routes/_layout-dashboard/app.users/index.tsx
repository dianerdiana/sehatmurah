import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import type { SortingState, Updater } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { UsersTable } from '@/modules/users/components/users-table';
import { UsersTablePagination } from '@/modules/users/components/users-table-pagination';
import { UsersTableToolbar } from '@/modules/users/components/users-table-toolbar';
import { userQueryOptions } from '@/modules/users/user.query';
import type { ListUsersSearchState } from '@/modules/users/user.schema';
import { listUsersSchema } from '@/modules/users/user.schema';
import type { UserListItem } from '@/modules/users/user.type';

import { hasPermissionPage } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/users/')({
  validateSearch: listUsersSchema,
  component: UsersListPage,
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'read', 'User');
  },
});

type SortableColumn = 'name' | 'createdAt';

const isSortableColumn = (value: string): value is SortableColumn => {
  return value === 'name' || value === 'createdAt';
};

function UsersListPage() {
  const navigate = useNavigate({ from: '/app/users/' });
  const search = Route.useSearch() as ListUsersSearchState;

  const query = useQuery({
    ...userQueryOptions.list(search),
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

  const updateSearch = (patch: Partial<ListUsersSearchState>, resetPage = false) => {
    navigate({
      to: '/app/users',
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

  const handleRoleChange = (value: ListUsersSearchState['role']) => {
    updateSearch({ role: value }, true);
  };

  const handleStatusChange = (value: ListUsersSearchState['isActive']) => {
    updateSearch({ isActive: value }, true);
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        role: 'all',
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
              <h1 className='text-2xl font-semibold tracking-tight'>Users List</h1>
              <p className='max-w-2xl text-sm text-muted-foreground'>
                Manage platform users with server-side search, filtering, sorting, and pagination.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>{totalItems}</span> users
              </div>

              <Button className='rounded-full' asChild>
                <Link to='/app/users/create'>Add User</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <UsersTableToolbar
        search={search.search}
        role={search.role}
        isActive={search.isActive}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />

      {query.isError ? (
        <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center shadow-sm'>
          <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <SearchX className='size-7' />
          </div>
          <h2 className='text-lg font-semibold'>Unable to load users</h2>
          <p className='mt-2 max-w-md text-sm text-muted-foreground'>
            {query.error instanceof Error ? query.error.message : 'Please try again after refreshing the page.'}
          </p>
          <Button className='mt-6' onClick={() => query.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <UsersTable
            data={data as UserListItem[]}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={query.isPending}
          />

          <UsersTablePagination
            page={search.page}
            limit={search.limit}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}

      {search.search || search.role !== 'all' || search.isActive !== 'all' ? (
        <p className='text-sm text-muted-foreground'>
          Showing {totalItems} user{totalItems === 1 ? '' : 's'}
          {search.search ? ` matching "${search.search}"` : ''}
          {search.role !== 'all' ? ` with role "${search.role}"` : ''}
          {search.isActive === 'true' ? ' with active status' : ''}
          {search.isActive === 'false' ? ' with inactive status' : ''}.
        </p>
      ) : null}
    </div>
  );
}
