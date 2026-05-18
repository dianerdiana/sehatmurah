import { Link } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { formatCurrency } from '@/utils/utils';

import type { Doctor } from '@/types/doctor.type';

type CardDoctorProps = {
  doctor: Doctor;
  footer?: boolean;
};

export function CardDoctor({ doctor, footer = false }: CardDoctorProps) {
  return (
    <section key={doctor._id} id={doctor._id} className='space-y-5 rounded-3xl shadow-sm bg-white p-5'>
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
      {footer && (
        <footer className='cardPrice flex items-center justify-between space-x-2'>
          <div>
            <p className='mb-0.5 whitespace-nowrap text-[18px] font-bold leading-[22.68px] text-accent-red'>
              {formatCurrency(doctor.consultationFee)}
            </p>
            <p className='font-semibold leading-[20.16px] text-gray-500'>/hour</p>
          </div>
          <Link
            to={`/doctors/$doctorId/details`}
            params={{ doctorId: doctor._id }}
            className='flex h-13 w-45 items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-bold leading-[20.16px] text-primary'
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
    <div className='space-y-5 rounded-3xl bg-white p-5 animate-pulse'>
      <header className='cardHeader flex items-center gap-x-3'>
        <div className='relative h-30 w-25 shrink-0 rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-200' />

        <div className='space-y-2 w-full'>
          <div className='h-4 w-1/2 rounded bg-gray-300' />
          <div className='h-5 w-3/4 rounded bg-gray-300' />
          <div className='h-4 w-1/3 rounded bg-gray-200' />
        </div>
      </header>

      <div className='cardInfo flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
        <div className='grid w-[80.33px] place-items-center space-y-2'>
          <div className='h-4 w-12 rounded bg-gray-300' />
          <div className='h-3.5 w-14 rounded bg-gray-200' />
        </div>

        <hr className='w-9 rotate-90 border-gray-200' />

        <div className='grid w-[80.33px] place-items-center space-y-2'>
          <div className='h-4 w-14 rounded bg-gray-300' />
          <div className='h-3.5 w-16 rounded bg-gray-200' />
        </div>

        <hr className='w-9 rotate-90 border-gray-200' />

        <div className='grid w-[80.33px] place-items-center space-y-2'>
          <div className='h-4 w-8 rounded bg-gray-300' />
          <div className='h-3.5 w-10 rounded bg-gray-200' />
        </div>
      </div>

      <footer className='cardPrice flex items-center justify-between space-x-2'>
        <div className='space-y-1.5'>
          <div className='h-5 w-20 rounded bg-gray-300' />
          <div className='h-4 w-10 rounded bg-gray-200' />
        </div>

        <div className='h-13 w-45 rounded-[100px] bg-gray-200' />
      </footer>
    </div>
  );
}

export function CardDoctorNotFound() {
  return (
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
  );
}
