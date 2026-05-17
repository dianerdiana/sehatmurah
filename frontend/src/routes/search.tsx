import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

import { formatCurrency } from '@/lib/utils';

import { PublicBlankLayout } from '@/layouts/public-blank-layout';
import { PublicFacingLayout } from '@/layouts/public-facing-layout';
import { FormSearchDoctor } from '@/modules/public-facing/components/form-search-doctor';
import { getDoctors } from '@/modules/public-facing/public-facing.api';

const searchParamsSchema = z.object({
  specialist: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
});

export const Route = createFileRoute('/search')({
  component: DoctorsSearchPage,
  validateSearch: searchParamsSchema,
});

function DoctorsSearchPage() {
  const { specialist, city } = Route.useSearch();

  const { data } = useQuery({
    queryKey: ['doctors', specialist, city],
    queryFn: () => getDoctors({ specialist, city }),
  });

  if (!specialist || !city) {
    return (
      <PublicFacingLayout>
        <FormSearchDoctor />
      </PublicFacingLayout>
    );
  }

  return (
    <PublicBlankLayout>
      <header className='h-67 w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <a href='doctor-search'>
          <img src='/assets/icons/arrow-left-blue.svg' alt='Image' />
        </a>
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
        {data && data.status === 'success' && data.data.length
          ? data.data.map((doctor) => (
              <article id='Card1' className='space-y-5 rounded-3xl bg-white p-5'>
                <header className='cardHeader flex items-center gap-x-3'>
                  <div className='relative h-30 w-25'>
                    <img
                      className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
                      src={doctor.profilePhoto}
                      alt='Image'
                    />
                    <img className='absolute left-2 top-2' src='/assets/icons/alert-online.svg' alt='Icon' />
                  </div>
                  <div className='space-y-2'>
                    <h3 className='font-bold leading-[20.16px] text-primary'>{doctor.practiceLocation.clinicName}</h3>
                    <h2 className='text-lg font-bold leading-[22.68px] text-gray-900'>{doctor.fullName}</h2>
                    <p className='font-semibold leading-[20.16px] text-gray-500'>{doctor.specialist.name} Specialist</p>
                  </div>
                </header>
                <div className='cardInfo flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
                  <div className='grid w-[80.33px] place-items-center'>
                    <div className='mb-1 flex gap-0.5'>
                      <img src='/assets/icons/searchresult-verify.svg' alt='Icon' />
                      <h4 className='font-bold leading-[20.16px] text-gray-900'>Verify</h4>
                    </div>
                    <p className='text-sm font-semibold leading-[17.64px] text-gray-500'>Certified</p>
                  </div>
                  <hr className='w-9 rotate-90 border-gray-200' />
                  <div className='grid w-[80.33px] place-items-center'>
                    <div className='mb-1 flex gap-0.5 whitespace-nowrap'>
                      <img src='/assets/icons/searchresult-5-years.svg' alt='Icon' />
                      <h4 className='font-bold leading-[20.16px] text-gray-900'>{doctor.experienceYears} Years</h4>
                    </div>
                    <p className='text-sm font-semibold leading-[17.64px] text-gray-500'>Experience</p>
                  </div>
                  <hr className='w-9 rotate-90 border-gray-200' />
                  <div className='grid w-[80.33px] place-items-center'>
                    <div className='mb-1 flex gap-0.5'>
                      <img src='/assets/icons/searchresult-4.5.svg' alt='Icon' />
                      <h4 className='font-bold leading-[20.16px] text-gray-900'>{doctor.ratingAverage}</h4>
                    </div>
                    <p className='text-sm font-semibold leading-[17.64px] text-gray-500'>Rating</p>
                  </div>
                </div>
                <footer className='cardPrice flex items-center justify-between space-x-2'>
                  <div>
                    <p className='mb-0.5 whitespace-nowrap text-[18px] font-bold leading-[22.68px] text-accent-red'>
                      {formatCurrency(doctor.consultationFee)}
                    </p>
                    <p className='font-semibold leading-[20.16px] text-gray-500'>/hour</p>
                  </div>
                  <a
                    href='doctor-details'
                    className='flex h-13 w-45 items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-bold leading-[20.16px] text-primary'
                  >
                    Book Now
                  </a>
                </footer>
              </article>
            ))
          : 'not found'}
      </section>
    </PublicBlankLayout>
  );
}
