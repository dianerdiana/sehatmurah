import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Loader2, SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { DoctorForm } from '@/modules/doctors/components/doctor-form';
import { doctorKeys } from '@/modules/doctors/doctor.key';
import { doctorMutationOptions } from '@/modules/doctors/doctor.mutation';
import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';
import { userQueryOptions } from '@/modules/users/user.query';

import { useDebounce } from '@/utils/hooks/use-debounce';

import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-dashboard/app/doctors/create')({
  component: DoctorsCreatePage,
});

function DoctorsCreatePage() {
  const navigate = useNavigate({ from: '/app/doctors/create' });
  const queryClient = useQueryClient();

  const [specialistSearch, setSpecialistSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const debouncedSpecialistSearch = useDebounce(specialistSearch, 350);
  const debouncedUserSearch = useDebounce(userSearch, 350);
  const debouncedCitySearch = useDebounce(citySearch, 350);

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
  });

  const usersQuery = useQuery({
    ...userQueryOptions.list({
      page: 1,
      limit: 10,
      search: debouncedUserSearch,
      role: 'all',
      isActive: 'true',
      column: 'name',
      sort: 'asc',
    }),
  });

  const doctorsQuery = useQuery({
    ...doctorQueryOptions.list({
      page: 1,
      limit: 10,
      search: '',
      specialist: '',
      city: '',
      isAvailable: 'all',
      column: 'createdAt',
      sort: 'desc',
    }),
  });

  const citiesQuery = useQuery({
    ...doctorQueryOptions.cities({
      page: 1,
      limit: 10,
      search: debouncedCitySearch,
    }),
  });

  const createMutation = useMutation({
    ...doctorMutationOptions.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
      toast.success('Doctor profile created successfully');
      navigate({ to: '/app/doctors' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create doctor profile');
    },
  });

  const availableUserOptions = useMemo(() => {
    const users = usersQuery.data?.items ?? [];
    const doctorUserIds = new Set((doctorsQuery.data?.items ?? []).map((doctor) => doctor.user));

    return users
      .filter(
        (user) => (user.role === UserRole.PATIENT || user.role === UserRole.ADMIN) && !doctorUserIds.has(user._id),
      )
      .map((user) => ({
        value: user._id,
        label: `${user.name} (${user.email})`,
      }));
  }, [usersQuery.data?.items, doctorsQuery.data?.items]);

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

  if (specialistQuery.isError || usersQuery.isError || doctorsQuery.isError || citiesQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load doctor form data.</p>
          <Button
            variant='outline'
            onClick={() => {
              specialistQuery.refetch();
              usersQuery.refetch();
              doctorsQuery.refetch();
              citiesQuery.refetch();
            }}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (specialistQuery.isPending || usersQuery.isPending || doctorsQuery.isPending || citiesQuery.isPending) {
    return (
      <div className='flex min-h-60 items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Doctors</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Create Doctor</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Create a doctor profile from an existing active account and upload profile photo.
            </p>
          </div>
        </CardContent>
      </Card>

      <DoctorForm
        mode='create'
        isSubmitting={createMutation.isPending}
        specialistOptions={specialistOptions}
        cityOptions={cityOptions}
        availableUserOptions={availableUserOptions}
        isSpecialistsLoading={specialistQuery.isFetching}
        isUsersLoading={usersQuery.isFetching}
        isCitiesLoading={citiesQuery.isFetching}
        onSpecialistSearchChange={setSpecialistSearch}
        onUserSearchChange={setUserSearch}
        onCitySearchChange={setCitySearch}
        onSubmit={(payload) => createMutation.mutate(payload)}
      />
    </div>
  );
}
