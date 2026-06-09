import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Can } from '@/utils/context/ability-context';
import { formatCurrency, formatDate } from '@/utils/utils';

import type { Doctor } from '../doctor.type';

import { DoctorApprovalActions } from './doctor-approval-actions';
import { DoctorDeletePopover } from './doctor-delete-popover';
import { DoctorDetailDialog } from './doctor-detail-dialog';

const approvalStatusBadgeVariant: Record<Doctor['approvalStatus'], 'warning' | 'success' | 'danger'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
};

const approvalStatusLabel: Record<Doctor['approvalStatus'], string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
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

function RowActions({ doctor }: { doctor: Doctor }) {
  return (
    <div className='flex items-center justify-center gap-1'>
      <Can I='update' a='GeneralDoctorProfile'>
        <DoctorApprovalActions doctor={doctor} />
        <Button type='button' variant='ghost' size='icon-sm' asChild>
          <Link
            to='/app/doctors/$doctorId/edit'
            params={{ doctorId: doctor._id }}
            aria-label={`Edit ${doctor.fullName}`}
          >
            <Pencil className='size-4 stroke-amber-500' />
          </Link>
        </Button>
      </Can>
      <DoctorDetailDialog doctor={doctor} />
      <Can I='delete' a='DoctorProfile'>
        <DoctorDeletePopover doctorId={doctor._id} doctorName={doctor.fullName} />
      </Can>
    </div>
  );
}

export const doctorsColumns: ColumnDef<Doctor>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <SortableHeader
        label='Doctor Name'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => (
      <div className='space-y-0.5'>
        <p className='font-medium leading-tight'>{row.original.fullName}</p>
        <p className='text-xs text-muted-foreground'>{row.original.specialist.name}</p>
      </div>
    ),
  },
  {
    id: 'clinic',
    header: 'Clinic',
    cell: ({ row }) => (
      <div className='space-y-0.5'>
        <p className='font-medium'>{row.original.practiceLocation.clinicName}</p>
        <p className='text-xs text-muted-foreground'>{row.original.practiceLocation.city}</p>
      </div>
    ),
  },
  {
    accessorKey: 'consultationFee',
    header: 'Fee',
    cell: ({ row }) => formatCurrency(row.original.consultationFee),
  },
  {
    accessorKey: 'approvalStatus',
    header: 'Approval',
    cell: ({ row }) => {
      const status = row.original.approvalStatus;

      return <Badge variant={approvalStatusBadgeVariant[status]}>{approvalStatusLabel[status]}</Badge>;
    },
  },
  {
    accessorKey: 'isAvailable',
    header: 'Availability',
    cell: ({ row }) => (
      <Badge variant={row.original.isAvailable ? 'success' : 'danger'}>
        {row.original.isAvailable ? 'Available' : 'Unavailable'}
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
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => <RowActions doctor={row.original} />,
    enableSorting: false,
  },
];
