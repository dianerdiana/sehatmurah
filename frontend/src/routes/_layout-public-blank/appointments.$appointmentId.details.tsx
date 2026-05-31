import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Loader2, SearchX } from 'lucide-react';

import { ImageServer } from '@/components/ui/image-server';
import { Button } from '@/components/ui/button';

import { appointmentQueryOptions } from '@/modules/appointments/appointment.query';
import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import { CardDoctorPracticeLocation } from '@/modules/public-facing/components/card-doctor-location';

import { getPartyId, getPartyName } from '@/utils/appointment-party';
import { cn, formatAppointmentDate, formatAppointmentTime } from '@/utils/utils';

import { AppointmentStatus } from '@/types/enums/appointment-status.enum';

export const Route = createFileRoute('/_layout-public-blank/appointments/$appointmentId/details')({
  component: BookingAppointmentSuccess,
});

const appointmentColors = {
  [AppointmentStatus.PENDING]: 'bg-accent-cream',
  [AppointmentStatus.CONFIRMED]: 'bg-emerald-400',
  [AppointmentStatus.COMPLETED]: 'bg-primary',
  [AppointmentStatus.CANCELLED]: 'bg-accent-red',
};

const appointmentStatusDescriptions = {
  [AppointmentStatus.PENDING]: 'Waiting for confirmation',
  [AppointmentStatus.CONFIRMED]: 'Your schedule has been confirmed',
  [AppointmentStatus.COMPLETED]: 'Your appointment has been completed',
  [AppointmentStatus.CANCELLED]: 'This appointment has been cancelled',
};

function AppointmentNotFound() {
  return (
    <div className='px-4 py-8 flex items-center min-h-screen'>
      <section className='w-full rounded-3xl bg-background py-8'>
        <div className='flex min-h-87.5 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center'>
          <div className='mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400'>
            <SearchX className='size-8 text-gray-400' />
          </div>

          <h2 className='text-xl font-bold leading-7 text-gray-900'>Appointment Not Found</h2>
          <p className='mt-2 max-w-sm text-base font-medium leading-relaxed text-gray-500'>
            We couldn't load this appointment detail. Please try another booking or go back to the homepage.
          </p>

          <Button className='mt-6 rounded-full px-6 py-6 text-base font-semibold' asChild>
            <Link to='/'>Back to Homepage</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function BookingAppointmentSuccess() {
  const { appointmentId } = Route.useParams();
  const appointmentQuery = useQuery(appointmentQueryOptions.getById(appointmentId));
  const doctorId = getPartyId(appointmentQuery.data?.doctor);
  const doctorQuery = useQuery({
    ...doctorQueryOptions.getById(doctorId ?? ''),
    enabled: !!doctorId,
  });

  const appointment = appointmentQuery.data ? appointmentQuery.data : null;
  const doctor = doctorQuery.data ? doctorQuery.data : null;
  const isLoading = appointmentQuery.isPending || (!!doctorId && doctorQuery.isPending);

  if (isLoading) {
    return (
      <div className='flex min-h-60 items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (appointmentQuery.isError || doctorQuery.isError || !appointment || !doctor) {
    return <AppointmentNotFound />;
  }

  return (
    <div className='pb-24'>
      <header className='h-69.25 w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <h1 className='mb-0.75 whitespace-nowrap text-center text-xl font-bold leading-[25.2px] text-white'>
          Booking Details
        </h1>
        <p className='whitespace-nowrap text-center font-semibol text-base leading-[20.16px] text-primary-light'>
          {appointmentStatusDescriptions[appointment?.status || AppointmentStatus.PENDING]}
        </p>
      </header>
      <section id='ContainertDetails' className='-mt-37.25 w-full space-y-4 pb-4'>
        <section id='DetailsAppointment' className='mx-4 overflow-hidden rounded-3xl'>
          <div
            className={cn(
              'alert -mb-5.5 flex items-center gap-x-3 px-5 pb-11.5 pt-6',
              appointmentColors[appointment?.status || AppointmentStatus.PENDING],
            )}
          >
            <img
              src={`/assets/icons/futureappointment-alert-${appointment?.status === AppointmentStatus.PENDING ? 'pending' : 'succes'}.svg`}
              alt='Icon'
            />
            <div>
              <h2 className='mb-1 text-xl font-bold capitalize leading-[25.2px] text-gray-900'>
                Your Appointment Is {appointment?.status}
              </h2>
              <p className='font-semibold leading-[20.16px] text-accent-gold'>
                {appointment?.status === AppointmentStatus.PENDING
                  ? 'We’re verifying your appointment'
                  : `Your appointment is ${appointment?.status}`}
              </p>
            </div>
          </div>
          <div className='details-appointment rounded-3xl bg-white p-5'>
            <h2 className='mb-4 text-xl font-bold leading-[25.2px] text-gray-900'>Details Appointment</h2>
            <div className='mb-4 w-full space-y-4 rounded-3xl border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='mb-0.5 text-lg font-bold leading-[22.68px] text-gray-900'>
                    {formatAppointmentDate(appointment?.appointmentDate)}
                  </h3>
                  <p className='font-semibold leading-[20.16px] text-gray-500'>Doctor Available</p>
                </div>
                <img src='/assets/icons/doctordetails-doctor-available.svg' alt='Icon' />
              </div>
              <hr className='w-full border-gray-200' />
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='mb-0.5 text-lg font-bold leading-[22.68px] text-gray-900'>
                    {formatAppointmentTime(appointment?.startTime)}
                  </h3>
                  <p className='font-semibold leading-[20.16px] text-gray-500'>Appointment Time</p>
                </div>
                <img src='/assets/image/bookingconfirm-clock-nonactive.png' alt='Icon' className='size-6' />
              </div>
              <hr className='w-full border-gray-200' />
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='mb-0.5 text-lg font-bold leading-[22.68px] text-gray-900'>
                    {doctor?.practiceLocation.clinicName ?? '-'}
                  </h3>
                  <p className='font-semibold leading-[20.16px] text-gray-500'>Appointment Location</p>
                </div>
                <img src='/assets/image/doctordetails-college-graduate.png' alt='Image' className='size-6' />
              </div>
            </div>
            <div id='Doctor' className='flex w-full items-center gap-3 rounded-3xl bg-[#2C40FF08] p-4'>
              <div className='flex size-14 items-center justify-center overflow-hidden rounded-full bg-gray-300'>
                {doctor?.profilePhoto ? (
                  <ImageServer src={doctor.profilePhoto} alt={doctor.fullName} className='h-full w-full object-cover' />
                ) : (
                  <img
                    src='/assets/image/paymentdetails-dr-raze-invoker.png'
                    alt='Image'
                    className='h-full w-full object-cover'
                  />
                )}
              </div>
              <div>
                <h3 className='mb-1 text-lg font-bold leading-[22.68px] text-gray-900'>
                  {doctor?.fullName ?? getPartyName(appointment?.doctor)}
                </h3>
                <p className='font-semibold leading-[20.16px] text-gray-500'>
                  {doctor?.specialist.name ? `${doctor.specialist.name} Specialist` : 'Doctor Specialist'}
                </p>
              </div>
            </div>
          </div>
        </section>
        {doctor?.practiceLocation ? (
          <section id='Location' className='px-4'>
            <CardDoctorPracticeLocation practiceLocation={doctor.practiceLocation} />
          </section>
        ) : null}
      </section>
      <footer className='fixed bottom-0 left-0 right-0 mx-auto max-w-170 p-4 bg-white rounded-3xl'>
        <div className='flex flex-col gap-3'>
          <Button
            variant='ghost'
            className='text-base text-primary hover:text-primary bg-primary-light/30 rounded-full leading-[20.16px] font-semibold py-7'
            asChild
          >
            <Link id='CtaHomepage' to='/'>
              Back to Homepage
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
