import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { SearchX, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';

import { DoctorForm } from '@/modules/doctors/components/doctor-form';
import { doctorKeys } from '@/modules/doctors/doctor.key';
import { doctorMutationOptions } from '@/modules/doctors/doctor.mutation';
import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { patientQueryOptions } from '@/modules/patients/patient.query';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

import { useAuth } from '@/utils/hooks/use-auth';
import { useDebounce } from '@/utils/hooks/use-debounce';

export const Route = createFileRoute('/_layout-public-nav/profile/join-doctor')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/profile/join-doctor' });
  const queryClient = useQueryClient();
  const { userData } = useAuth();

  const [specialistSearch, setSpecialistSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const debouncedSpecialistSearch = useDebounce(specialistSearch, 350);
  const debouncedCitySearch = useDebounce(citySearch, 350);

  const patientQuery = useQuery(patientQueryOptions.getMyProfile());

  const myDoctorQuery = useQuery({
    ...doctorQueryOptions.me(),
    retry: false,
  });

  const specialistQuery = useQuery({
    ...specialistQueryOptions.list({
      page: 1,
      limit: 10,
      search: debouncedSpecialistSearch,
      category: '',
      isActive: 'true',
      column: 'name',
      sort: 'asc',
    }),
    placeholderData: (previousData) => previousData,
  });

  const citiesQuery = useQuery({
    ...doctorQueryOptions.cities({
      page: 1,
      limit: 10,
      search: debouncedCitySearch,
    }),
    placeholderData: (previousData) => previousData,
  });

  const requestMutation = useMutation({
    ...doctorMutationOptions.request(),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: doctorKeys.me() }),
        queryClient.invalidateQueries({ queryKey: doctorKeys.lists() }),
      ]);
      toast.success('Doctor request submitted successfully');
      await navigate({ to: '/profile' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to submit doctor request');
    },
  });

  const specialistOptions = useMemo(
    () =>
      (specialistQuery.data?.items ?? []).map((specialist) => ({
        value: specialist._id,
        label: specialist.name,
      })),
    [specialistQuery.data?.items],
  );

  const cityOptions = useMemo(
    () =>
      (citiesQuery.data ?? []).map((city) => ({
        value: city,
        label: city,
      })),
    [citiesQuery.data],
  );

  if (patientQuery.isPending || myDoctorQuery.isPending || specialistQuery.isPending || citiesQuery.isPending) {
    return <FallbackSpinner fullscreen />;
  }

  if (patientQuery.isError || specialistQuery.isError || citiesQuery.isError) {
    return (
      <main className='space-y-4 px-4 py-6'>
        <Card className='rounded-3xl border-none shadow-none'>
          <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
            <SearchX className='size-7 text-muted-foreground' />
            <p className='font-semibold'>Unable to load doctor request form.</p>
            <Button
              variant='outline'
              onClick={() => {
                patientQuery.refetch();
                specialistQuery.refetch();
                citiesQuery.refetch();
              }}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const doctorLookupStatus = myDoctorQuery.error?.httpStatus;
  const hasExistingDoctorProfile = !!myDoctorQuery.data;
  const isDoctorLookupUnexpectedError = myDoctorQuery.isError && doctorLookupStatus !== 404;

  return (
    <main className='space-y-4 px-4 py-6'>
      <Card className='rounded-3xl border-none shadow-none'>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-2 text-primary'>
            <Stethoscope className='size-4' />
            <p className='text-xs font-semibold uppercase tracking-[0.12em]'>Doctor Partnership</p>
          </div>
          <h1 className='text-xl font-bold text-gray-900'>Join as a Doctor</h1>
          <p className='text-sm font-medium text-gray-500'>
            Submit your profile and our admin team will review your doctor request.
          </p>
          <Button variant='ghost' className='h-11 w-full rounded-full font-semibold' asChild>
            <Link to='/profile'>Back to Profile</Link>
          </Button>
        </CardContent>
      </Card>

      {isDoctorLookupUnexpectedError ? (
        <Card className='rounded-3xl border-none shadow-none'>
          <CardContent className='space-y-3 text-center'>
            <p className='font-semibold'>Unable to verify your doctor request status.</p>
            <Button variant='outline' onClick={() => myDoctorQuery.refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {hasExistingDoctorProfile ? (
        <Card className='rounded-3xl border-none shadow-none'>
          <CardContent className='space-y-3 text-center'>
            <p className='text-sm font-semibold text-muted-foreground'>Request Status</p>
            <p className='text-lg font-bold text-foreground'>{formatStatusLabel(myDoctorQuery.data.approvalStatus)}</p>
            <p className='text-sm text-muted-foreground'>{statusDescription(myDoctorQuery.data.approvalStatus)}</p>
          </CardContent>
        </Card>
      ) : null}

      {!hasExistingDoctorProfile && !isDoctorLookupUnexpectedError ? (
        <DoctorForm
          mode='create'
          isSubmitting={requestMutation.isPending}
          specialistOptions={specialistOptions}
          cityOptions={cityOptions}
          hideUserSelector
          fixedUserId={userData.id}
          submitLabel='Submit Doctor Request'
          isSpecialistsLoading={specialistQuery.isFetching}
          isCitiesLoading={citiesQuery.isFetching}
          onSpecialistSearchChange={setSpecialistSearch}
          onCitySearchChange={setCitySearch}
          onSubmit={(payload) => requestMutation.mutate(payload)}
        />
      ) : null}
    </main>
  );
}

function formatStatusLabel(status: 'pending' | 'approved' | 'rejected') {
  if (status === 'approved') {
    return 'Approved';
  }

  if (status === 'rejected') {
    return 'Rejected';
  }

  return 'Pending Review';
}

function statusDescription(status: 'pending' | 'approved' | 'rejected') {
  if (status === 'approved') {
    return 'Your profile is approved. You can now continue as a doctor account.';
  }

  if (status === 'rejected') {
    return 'Your previous request was rejected. Please contact admin before resubmitting.';
  }

  return 'Your request is in queue. We will notify you once the review is completed.';
}
