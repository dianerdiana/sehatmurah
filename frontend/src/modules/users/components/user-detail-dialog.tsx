import { Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { formatDateTime } from '@/utils/utils';

import type { UserRole } from '@/types/enums/user-role.enum';

import type { UserListItem } from '../user.type';

type UserDetailDialogProps = {
  user: UserListItem;
};

const roleVariant: Record<UserRole, 'default' | 'primary' | 'warning'> = {
  ADMIN: 'warning',
  DOCTOR: 'primary',
  PATIENT: 'default',
};

export function UserDetailDialog({ user }: UserDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`View ${user.name} details`}>
          <Eye className='size-4 stroke-primary' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Review complete user information before editing or deleting.</DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='flex items-start gap-4 rounded-lg border bg-muted/20 p-4'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-full border bg-background text-lg font-semibold text-muted-foreground'>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className='space-y-1'>
              <p className='text-lg font-semibold leading-tight'>{user.name}</p>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
              <div className='flex items-center gap-2'>
                <Badge variant={roleVariant[user.role]}>{user.role.toLowerCase()}</Badge>
                <Badge variant={user.isActive ? 'success' : 'danger'}>{user.isActive ? 'Active' : 'Inactive'}</Badge>
              </div>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Name</p>
              <p className='mt-1 text-sm font-medium'>{user.name}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Email</p>
              <p className='mt-1 text-sm font-medium break-all'>{user.email}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Role</p>
              <p className='mt-1 text-sm font-medium capitalize'>{user.role.toLowerCase()}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Status</p>
              <p className='mt-1 text-sm font-medium'>{user.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Created At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(user.createdAt)}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Updated At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(user.updatedAt)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
