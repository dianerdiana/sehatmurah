import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { doctorKeys } from '../doctor.key';
import { doctorMutationOptions } from '../doctor.mutation';

type DoctorDeletePopoverProps = {
  doctorId: string;
  doctorName: string;
};

export function DoctorDeletePopover({ doctorId, doctorName }: DoctorDeletePopoverProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...doctorMutationOptions.delete(doctorId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: doctorKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: doctorKeys.detail(doctorId) }),
      ]);
      toast.success('Doctor deleted successfully');
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete doctor');
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`Delete ${doctorName}`}>
          <Trash2 className='size-4 text-destructive' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80 space-y-3'>
        <div className='space-y-1'>
          <p className='font-semibold'>Delete doctor?</p>
          <p className='text-sm text-muted-foreground'>
            You are about to delete <span className='font-medium text-foreground'>{doctorName}</span>. This action
            cannot be undone.
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
