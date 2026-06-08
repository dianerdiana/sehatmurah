import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { listDoctorsSchema } from '@/modules/doctors/doctor.schema';
import { CardDoctor, CardDoctorSkeleton } from '@/modules/public-facing/components/card-doctor';

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

  const debouncedSearch = useDebounce(searchInput, 350);

  const queryDoctors = useQuery({
    ...doctorQueryOptions.list({
      specialist,
      city,
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
    if (debouncedSearch === search) {
      return;
    }

    navigate({
      to: '/doctors/search',
      replace: true,
      search: (previous) => ({
        ...previous,
        search: debouncedSearch,
        page: 1,
      }),
    });
  }, [debouncedSearch, navigate, search]);

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
          <Input
            name='search'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='bg-white rounded-full w-full max-w-md py-5 px-6 focus:ring-2 focus:ring-primary focus:outline-none'
            placeholder='Search doctors...'
          />
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
