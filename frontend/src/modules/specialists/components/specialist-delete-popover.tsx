import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { specialistKeys } from '../specialist.key';
import { specialistMutationOptions } from '../specialist.mutation';

type SpecialistDeletePopoverProps = {
  specialistId: string;
  specialistName: string;
};

export function SpecialistDeletePopover({ specialistId, specialistName }: SpecialistDeletePopoverProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...specialistMutationOptions.delete(specialistId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: specialistKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: specialistKeys.detail(specialistId) }),
      ]);
      toast.success('Specialist deleted successfully');
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete specialist');
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type='button' variant='ghost' size='icon-sm' aria-label={`Delete ${specialistName}`}>
          <Trash2 className='size-4 text-destructive' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80 space-y-3'>
        <div className='space-y-1'>
          <p className='font-semibold'>Delete specialist?</p>
          <p className='text-sm text-muted-foreground'>
            You are about to delete <span className='font-medium text-foreground'>{specialistName}</span>. This action
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
