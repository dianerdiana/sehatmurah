import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { doctorKeys } from '../doctor.key';
import { doctorMutationOptions } from '../doctor.mutation';
import type { Doctor } from '../doctor.type';

type DoctorApprovalActionsProps = {
  doctor: Doctor;
};

export function DoctorApprovalActions({ doctor }: DoctorApprovalActionsProps) {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const queryClient = useQueryClient();

  const invalidateDoctorQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() }),
      queryClient.invalidateQueries({ queryKey: doctorKeys.detail(doctor._id) }),
    ]);
  };

  const approveMutation = useMutation({
    ...doctorMutationOptions.approve(doctor._id),
    onSuccess: async () => {
      await invalidateDoctorQueries();
      toast.success('Doctor approved successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to approve doctor');
    },
  });

  const rejectMutation = useMutation({
    ...doctorMutationOptions.reject(doctor._id),
    onSuccess: async () => {
      await invalidateDoctorQueries();
      toast.success('Doctor rejected successfully');
      setIsRejectDialogOpen(false);
      setRejectionReason('');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to reject doctor');
    },
  });

  if (doctor.approvalStatus !== 'pending') {
    return null;
  }

  const isPending = approveMutation.isPending || rejectMutation.isPending;

  const handleReject = () => {
    const reason = rejectionReason.trim();

    if (!reason) {
      toast.error('Rejection reason is required');
      return;
    }

    rejectMutation.mutate({
      status: 'rejected',
      rejectionReason: reason,
    });
  };

  return (
    <>
      <Button
        type='button'
        variant='secondary'
        size='sm'
        disabled={isPending}
        onClick={() => approveMutation.mutate({ status: 'approved' })}
      >
        {approveMutation.isPending ? <Loader2 className='size-4 animate-spin' /> : <Check className='size-4' />}
        Approve
      </Button>

      <Button
        type='button'
        variant='destructive'
        size='sm'
        disabled={isPending}
        onClick={() => setIsRejectDialogOpen(true)}
      >
        <X className='size-4' />
        Reject
      </Button>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject doctor approval</DialogTitle>
            <DialogDescription>
              Add a clear reason for rejecting <span className='font-medium text-foreground'>{doctor.fullName}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-2'>
            <label htmlFor='rejectionReason' className='text-sm font-medium'>
              Rejection reason
            </label>
            <Textarea
              id='rejectionReason'
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
              placeholder='Explain why this doctor profile is rejected'
              maxLength={500}
              className='min-h-24'
              disabled={rejectMutation.isPending}
            />
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              disabled={rejectMutation.isPending}
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type='button' variant='destructive' disabled={rejectMutation.isPending} onClick={handleReject}>
              {rejectMutation.isPending ? <Loader2 className='size-4 animate-spin' /> : null}
              Confirm reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
