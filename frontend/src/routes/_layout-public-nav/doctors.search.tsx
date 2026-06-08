import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { listDoctorsSchema } from '@/modules/doctors/doctor.schema';
import { CardDoctor, CardDoctorSkeleton } from '@/modules/public-facing/components/card-doctor';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

import { useDebounce } from '@/utils/hooks/use-debounce';

export const Route = createFileRoute('/_layout-public-nav/doctors/search')({
  component: DoctorsSearchPage,
  validateSearch: listDoctorsSchema,
});

function DoctorsSearchPage() {
  const router = useRouter();
  const navigate = useNavigate({ from: '/doctors/search' });
  const { specialist, city, search } = Route.useSearch();
  const [searchInput, setSearchInput] = React.useState(search ?? '');
  const [specialistInput, setSpecialistInput] = React.useState(specialist ?? '');
  const [cityInput, setCityInput] = React.useState(city ?? '');

  const debouncedSearch = useDebounce(searchInput, 350);
  const debouncedSpecialist = useDebounce(specialistInput, 350);
  const debouncedCity = useDebounce(cityInput, 350);

  const querySpecialists = useQuery(specialistQueryOptions.list({ limit: 100, page: 1, isActive: 'true' }));
  const queryCities = useQuery(doctorQueryOptions.cities());

  const queryDoctors = useQuery({
    ...doctorQueryOptions.list({
      specialist: debouncedSpecialist,
      city: debouncedCity,
      limit: 10,
      page: 1,
      search: debouncedSearch,
      status: 'approved',
      column: 'fullName',
      sort: 'asc',
    }),
  });

  const doctors = queryDoctors.data?.items ?? [];

  useEffect(() => {
    if (debouncedSearch === search && debouncedSpecialist === specialist && debouncedCity === city) {
      return;
    }

    navigate({
      to: '/doctors/search',
      replace: true,
      search: (previous) => ({
        ...previous,
        search: debouncedSearch,
        specialist: debouncedSpecialist,
        city: debouncedCity,
        page: 1,
      }),
    });
  }, [debouncedCity, debouncedSearch, debouncedSpecialist, city, navigate, search, specialist]);

  return (
    <div className='pb-8'>
      <header className='h-67 w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <Button onClick={() => router.history.back()}>
          <img src='/assets/icons/arrow-left-blue.svg' alt='Image' />
        </Button>
        <div className='absolute left-1/2 top-12 -translate-x-1/2'>
          <h1 className='mb-0.75 whitespace-nowrap text-center text-xl font-bold leading-[25.2px] text-white'>
            Recommended Doctors
          </h1>
          <h2 className='whitespace-nowrap text-center font-semibold leading-[20.16px] text-primary-light'>
            {city}
            <span className='mx-1.5'>•</span>
            {specialist} Specialist
          </h2>
        </div>
        <div className='mt-4 flex items-center justify-center px-4'>
          <div className='flex flex-wrap w-full space-y-3 gap-3'>
            <div className='max-w-lg flex-1'>
              <Input
                name='search'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='w-full rounded-full bg-white px-6 py-5 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Search doctors...'
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <Select
                value={specialistInput || 'all'}
                onValueChange={(value) => setSpecialistInput(value === 'all' ? '' : value)}
              >
                <SelectTrigger className='py-5 rounded-full bg-white px-4 font-medium text-gray-500'>
                  <SelectValue placeholder='All specialists' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All specialists</SelectItem>
                  {querySpecialists.data?.items.map((item) => (
                    <SelectItem key={item._id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={cityInput || 'all'} onValueChange={(value) => setCityInput(value === 'all' ? '' : value)}>
                <SelectTrigger className='py-5 rounded-full bg-white px-4 font-medium text-gray-500'>
                  <SelectValue placeholder='All cities' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All cities</SelectItem>
                  {queryCities.data?.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>
      <section id='ContainerCards' className='-mt-26 w-full space-y-4 px-4'>
        {queryDoctors.isPending ? (
          <CardDoctorSkeleton />
        ) : doctors && doctors.length ? (
          doctors.map((doctor) => <CardDoctor doctor={doctor} key={doctor._id} footer />)
        ) : (
          <div className='flex min-h-87.5 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-5'>
              <SearchX className='size-8 text-gray-400' />
            </div>

            <h3 className='text-xl font-bold leading-7 text-gray-900'>No Doctors Found</h3>
            <p className='mt-2 max-w-sm text-base font-medium leading-relaxed text-gray-500'>
              We couldn't find any doctors matching your criteria. Try adjusting your search filters or exploring other
              specialties.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
