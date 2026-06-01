import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Loader2, SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DoctorForm } from '@/modules/doctors/components/doctor-form';
import { DoctorScheduleForm } from '@/modules/doctors/components/doctor-schedule-form';
import { doctorKeys } from '@/modules/doctors/doctor.key';
import { doctorMutationOptions } from '@/modules/doctors/doctor.mutation';
import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

import { hasPermission } from '@/utils/auth/has-permission';
import { useDebounce } from '@/utils/hooks/use-debounce';

export const Route = createFileRoute('/_layout-dashboard/settings/doctors/schedule')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.ability, 'update', 'DoctorProfile')) {
      throw redirect({ to: '/not-found' });
    }
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const [specialistSearch, setSpecialistSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const debouncedSpecialistSearch = useDebounce(specialistSearch, 350);
  const debouncedCitySearch = useDebounce(citySearch, 350);

  const doctorQuery = useQuery({
    ...doctorQueryOptions.me(),
  });
  const doctorId = doctorQuery.data?._id ?? '';

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
    placeholderData: (prev) => prev,
  });

  const citiesQuery = useQuery({
    ...doctorQueryOptions.cities({
      page: 1,
      limit: 10,
      search: debouncedCitySearch,
    }),
    placeholderData: (prev) => prev,
  });

  const updateProfileMutation = useMutation({
    ...doctorMutationOptions.update(doctorId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: doctorKeys.me() }),
        queryClient.invalidateQueries({ queryKey: doctorKeys.detail(doctorId) }),
        queryClient.invalidateQueries({ queryKey: doctorKeys.lists() }),
      ]);
      toast.success('Doctor profile updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update doctor profile');
    },
  });

  const updateScheduleMutation = useMutation({
    ...doctorMutationOptions.updateSchedule(doctorId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: doctorKeys.me() }),
        queryClient.invalidateQueries({ queryKey: doctorKeys.detail(doctorId) }),
      ]);
      toast.success('Doctor schedule updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update doctor schedule');
    },
  });

  const specialistOptions = useMemo(() => {
    if (!doctorQuery.data) return [];

    const fetchedOptions = (specialistQuery.data?.items ?? []).map((specialist) => ({
      value: specialist._id,
      label: specialist.name,
    }));

    const currentOption = {
      value: doctorQuery.data.specialist._id,
      label: doctorQuery.data.specialist.name,
    };

    if (fetchedOptions.some((item) => item.value === currentOption.value)) {
      return fetchedOptions;
    }

    return [currentOption, ...fetchedOptions];
  }, [doctorQuery.data, specialistQuery.data?.items]);

  const cityOptions = useMemo(() => {
    if (!doctorQuery.data) return [];

    const fetchedOptions = (citiesQuery.data ?? []).map((city) => ({
      value: city,
      label: city,
    }));

    const currentCity = doctorQuery.data.practiceLocation.city;

    if (fetchedOptions.some((item) => item.value === currentCity)) {
      return fetchedOptions;
    }

    return [{ value: currentCity, label: currentCity }, ...fetchedOptions];
  }, [citiesQuery.data, doctorQuery.data]);

  if (doctorQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load doctor details.</p>
          <Button variant='outline' onClick={() => doctorQuery.refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (doctorQuery.isPending || !doctorQuery.data) {
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
            <p className='text-sm font-medium text-muted-foreground'>Settings</p>
            <h1 className='text-2xl font-semibold tracking-tight'>My Doctor Settings</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Update your doctor profile details and manage your appointment schedule.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue='profile'>
        <TabsList>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='schedule'>Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value='profile'>
          <DoctorForm
            mode='edit'
            initialValue={doctorQuery.data}
            isSubmitting={updateProfileMutation.isPending}
            specialistOptions={specialistOptions}
            cityOptions={cityOptions}
            isSpecialistsLoading={specialistQuery.isFetching}
            isCitiesLoading={citiesQuery.isFetching}
            onSpecialistSearchChange={setSpecialistSearch}
            onCitySearchChange={setCitySearch}
            onSubmit={(payload) => updateProfileMutation.mutate(payload)}
          />
        </TabsContent>

        <TabsContent value='schedule'>
          <DoctorScheduleForm
            initialSchedule={doctorQuery.data.schedule}
            isSubmitting={updateScheduleMutation.isPending}
            title='My Doctor Schedule'
            description='Update your weekly availability for patient appointments.'
            submitLabel='Save My Schedule'
            onSubmit={(payload) => updateScheduleMutation.mutate(payload)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
