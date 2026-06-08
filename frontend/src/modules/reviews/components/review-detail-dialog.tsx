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

import { ReviewStatus } from '@/types/enums/review-status.enum';

import type { Doctor, Review } from '../review.type';

type ReviewDetailDialogProps = {
  review: Review;
};

function getDoctor(value: Review['doctor']): Doctor | null {
  if (!value || typeof value === 'string') {
    return null;
  }

  return value;
}

export function ReviewDetailDialog({ review }: ReviewDetailDialogProps) {
  const doctor = getDoctor(review.doctor);
  const statusVariant =
    review.status === ReviewStatus.APPROVED
      ? 'success'
      : review.status === ReviewStatus.REJECTED
        ? 'danger'
        : 'warning';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`View review from ${review.patient.fullName}`}>
          <Eye className='size-4 stroke-primary' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>Review full patient feedback information before taking actions.</DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant='primary'>Rating {review.rating}/5</Badge>
            <Badge variant={statusVariant}>{review.status.toLowerCase()}</Badge>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Patient</p>
              <p className='mt-1 text-sm font-medium'>{review.patient.fullName}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Doctor</p>
              <p className='mt-1 text-sm font-medium'>{doctor?.fullName ?? '-'}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Specialization</p>
              <p className='mt-1 text-sm font-medium'>{doctor?.specialist?.name ?? '-'}</p>
            </div>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Created At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(review.createdAt)}</p>
            </div>
            <div className='rounded-lg border bg-background p-3 sm:col-span-2'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Comment</p>
              <p className='mt-1 text-sm font-medium'>{review.comment?.trim() ? review.comment : 'No comment'}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
