import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { Appointment, AppointmentParty } from '../appointment.type';
import { appointmentStatusBadgeVariants, appointmentStatusLabels } from '../appointment-status';

import { AppointmentStatusPopover } from './appointment-status-popover';

const getPartyName = (party: string | AppointmentParty) => {
  if (typeof party === 'string') {
    return party;
  }

  return party.fullName;
};

const formatAppointmentDate = (date: string) => {
  try {
    return format(date, 'dd MMM yyyy');
  } catch {
    return date;
  }
};

export const appointmentsColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'bookingCode',
    header: 'Booking Code',
    cell: ({ row }) => <span className='font-medium'>{row.original.bookingCode}</span>,
  },
  {
    accessorKey: 'appointmentDate',
    header: ({ column }) => {
      const sorted = column.getIsSorted();

      return (
        <Button
          variant='ghost'
          size='sm'
          className='-ml-3 h-8 px-2'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          type='button'
        >
          <span>Appointment Date</span>
          {sorted === 'asc' ? (
            <ArrowUp className='size-4' />
          ) : sorted === 'desc' ? (
            <ArrowDown className='size-4' />
          ) : (
            <ArrowUpDown className='size-4 text-muted-foreground' />
          )}
        </Button>
      );
    },
    cell: ({ row }) => formatAppointmentDate(row.original.appointmentDate),
  },
  {
    accessorKey: 'startTime',
    header: 'Time',
    cell: ({ row }) => `${row.original.startTime} - ${row.original.endTime}`,
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => getPartyName(row.original.patient),
  },
  {
    accessorKey: 'doctor',
    header: 'Doctor',
    cell: ({ row }) => getPartyName(row.original.doctor),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const sorted = column.getIsSorted();

      return (
        <Button
          variant='ghost'
          size='sm'
          className='-ml-3 h-8 px-2'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          type='button'
        >
          <span>Status</span>
          {sorted === 'asc' ? (
            <ArrowUp className='size-4' />
          ) : sorted === 'desc' ? (
            <ArrowDown className='size-4' />
          ) : (
            <ArrowUpDown className='size-4 text-muted-foreground' />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <AppointmentStatusPopover appointment={row.original} />,
  },
];

export const appointmentStatusColumnConfig = {
  variants: appointmentStatusBadgeVariants,
  labels: appointmentStatusLabels,
};
