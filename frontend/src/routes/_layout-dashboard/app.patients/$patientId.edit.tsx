import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';

import { PatientForm } from '@/modules/patients/components/patient-form';
import { patientKeys } from '@/modules/patients/patient.key';
import { patientMutationOptions } from '@/modules/patients/patient.mutation';
import { patientQueryOptions } from '@/modules/patients/patient.query';

import { hasPermission } from '@/utils/auth/has-permission';

export const Route = createFileRoute('/_layout-dashboard/app/patients/$patientId/edit')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'update', 'PatientProfile')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/app/patients/$patientId/edit' });
  const queryClient = useQueryClient();
  const { patientId } = Route.useParams();

  const patientQuery = useQuery({
    ...patientQueryOptions.getById(patientId),
  });

  const updateMutation = useMutation({
    ...patientMutationOptions.update(patientId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: patientKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: patientKeys.detail(patientId) }),
      ]);
      toast.success('Patient profile updated successfully');
      navigate({ to: '/app/patients' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update patient profile');
    },
  });

  if (patientQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load patient details.</p>
          <Button variant='outline' onClick={() => patientQuery.refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (patientQuery.isPending || !patientQuery.data) {
    return <FallbackSpinner fullscreen />;
  }

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Patients</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Edit Patient</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>Update patient profile and contact information.</p>
          </div>
        </CardContent>
      </Card>

      <PatientForm
        initialValue={patientQuery.data}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />
    </div>
  );
}
