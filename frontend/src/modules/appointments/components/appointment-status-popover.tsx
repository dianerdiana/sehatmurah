import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { appointmentKeys } from '../appointment.key';
import { appointmentMutationOptions } from '../appointment.mutation';
import type { Appointment } from '../appointment.type';
import { appointmentStatusBadgeVariants, appointmentStatusLabels, appointmentStatusOrder } from '../appointment-status';

type AppointmentStatusPopoverProps = {
  appointment: Appointment;
};

const getStatusLabel = (status: Appointment['status']) => appointmentStatusLabels[status];

export function AppointmentStatusPopover({ appointment }: AppointmentStatusPopoverProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...appointmentMutationOptions.updateStatus(appointment._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
      toast.success('Appointment status updated');
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update appointment status');
    },
  });

  const currentStatusLabel = getStatusLabel(appointment.status);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='h-auto gap-2 px-2 py-1 font-normal hover:bg-transparent'
        >
          <Badge variant={appointmentStatusBadgeVariants[appointment.status]} className='px-2 py-0.5'>
            {currentStatusLabel}
          </Badge>
          <ChevronDown className='size-4 text-muted-foreground' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-64'>
        <div className='mb-3 space-y-1'>
          <p className='text-sm font-semibold'>Update status</p>
          <p className='text-xs text-muted-foreground'>Select a new status for this appointment.</p>
        </div>

        <div className='space-y-2'>
          {appointmentStatusOrder.map((status) => {
            const isCurrent = status === appointment.status;
            const isPending = mutation.isPending;

            return (
              <Button
                key={status}
                type='button'
                variant={isCurrent ? 'secondary' : 'outline'}
                className='w-full justify-start gap-2'
                disabled={isPending || isCurrent}
                onClick={() => mutation.mutate({ status })}
              >
                {isPending && mutation.variables?.status === status ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  <Check className={`size-4 ${isCurrent ? 'opacity-100' : 'opacity-0'}`} />
                )}
                <span>{appointmentStatusLabels[status]}</span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
