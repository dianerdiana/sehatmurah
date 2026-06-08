import { Link } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ImageServer } from '@/components/ui/image-server';

import type { Doctor } from '@/modules/doctors/doctor.type';

import { formatCurrency } from '@/utils/utils';

type CardDoctorProps = {
  doctor: Doctor;
  footer?: boolean;
};

export function CardDoctor({ doctor, footer = false }: CardDoctorProps) {
  return (
    <section key={doctor._id} id={doctor._id} className='relative space-y-5 rounded-3xl bg-white p-4 shadow-sm sm:p-5'>
      <Badge variant='primary' className='absolute top-4 right-4'>
        {doctor.practiceLocation.city}
      </Badge>

      <header className='cardHeader flex items-start gap-3 sm:items-center sm:gap-x-3'>
        <div className='relative h-24 w-20 shrink-0 sm:h-30 sm:w-25'>
          <ImageServer
            className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
            src={doctor.profilePhoto}
            alt='Image'
          />
          <span className='absolute left-2 top-2 size-2 rounded-full bg-green-500 shadow' />
        </div>
        <div className='min-w-0 space-y-1.5 sm:space-y-2'>
          <h3 className='font-bold leading-[20.16px] text-primary'>{doctor.practiceLocation.clinicName}</h3>
          <h2 className='text-base font-bold leading-[22.68px] text-gray-900 sm:text-lg'>{doctor.fullName}</h2>
          <p className='text-sm font-semibold leading-[20.16px] text-gray-500 sm:text-base'>
            {doctor.specialist.name} Specialist
          </p>
        </div>
      </header>
      <div className='cardInfo grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 p-3 sm:flex sm:items-center sm:justify-evenly sm:py-4'>
        <div className='grid place-items-center text-center sm:w-[80.33px]'>
          <div className='mb-1 flex items-center gap-0.5'>
            <img src='/assets/icons/searchresult-verify.svg' alt='Icon' />
            <h4 className='text-sm font-bold leading-[20.16px] text-gray-900 sm:text-base'>Verify</h4>
          </div>
          <p className='text-xs font-semibold leading-[17.64px] text-gray-500 sm:text-sm'>Certified</p>
        </div>
        <hr className='hidden w-9 rotate-90 border-gray-200 sm:block' />
        <div className='grid place-items-center text-center sm:w-[80.33px]'>
          <div className='mb-1 flex items-center gap-0.5 whitespace-nowrap'>
            <img src='/assets/icons/searchresult-5-years.svg' alt='Icon' />
            <h4 className='text-sm font-bold leading-[20.16px] text-gray-900 sm:text-base'>
              {doctor.experienceYears} Years
            </h4>
          </div>
          <p className='text-xs font-semibold leading-[17.64px] text-gray-500 sm:text-sm'>Experience</p>
        </div>
        <hr className='hidden w-9 rotate-90 border-gray-200 sm:block' />
        <div className='grid place-items-center text-center sm:w-[80.33px]'>
          <div className='mb-1 flex items-center gap-0.5'>
            <img src='/assets/icons/searchresult-4.5.svg' alt='Icon' />
            <h4 className='text-sm font-bold leading-[20.16px] text-gray-900 sm:text-base'>{doctor.ratingAverage}</h4>
          </div>
          <p className='text-xs font-semibold leading-[17.64px] text-gray-500 sm:text-sm'>Rating</p>
        </div>
      </div>
      {footer && (
        <footer className='cardPrice flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-2'>
          <div>
            <p className='mb-0.5 whitespace-nowrap text-[18px] font-bold leading-[22.68px] text-accent-red'>
              {formatCurrency(doctor.consultationFee)}
            </p>
            <p className='text-sm font-semibold leading-[20.16px] text-gray-500'>/hour</p>
          </div>
          <Link
            to={`/doctors/$doctorId/details`}
            params={{ doctorId: doctor._id }}
            className='flex h-12 w-full items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-bold leading-[20.16px] text-primary sm:w-45 sm:h-13'
          >
            Book Now
          </Link>
        </footer>
      )}
    </section>
  );
}

export function CardDoctorSkeleton() {
  return (
    <div className='space-y-5 rounded-3xl bg-white p-4 animate-pulse sm:p-5'>
      <header className='cardHeader flex items-start gap-3 sm:items-center sm:gap-x-3'>
        <div className='relative h-24 w-20 shrink-0 rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-200 sm:h-30 sm:w-25' />

        <div className='w-full space-y-2'>
          <div className='h-4 w-1/2 rounded bg-gray-300' />
          <div className='h-5 w-3/4 rounded bg-gray-300' />
          <div className='h-4 w-1/3 rounded bg-gray-200' />
        </div>
      </header>

      <div className='cardInfo grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 p-3 sm:flex sm:items-center sm:justify-evenly sm:py-4'>
        <div className='grid place-items-center space-y-2 text-center sm:w-[80.33px]'>
          <div className='h-4 w-12 rounded bg-gray-300' />
          <div className='h-3.5 w-14 rounded bg-gray-200' />
        </div>

        <hr className='hidden w-9 rotate-90 border-gray-200 sm:block' />

        <div className='grid place-items-center space-y-2 text-center sm:w-[80.33px]'>
          <div className='h-4 w-14 rounded bg-gray-300' />
          <div className='h-3.5 w-16 rounded bg-gray-200' />
        </div>

        <hr className='hidden w-9 rotate-90 border-gray-200 sm:block' />

        <div className='grid place-items-center space-y-2 text-center sm:w-[80.33px]'>
          <div className='h-4 w-8 rounded bg-gray-300' />
          <div className='h-3.5 w-10 rounded bg-gray-200' />
        </div>
      </div>

      <footer className='cardPrice flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-2'>
        <div className='space-y-1.5'>
          <div className='h-5 w-20 rounded bg-gray-300' />
          <div className='h-4 w-10 rounded bg-gray-200' />
        </div>

        <div className='h-12 w-full rounded-[100px] bg-gray-200 sm:h-13 sm:w-45' />
      </footer>
    </div>
  );
}

export function CardDoctorNotFound() {
  return (
    <div className='flex min-h-87.5 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-6 text-center sm:p-8'>
      <div className='mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400'>
        <SearchX className='size-8 text-gray-400' />
      </div>

      <h3 className='text-xl font-bold leading-7 text-gray-900'>No Doctors Found</h3>
      <p className='mt-2 max-w-sm text-base font-medium leading-relaxed text-gray-500'>
        We couldn't find any doctors matching your criteria. Try adjusting your search filters or exploring other
        specialties.
      </p>
    </div>
  );
}
