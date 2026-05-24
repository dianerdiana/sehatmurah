import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

import { PublicBlankLayout } from '@/layouts/public-blank-layout';

import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { CardDoctor, CardDoctorNotFound, CardDoctorSkeleton } from '@/modules/public-facing/components/card-doctor';
import { FixedBookingCta } from '@/modules/public-facing/components/fixed-booking-cta';
import { FormBookingDoctor } from '@/modules/public-facing/components/form-booking-doctor';

export const Route = createFileRoute('/doctors/$doctorId/booking')({
  component: BookingDoctorPage,
});

function BookingDoctorPage() {
  const router = useRouter();
  const { doctorId } = Route.useParams();

  const { data: doctor, isPending } = useQuery({
    ...doctorQueryOptions.getById(doctorId),
    enabled: !!doctorId,
  });

  return (
    <PublicBlankLayout>
      <header className='h-67 w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <Button onClick={() => router.history.back()}>
          <img src='/assets/icons/arrow-left-blue.svg' alt='Image' />
        </Button>
        <div className='absolute left-1/2 top-12 -translate-x-1/2'>
          <h1 className='mb-0.75 whitespace-nowrap text-center text-xl font-bold leading-[25.2px] text-white'>
            Appointment Details
          </h1>
          <h2 className='whitespace-nowrap text-center font-semibold leading-[20.16px] text-primary-light'>
            Set your appointment schedule
          </h2>
        </div>
      </header>

      <section id='ContainerCards' className='-mt-35 w-full space-y-4 px-4 pb-8'>
        {isPending ? (
          <CardDoctorSkeleton />
        ) : doctor ? (
          <React.Fragment>
            <CardDoctor doctor={doctor} />
            <FixedBookingCta
              fee={doctor.consultationFee}
              continueTo={`/doctors/${doctor._id}/booking`}
              label='Continue'
            />
            <FormBookingDoctor scheduleOptions={doctor.schedule} doctorId={doctor._id} />
          </React.Fragment>
        ) : (
          <CardDoctorNotFound />
        )}
      </section>
    </PublicBlankLayout>
  );
}
