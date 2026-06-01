import { flexRender, getCoreRowModel, type OnChangeFn, type SortingState, useReactTable } from '@tanstack/react-table';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { Review } from '../review.type';

import { reviewsColumns } from './columns';

type ReviewsTableProps = {
  data: Review[];
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  isLoading?: boolean;
};

const LOADING_ROWS = 6;

export function ReviewsTable({ data, sorting, onSortingChange, isLoading = false }: ReviewsTableProps) {
  const table = useReactTable({
    data,
    columns: reviewsColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    onSortingChange,
    state: {
      sorting,
    },
  });

  return (
    <Card className='overflow-x-auto rounded-2xl py-2 shadow-sm'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: LOADING_ROWS }).map((_, index) => (
              <TableRow key={index}>
                {reviewsColumns.map((column) => (
                  <TableCell key={String((column as { accessorKey?: string; id?: string }).accessorKey ?? column.id)}>
                    <Skeleton className='h-4 w-full max-w-52' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={reviewsColumns.length} className='h-32 text-center'>
                No reviews found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
