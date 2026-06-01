import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';

import { SpecialistForm } from '@/modules/specialists/components/specialist-form';
import { specialistKeys } from '@/modules/specialists/specialist.key';
import { specialistMutationOptions } from '@/modules/specialists/specialist.mutation';

import { hasPermission } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/specialists/create')({
  component: SpecialistsCreatePage,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'create', 'Specialist')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

function SpecialistsCreatePage() {
  const navigate = useNavigate({ from: '/app/specialists/create' });
  const queryClient = useQueryClient();

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
