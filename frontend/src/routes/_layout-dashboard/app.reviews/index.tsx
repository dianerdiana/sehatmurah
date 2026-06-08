import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { SortingState, Updater } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ReviewsTable } from '@/modules/reviews/components/reviews-table';
import { ReviewsTablePagination } from '@/modules/reviews/components/reviews-table-pagination';
import { ReviewsTableToolbar } from '@/modules/reviews/components/reviews-table-toolbar';
import { reviewQueryOptions } from '@/modules/reviews/review.query';
import type { ListReviewsSearchState } from '@/modules/reviews/review.schema';
import { listReviewsSchema } from '@/modules/reviews/review.schema';
import type { Review } from '@/modules/reviews/review.type';

import { hasPermissionPage } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/reviews/')({
  head: () => ({
    meta: [{ title: 'Reviews | Sehatmurah' }],
  }),
  validateSearch: listReviewsSchema,
  component: ReviewsListPage,
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'read', 'ListReview');
  },
});

type SortableColumn = ListReviewsSearchState['column'];

const isSortableColumn = (value: string): value is SortableColumn => {
  return value === 'patientName' || value === 'doctorName' || value === 'rating' || value === 'createdAt';
};

function ReviewsListPage() {
  const navigate = useNavigate({ from: '/app/reviews/' });
  const search = Route.useSearch() as ListReviewsSearchState;

  const query = useQuery({
    ...reviewQueryOptions.list(search),
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

  const updateSearch = (patch: Partial<ListReviewsSearchState>, resetPage = false) => {
    navigate({
      to: '/app/reviews',
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

  const handlePageChange = (page: number) => {
    updateSearch({ page });
  };

  const handleLimitChange = (limit: number) => {
    updateSearch({ limit, page: 1 });
  };

  const handleClearFilters = () => {
    updateSearch(
      {
        search: '',
        status: 'all',
        specialist: '',
        rating: 'all',
        startDate: '',
        endDate: '',
        column: 'createdAt',
        sort: 'desc',
      },
      true,
    );
  };

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>Dashboard</p>
              <h1 className='text-2xl font-semibold tracking-tight'>Reviews List</h1>
              <p className='max-w-2xl text-sm text-muted-foreground'>
                Manage review data using server-side search, filtering, sorting, and pagination.
              </p>
            </div>

            <div className='rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground'>
              <span className='font-medium text-foreground'>{totalItems}</span> reviews
            </div>
          </div>
        </CardContent>
      </Card>

      <ReviewsTableToolbar
        search={search.search}
        status={search.status}
        specialist={search.specialist}
        rating={search.rating}
        startDate={search.startDate}
        endDate={search.endDate}
        onSearchChange={(value) => updateSearch({ search: value }, true)}
        onStatusChange={(value) => updateSearch({ status: value }, true)}
        onSpecialistChange={(value) => updateSearch({ specialist: value }, true)}
        onRatingChange={(value) => updateSearch({ rating: value }, true)}
        onStartDateChange={(value) => updateSearch({ startDate: value }, true)}
        onEndDateChange={(value) => updateSearch({ endDate: value }, true)}
        onClearFilters={handleClearFilters}
      />

      {query.isError ? (
        <div className='flex min-h-80 flex-col items-center justify-center rounded-xl border bg-background p-8 text-center shadow-sm'>
          <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <SearchX className='size-7' />
          </div>
          <h2 className='text-lg font-semibold'>Unable to load reviews</h2>
          <p className='mt-2 max-w-md text-sm text-muted-foreground'>
            {query.error instanceof Error ? query.error.message : 'Please try again after refreshing the page.'}
          </p>
          <Button className='mt-6' onClick={() => query.refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          <ReviewsTable
            data={data as Review[]}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            isLoading={query.isPending}
          />

          <ReviewsTablePagination
            page={search.page}
            limit={search.limit}
            totalItems={totalItems}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}
    </div>
  );
}
