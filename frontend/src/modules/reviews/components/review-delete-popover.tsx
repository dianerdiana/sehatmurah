import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { reviewKeys } from '../review.key';
import { reviewMutationOptions } from '../review.mutation';

type ReviewDeletePopoverProps = {
  reviewId: string;
  patientName: string;
};

export function ReviewDeletePopover({ reviewId, patientName }: ReviewDeletePopoverProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...reviewMutationOptions.delete(reviewId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reviewKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: reviewKeys.detail(reviewId) }),
        queryClient.invalidateQueries({ queryKey: reviewKeys.doctorLists() }),
      ]);
      toast.success('Review deleted successfully');
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete review');
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`Delete review from ${patientName}`}>
          <Trash2 className='size-4 text-destructive' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80 space-y-3'>
        <div className='space-y-1'>
          <p className='font-semibold'>Delete review?</p>
          <p className='text-sm text-muted-foreground'>
            You are about to delete review data from <span className='font-medium text-foreground'>{patientName}</span>.
            This action cannot be undone.
          </p>
        </div>

        <div className='flex items-center justify-end gap-2'>
          <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={mutation.isPending}>
            No
          </Button>
          <Button type='button' variant='destructive' onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className='size-4 animate-spin' /> : null}
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
