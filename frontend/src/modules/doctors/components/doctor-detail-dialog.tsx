import { format } from 'date-fns';
import { Eye, Star } from 'lucide-react';

import { ImageServer } from '@/components/image-server';
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

import { formatCurrency } from '@/utils/utils';

import type { Doctor } from '../doctor.type';

type DoctorDetailDialogProps = {
  doctor: Doctor;
};

const formatDateTime = (dateTime: string) => {
  try {
    return format(new Date(dateTime), 'dd MMM yyyy, HH:mm');
  } catch {
    return dateTime;
  }
};

export function DoctorDetailDialog({ doctor }: DoctorDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`View ${doctor.fullName} details`}>
          <Eye className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Doctor Details</DialogTitle>
          <DialogDescription>Review complete doctor information before editing or deleting.</DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='flex flex-col gap-4 rounded-lg border bg-muted/20 p-4 sm:flex-row'>
            <div className='size-20 shrink-0 overflow-hidden rounded-xl border bg-background'>
              {doctor.profilePhoto ? (
                <ImageServer src={doctor.profilePhoto} alt={doctor.fullName} className='size-full object-cover' />
              ) : (
                <div className='flex size-full items-center justify-center text-xs text-muted-foreground'>No image</div>
              )}
            </div>
            <div className='space-y-1'>
              <p className='text-lg font-semibold leading-tight'>{doctor.fullName}</p>
              <p className='text-sm text-muted-foreground'>{doctor.specialist.name} Specialist</p>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge variant={doctor.isAvailable ? 'success' : 'danger'}>
                  {doctor.isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
                <div className='inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium'>
                  <Star className='size-3.5 fill-yellow-400 text-yellow-400' />
                  {doctor.ratingAverage.toFixed(1)} ({doctor.ratingCount})
                </div>
              </div>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Experience</p>
              <p className='mt-1 text-sm font-medium'>{doctor.experienceYears} years</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Consultation Fee</p>
              <p className='mt-1 text-sm font-medium'>{formatCurrency(doctor.consultationFee)}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Created At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(doctor.createdAt)}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Updated At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(doctor.updatedAt)}</p>
            </div>
          </div>

          <div className='rounded-lg border bg-background p-3'>
            <p className='text-xs uppercase tracking-wide text-muted-foreground'>Practice Location</p>
            <p className='mt-1 text-sm font-medium'>{doctor.practiceLocation.clinicName}</p>
            <p className='text-sm text-muted-foreground'>
              {doctor.practiceLocation.address}, {doctor.practiceLocation.city}
            </p>
          </div>

          <div className='rounded-lg border bg-background p-3'>
            <p className='text-xs uppercase tracking-wide text-muted-foreground'>Description</p>
            <p className='mt-1 text-sm leading-relaxed text-foreground'>
              {doctor.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
