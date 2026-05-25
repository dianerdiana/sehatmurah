import { format } from 'date-fns';
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

import type { PatientListItem } from '../patient.type';

type PatientDetailDialogProps = {
  patient: PatientListItem;
};

const formatDate = (value: string) => {
  try {
    return format(new Date(value), 'dd MMM yyyy');
  } catch {
    return value;
  }
};

const formatDateTime = (value: string) => {
  try {
    return format(new Date(value), 'dd MMM yyyy, HH:mm');
  } catch {
    return value;
  }
};

export function PatientDetailDialog({ patient }: PatientDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`View ${patient.fullName} details`}>
          <Eye className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>Review complete patient information before editing or deleting.</DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='flex items-start gap-4 rounded-lg border bg-muted/20 p-4'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-full border bg-background text-lg font-semibold text-muted-foreground'>
              {patient.fullName.charAt(0).toUpperCase()}
            </div>
            <div className='space-y-1'>
              <p className='text-lg font-semibold leading-tight'>{patient.fullName}</p>
              <p className='text-sm text-muted-foreground'>{patient.user.email}</p>
              <Badge variant={patient.user.isActive ? 'success' : 'danger'}>
                {patient.user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Full Name</p>
              <p className='mt-1 text-sm font-medium'>{patient.fullName}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Account Name</p>
              <p className='mt-1 text-sm font-medium'>{patient.user.name}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Gender</p>
              <p className='mt-1 text-sm font-medium capitalize'>
                {patient.gender ? patient.gender.toLowerCase() : '—'}
              </p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Date of Birth</p>
              <p className='mt-1 text-sm font-medium'>{patient.dateOfBirth ? formatDate(patient.dateOfBirth) : '—'}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Phone Number</p>
              <p className='mt-1 text-sm font-medium'>{patient.phoneNumber ?? '—'}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Role</p>
              <p className='mt-1 text-sm font-medium capitalize'>{patient.user.role.toLowerCase()}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Created At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(patient.createdAt)}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Updated At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(patient.updatedAt)}</p>
            </div>
          </div>

          {patient.address ? (
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Address</p>
              <p className='mt-1 text-sm leading-relaxed'>{patient.address}</p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
