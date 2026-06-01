import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { formatDate } from '@/utils/utils';

import { ReviewStatus } from '@/types/enums/review-status.enum';

import type { Doctor, Review } from '../review.type';

import { ReviewDeletePopover } from './review-delete-popover';
import { ReviewDetailDialog } from './review-detail-dialog';

function getDoctor(value: Review['doctor']): Doctor | null {
  if (!value || typeof value === 'string') {
    return null;
  }

  return value;
}

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

function RowActions({ review }: { review: Review }) {
  return (
    <div className='flex items-center justify-end gap-1'>
      <Link to='/app/reviews/$reviewId/edit' params={{ reviewId: review._id }}>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`Edit review from ${review.patient.fullName}`}>
          <Pencil className='size-4' />
        </Button>
      </Link>
      <ReviewDetailDialog review={review} />
      <ReviewDeletePopover reviewId={review._id} patientName={review.patient.fullName} />
    </div>
  );
}

export const reviewsColumns: ColumnDef<Review>[] = [
  {
    accessorKey: 'patientName',
    header: ({ column }) => (
      <SortableHeader
        label='Patient'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => <p className='font-medium leading-tight'>{row.original.patient.fullName}</p>,
  },
  {
    accessorKey: 'doctorName',
    header: ({ column }) => (
      <SortableHeader
        label='Doctor'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => {
      const doctor = getDoctor(row.original.doctor);
      const specialistName = doctor?.specialist?.name;

      return (
        <div className='space-y-0.5'>
          <p className='font-medium leading-tight'>{doctor?.fullName ?? '-'}</p>
          <p className='text-xs text-muted-foreground'>{specialistName ?? 'No specialist'}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <SortableHeader
        label='Rating'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => (
      <Badge variant='primary' className='gap-1'>
        <span>Star</span>
        <span>{row.original.rating}/5</span>
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === ReviewStatus.APPROVED ? 'success' : status === ReviewStatus.REJECTED ? 'danger' : 'warning';

      return <Badge variant={variant}>{status.toLowerCase()}</Badge>;
    },
  },
  {
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ row }) => (
      <p className='max-w-70 truncate text-sm text-muted-foreground'>
        {row.original.comment?.trim() ? row.original.comment : 'No comment'}
      </p>
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
    cell: ({ row }) => <span className='text-sm text-muted-foreground'>{formatDate(row.original.createdAt)}</span>,
  },
  {
    id: 'actions',
    header: () => <div className='text-right'>Actions</div>,
    cell: ({ row }) => <RowActions review={row.original} />,
    enableSorting: false,
  },
];
