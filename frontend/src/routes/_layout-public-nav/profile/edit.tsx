import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';

import { PatientForm } from '@/modules/patients/components/patient-form';
import { patientKeys } from '@/modules/patients/patient.key';
import { patientMutationOptions } from '@/modules/patients/patient.mutation';
import { patientQueryOptions } from '@/modules/patients/patient.query';

export const Route = createFileRoute('/_layout-public-nav/profile/edit')({
  head: () => ({
    meta: [{ title: 'Edit Profile | Sehatmurah' }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/profile/edit' });
  const queryClient = useQueryClient();

  const patientQuery = useQuery(patientQueryOptions.getMyProfile());

  const updateMutation = useMutation({
    ...patientMutationOptions.updateMyProfile(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: patientKeys.me() });
      toast.success('Profile updated successfully');
      await navigate({ to: '/profile' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    },
  });

  if (patientQuery.isError) {
    return (
      <main className='space-y-4 px-4 py-6'>
        <Card className='rounded-3xl shadow-none border-none'>
          <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
            <SearchX className='size-7 text-muted-foreground' />
            <p className='font-semibold'>Unable to load profile details.</p>
            <Button variant='outline' onClick={() => patientQuery.refetch()}>
              Retry
            </Button>
            <Button variant='ghost' onClick={() => navigate({ to: '/profile' })}>
              Back to Profile
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (patientQuery.isPending || !patientQuery.data) {
    return <FallbackSpinner fullscreen />;
  }

  return (
    <main className='space-y-4 px-4 py-6'>
      <Card className='rounded-3xl shadow-none border-none'>
        <CardContent className='space-y-3'>
          <h1 className='text-xl font-bold text-gray-900'>Edit Profile</h1>
          <p className='text-sm font-medium text-gray-500'>Update your personal and contact information.</p>
          <Button
            variant='ghost'
            className='h-11 w-full rounded-full font-semibold'
            onClick={() => navigate({ to: '/profile' })}
          >
            Back to Profile
          </Button>
        </CardContent>
      </Card>

      <PatientForm
        initialValue={patientQuery.data}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />
    </main>
  );
}
