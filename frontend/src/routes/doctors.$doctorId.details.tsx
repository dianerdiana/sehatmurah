import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

import { PublicBlankLayout } from '@/layouts/public-blank-layout';
import { CardAvailableSchedule } from '@/modules/public-facing/components/card-available-schedule';
import { CardDoctor, CardDoctorNotFound, CardDoctorSkeleton } from '@/modules/public-facing/components/card-doctor';
import { CardDoctorPracticeLocation } from '@/modules/public-facing/components/card-doctor-location';
import { CardDoctorReviews } from '@/modules/public-facing/components/card-doctor-reviews';
import { FixedBookingCta } from '@/modules/public-facing/components/fixed-booking-cta';
import { doctorQueries } from '@/queries/doctor.query';

export const Route = createFileRoute('/doctors/$doctorId/details')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { doctorId } = Route.useParams();

  const { data: doctor, isPending } = useQuery({
    ...doctorQueries.getById(doctorId),
    enabled: !!doctorId,
  });

  const { data: reviews } = useQuery({
    ...doctorQueries.getDoctorReviews(doctorId),
    placeholderData: [],
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
            Doctor Details
          </h1>
          <h2 className='whitespace-nowrap text-center font-semibold leading-[20.16px] text-primary-light'>
            We provide top doctors.
          </h2>
        </div>
      </header>

      <section id='ContainerCards' className='-mt-35 w-full space-y-4 px-4 pb-8'>
        {isPending ? (
          <CardDoctorSkeleton />
        ) : doctor ? (
          <React.Fragment>
            <CardDoctor doctor={doctor} />
            <CardAvailableSchedule schedules={doctor.schedule} />
            <CardDoctorPracticeLocation practiceLocation={doctor.practiceLocation} />
            <FixedBookingCta
              fee={doctor.consultationFee}
              continueTo={`/doctors/${doctor._id}/booking`}
              label='Book Now'
            />
            <CardDoctorReviews reviews={reviews ? reviews : []} />
          </React.Fragment>
        ) : (
          <CardDoctorNotFound />
        )}
      </section>
    </PublicBlankLayout>
  );
}
