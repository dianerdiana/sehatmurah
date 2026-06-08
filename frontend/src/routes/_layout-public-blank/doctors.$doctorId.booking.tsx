import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { CardDoctor, CardDoctorNotFound, CardDoctorSkeleton } from '@/modules/public-facing/components/card-doctor';
import { FormBookingDoctor } from '@/modules/public-facing/components/form-booking-doctor';

export const Route = createFileRoute('/_layout-public-blank/doctors/$doctorId/booking')({
  component: BookingDoctorPage,
});

function BookingDoctorPage() {
  const router = useRouter();
  const { doctorId } = Route.useParams();

  const queryDoctor = useQuery({
    ...doctorQueryOptions.getById(doctorId),
    enabled: !!doctorId,
  });

  const doctor = queryDoctor.data && queryDoctor.data;

  return (
    <div className='pb-24.5'>
      <header className='h-67 w-full rounded-b-2xl bg-primary px-4 pt-6 lg:pt-12'>
        <div className='flex flex-wrap items-center gap-4'>
          <Button onClick={() => router.history.back()} className='px-0'>
            <img src='/assets/icons/arrow-left-blue.svg' alt='Image' />
          </Button>
          <div className='lg:absolute lg:left-1/2 lg:top-12 lg:-translate-x-1/2 lg:max-w-fit flex flex-col items-center w-full'>
            <h1 className='mb-0.75 whitespace-nowrap text-center text-xl font-bold leading-[25.2px] text-white'>
              Appointment Details
            </h1>
            <h2 className='whitespace-nowrap text-center font-semibold leading-[20.16px] text-primary-light'>
              Set your appointment schedule
            </h2>
          </div>
        </div>
      </header>

      <section id='ContainerCards' className='-mt-32 md:-mt-35 w-full space-y-4 px-4 pb-8'>
        {queryDoctor.isPending ? (
          <CardDoctorSkeleton />
        ) : doctor ? (
          <React.Fragment>
            <CardDoctor doctor={doctor} />
            <FormBookingDoctor
              scheduleOptions={doctor.schedule}
              doctorId={doctor._id}
              consultationFee={doctor.consultationFee}
            />
          </React.Fragment>
        ) : (
          <CardDoctorNotFound />
        )}
      </section>
    </div>
  );
}
