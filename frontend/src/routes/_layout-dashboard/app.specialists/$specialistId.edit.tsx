import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';

import { SpecialistForm } from '@/modules/specialists/components/specialist-form';
import { specialistKeys } from '@/modules/specialists/specialist.key';
import { specialistMutationOptions } from '@/modules/specialists/specialist.mutation';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

import { hasPermission } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/specialists/$specialistId/edit')({
  component: SpecialistsEditPage,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'update', 'Specialist')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

function SpecialistsEditPage() {
  const navigate = useNavigate({ from: '/app/specialists/$specialistId/edit' });
  const queryClient = useQueryClient();
  const { specialistId } = Route.useParams();

  const specialistQuery = useQuery({
    ...specialistQueryOptions.getById(specialistId),
  });

  const updateMutation = useMutation({
    ...specialistMutationOptions.update(specialistId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: specialistKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: specialistKeys.detail(specialistId) }),
      ]);
      toast.success('Specialist updated successfully');
      navigate({ to: '/app/specialists' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update specialist');
    },
  });

  if (specialistQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load specialist details.</p>
          <Button variant='outline' onClick={() => specialistQuery.refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (specialistQuery.isPending || !specialistQuery.data) {
    return <FallbackSpinner fullscreen />;
  }

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Specialists</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Edit Specialist</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Modify specialist metadata and assets. This action is restricted to administrators.
            </p>
          </div>
        </CardContent>
      </Card>

      <SpecialistForm
        mode='edit'
        initialValue={specialistQuery.data}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />
    </div>
  );
}
