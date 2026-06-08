import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DoctorForm } from '@/modules/doctors/components/doctor-form';
import { DoctorScheduleForm } from '@/modules/doctors/components/doctor-schedule-form';
import { doctorKeys } from '@/modules/doctors/doctor.key';
import { doctorMutationOptions } from '@/modules/doctors/doctor.mutation';
import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

import { hasPermissionPage } from '@/utils/auth/has-permission';
import { useDebounce } from '@/utils/hooks/use-debounce';

export const Route = createFileRoute('/_layout-dashboard/app/doctors/$doctorId/edit')({
  component: DoctorsEditPage,
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'update', 'DoctorProfile');
  },
});

function DoctorsEditPage() {
  const navigate = useNavigate({ from: '/app/doctors/$doctorId/edit' });
  const queryClient = useQueryClient();
  const { doctorId } = Route.useParams();

  const [specialistSearch, setSpecialistSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const debouncedSpecialistSearch = useDebounce(specialistSearch, 350);
  const debouncedCitySearch = useDebounce(citySearch, 350);

  const doctorQuery = useQuery({
    ...doctorQueryOptions.getById(doctorId),
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

  const updateMutation = useMutation({
    ...doctorMutationOptions.update(doctorId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: doctorKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: doctorKeys.detail(doctorId) }),
      ]);
      toast.success('Doctor profile updated successfully');
      navigate({ to: '/app/doctors' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update doctor profile');
    },
  });

  const updateScheduleMutation = useMutation({
    ...doctorMutationOptions.updateSchedule(doctorId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: doctorKeys.lists() }),
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

  if (doctorQuery.isError || specialistQuery.isError || citiesQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load doctor details.</p>
          <Button
            variant='outline'
            onClick={() => {
              doctorQuery.refetch();
              specialistQuery.refetch();
              citiesQuery.refetch();
            }}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (doctorQuery.isPending || specialistQuery.isPending || citiesQuery.isPending || !doctorQuery.data) {
    return <FallbackSpinner fullscreen />;
  }

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Doctors</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Edit Doctor</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Update doctor profile details and replace profile photo when needed.
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
            isSubmitting={updateMutation.isPending}
            specialistOptions={specialistOptions}
            cityOptions={cityOptions}
            isSpecialistsLoading={specialistQuery.isFetching}
            isCitiesLoading={citiesQuery.isFetching}
            onSpecialistSearchChange={setSpecialistSearch}
            onCitySearchChange={setCitySearch}
            onSubmit={(payload) => updateMutation.mutate(payload)}
          />
        </TabsContent>
        <TabsContent value='schedule'>
          <DoctorScheduleForm
            initialSchedule={doctorQuery.data.schedule}
            isSubmitting={updateScheduleMutation.isPending}
            title='Edit Doctor Schedule'
            description='Manage doctor availability in row-based time slots.'
            submitLabel='Save Schedule'
            onSubmit={(payload) => updateScheduleMutation.mutate(payload)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
