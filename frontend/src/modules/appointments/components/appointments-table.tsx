import { flexRender, getCoreRowModel, type OnChangeFn, type SortingState, useReactTable } from '@tanstack/react-table';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import type { Appointment } from '../appointment.type';

import { appointmentsColumns } from './columns';

type AppointmentsTableProps = {
  data: Appointment[];
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  isLoading?: boolean;
};

const LOADING_ROWS = 6;

export function AppointmentsTable({ data, sorting, onSortingChange, isLoading = false }: AppointmentsTableProps) {
  const table = useReactTable({
    data,
    columns: appointmentsColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    onSortingChange,
    state: {
      sorting,
    },
  });

  return (
    <Card className='rounded-2xl shadow-sm py-2'>
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
                {appointmentsColumns.map((column) => (
                  <TableCell key={String((column as any).accessorKey ?? column.id)}>
                    <Skeleton className='h-4 w-full max-w-40' />
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
              <TableCell colSpan={appointmentsColumns.length} className='h-32 text-center'>
                No appointments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
