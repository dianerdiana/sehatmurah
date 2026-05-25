import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { PatientListItem } from '../patient.type';

import { PatientDeletePopover } from './patient-delete-popover';
import { PatientDetailDialog } from './patient-detail-dialog';

const formatDateTime = (value: string) => {
  try {
    return format(new Date(value), 'dd MMM yyyy');
  } catch {
    return value;
  }
};

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

function RowActions({ patient }: { patient: PatientListItem }) {
  return (
    <div className='flex items-center justify-end gap-1'>
      <Link to='/app/patients/$patientId/edit' params={{ patientId: patient._id }}>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`Edit ${patient.fullName}`}>
          <Pencil className='size-4' />
        </Button>
      </Link>
      <PatientDetailDialog patient={patient} />
      <PatientDeletePopover patientId={patient._id} patientName={patient.fullName} />
    </div>
  );
}

export const patientsColumns: ColumnDef<PatientListItem>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <SortableHeader
        label='Full Name'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => (
      <div className='space-y-0.5'>
        <p className='font-medium leading-tight'>{row.original.fullName}</p>
        <p className='text-xs text-muted-foreground'>{row.original.user.email}</p>
      </div>
    ),
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => (
      <span className='capitalize text-sm'>{row.original.gender ? row.original.gender.toLowerCase() : '—'}</span>
    ),
  },
  {
    id: 'phoneNumber',
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => <span className='text-sm text-muted-foreground'>{row.original.phoneNumber ?? '—'}</span>,
  },
  {
    id: 'userStatus',
    header: 'Account',
    cell: ({ row }) => (
      <Badge variant={row.original.user.isActive ? 'success' : 'danger'}>
        {row.original.user.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortableHeader
        label='Registered'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => <span className='text-sm text-muted-foreground'>{formatDateTime(row.original.createdAt)}</span>,
  },
  {
    id: 'actions',
    header: () => <div className='text-right'>Actions</div>,
    cell: ({ row }) => <RowActions patient={row.original} />,
    enableSorting: false,
  },
];
