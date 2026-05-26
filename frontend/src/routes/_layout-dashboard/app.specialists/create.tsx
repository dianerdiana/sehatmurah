import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { SpecialistForm } from '@/modules/specialists/components/specialist-form';
import { specialistKeys } from '@/modules/specialists/specialist.key';
import { specialistMutationOptions } from '@/modules/specialists/specialist.mutation';

import { useAuth } from '@/utils/hooks/use-auth';

import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-dashboard/app/specialists/create')({
  component: SpecialistsCreatePage,
});

function SpecialistsCreatePage() {
  const navigate = useNavigate({ from: '/app/specialists/create' });
  const queryClient = useQueryClient();
  const { isAuthenticated, isInitialLoading, userData } = useAuth();

  const createMutation = useMutation({
    ...specialistMutationOptions.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: specialistKeys.lists() });
      toast.success('Specialist created successfully');
      navigate({ to: '/app/specialists' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create specialist');
    },
  });

  useEffect(() => {
    if (isInitialLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate({ to: '/auth/login', replace: true });
      return;
    }

    if (userData.role !== UserRole.ADMIN) {
      navigate({ to: '/dashboard', replace: true });
    }
  }, [isAuthenticated, isInitialLoading, navigate, userData.role]);

  if (isInitialLoading) {
    return (
      <div className='flex min-h-60 items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!isAuthenticated || userData.role !== UserRole.ADMIN) {
    return (
      <Card className='rounded-2xl border-destructive/40'>
        <CardContent className='flex min-h-44 flex-col items-center justify-center gap-2 text-center'>
          <ShieldAlert className='size-6 text-destructive' />
          <p className='font-medium'>Only admin can access this page.</p>
          <Button variant='outline' onClick={() => navigate({ to: '/dashboard' })}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Specialists</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Create Specialist</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Add a new specialist category. This action is restricted to administrators.
            </p>
          </div>
        </CardContent>
      </Card>

      <SpecialistForm
        mode='create'
        isSubmitting={createMutation.isPending}
        onSubmit={(payload) => createMutation.mutate(payload)}
      />
    </div>
  );
}
