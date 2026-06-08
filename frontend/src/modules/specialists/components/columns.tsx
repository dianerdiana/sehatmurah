import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { formatDateTime } from '@/utils/utils';

import type { Specialist } from '../specialist.type';

import { SpecialistDeletePopover } from './specialist-delete-popover';
import { SpecialistDetailDialog } from './specialist-detail-dialog';

function SortableHeader({
  label,
  onClick,
  sorted,
}: {
  label: string;
  onClick: () => void;
  sorted: false | 'asc' | 'desc';
}) {
  return (
    <Button variant='ghost' size='sm' className='-ml-3 h-8 px-2' onClick={onClick} type='button'>
      <span>{label}</span>
      {sorted === 'asc' ? (
        <ArrowUp className='size-4' />
      ) : sorted === 'desc' ? (
        <ArrowDown className='size-4' />
      ) : (
        <ArrowUpDown className='size-4 text-muted-foreground' />
      )}
    </Button>
  );
}

function RowActions({ specialist }: { specialist: Specialist }) {
  return (
    <div className='flex items-center justify-center gap-1'>
      <Link to='/app/specialists/$specialistId/edit' params={{ specialistId: specialist._id }}>
        <Pencil className='size-4 stroke-amber-500' />
      </Link>
      <SpecialistDetailDialog specialist={specialist} />
      <SpecialistDeletePopover specialistId={specialist._id} specialistName={specialist.name} />
    </div>
  );
}

export const specialistsColumns: ColumnDef<Specialist>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader
        label='Specialist Name'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => (
      <div className='space-y-0.5'>
        <p className='font-medium leading-tight'>{row.original.name}</p>
        <p className='text-xs text-muted-foreground'>{row.original.slug}</p>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <p className='max-w-105 truncate text-sm text-muted-foreground'>{row.original.description || 'No description'}</p>
    ),
  },
  {
    accessorKey: 'countDoctors',
    header: 'Doctors',
    cell: ({ row }) => <span className='font-medium'>{row.original.countDoctors}</span>,
  },
  {
    accessorKey: 'sortOrder',
    header: ({ column }) => (
      <SortableHeader
        label='Sort Order'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => row.original.sortOrder,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'success' : 'danger'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortableHeader
        label='Created At'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => <RowActions specialist={row.original} />,
    enableSorting: false,
  },
];
