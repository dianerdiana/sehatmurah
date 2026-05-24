import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import z from 'zod';

import { Button } from '@/components/ui/button';

import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { CardDoctor, CardDoctorSkeleton } from '@/modules/public-facing/components/card-doctor';

const searchParamsSchema = z.object({
  specialist: z.string().optional(),
  city: z.string().optional(),
});

export const Route = createFileRoute('/_layout-public-blank/doctors/search')({
  component: DoctorsSearchPage,
  validateSearch: searchParamsSchema,
});

function DoctorsSearchPage() {
  const router = useRouter();
  const { specialist, city } = Route.useSearch();

  const queryDoctors = useQuery({
    ...doctorQueryOptions.list({ specialist, city, limit: 10, page: 1, search: '' }),
    enabled: Boolean(specialist !== undefined || city !== undefined),
    placeholderData: {
      items: [],
      meta: {},
    },
  });

  const doctors = queryDoctors.data && queryDoctors.data.items;

  return (
    <>
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
      </header>
      <section id='ContainerCards' className='-mt-35 w-full space-y-4 px-4'>
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
    </>
  );
}
