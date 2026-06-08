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
import { ImageServer } from '@/components/ui/image-server';

import { formatDateTime } from '@/utils/utils';

import type { Specialist } from '../specialist.type';

type SpecialistDetailDialogProps = {
  specialist: Specialist;
};

export function SpecialistDetailDialog({ specialist }: SpecialistDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`View ${specialist.name} details`}>
          <Eye className='size-4 stroke-primary' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Specialist Details</DialogTitle>
          <DialogDescription>Review complete specialist information before editing or deleting.</DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='flex items-start gap-4 rounded-lg border bg-muted/20 p-4'>
            <div className='size-16 shrink-0 overflow-hidden rounded-xl border bg-background'>
              {specialist.image ? (
                <ImageServer src={specialist.image} alt={specialist.name} className='size-full object-cover' />
              ) : (
                <div className='flex size-full items-center justify-center text-xs text-muted-foreground'>No image</div>
              )}
            </div>
            <div className='space-y-1'>
              <p className='text-lg font-semibold leading-tight'>{specialist.name}</p>
              <p className='text-sm text-muted-foreground'>{specialist.slug}</p>
              <Badge variant={specialist.isActive ? 'success' : 'danger'}>
                {specialist.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Doctors</p>
              <p className='mt-1 text-sm font-medium'>{specialist.countDoctors}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Sort Order</p>
              <p className='mt-1 text-sm font-medium'>{specialist.sortOrder}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Created At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(specialist.createdAt)}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Updated At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(specialist.updatedAt)}</p>
            </div>
          </div>

          <div className='rounded-lg border bg-background p-3'>
            <p className='text-xs uppercase tracking-wide text-muted-foreground'>Description</p>
            <p className='mt-1 text-sm leading-relaxed text-foreground'>
              {specialist.description || 'No description provided.'}
            </p>
          </div>

          {specialist.icon ? (
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Icon</p>
              <p className='mt-1 break-all text-sm'>{specialist.icon}</p>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
