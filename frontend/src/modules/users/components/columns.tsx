import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { formatDate } from '@/utils/utils';

import type { UserRole } from '@/types/enums/user-role.enum';

import type { UserListItem } from '../user.type';

import { UserDeletePopover } from './user-delete-popover';
import { UserDetailDialog } from './user-detail-dialog';

const roleVariant: Record<UserRole, 'default' | 'primary' | 'warning'> = {
  ADMIN: 'warning',
  DOCTOR: 'primary',
  PATIENT: 'default',
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

function RowActions({ user }: { user: UserListItem }) {
  return (
    <div className='flex items-center justify-center gap-1'>
      <Link to='/app/users/$userId/edit' params={{ userId: user._id }}>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`Edit ${user.name}`}>
          <Pencil className='size-4 stroke-amber-500' />
        </Button>
      </Link>
      <UserDetailDialog user={user} />
      <UserDeletePopover userId={user._id} userName={user.name} />
    </div>
  );
}

export const usersColumns: ColumnDef<UserListItem>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader
        label='Name'
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
    cell: ({ row }) => (
      <div className='space-y-0.5'>
        <p className='font-medium leading-tight'>{row.original.name}</p>
        <p className='text-xs text-muted-foreground'>{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <Badge variant={roleVariant[row.original.role]}>{row.original.role.toLowerCase()}</Badge>,
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
    cell: ({ row }) => <span className='text-sm text-muted-foreground'>{formatDate(row.original.createdAt)}</span>,
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => <RowActions user={row.original} />,
    enableSorting: false,
  },
];
