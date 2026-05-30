import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { appointmentQueryOptions } from '@/modules/appointments/appointment.query';

export const Route = createFileRoute('/_layout-public-blank/appointments/$appointmentId/success')({
  component: BookingAppointmentSuccess,
});

function BookingAppointmentSuccess() {
  const { appointmentId } = Route.useParams();
  const appointmentQuery = useQuery(appointmentQueryOptions.getById(appointmentId));

  if (appointmentQuery.isPending) {
    return (
      <div className='flex min-h-60 items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center gap-3 min-h-screen px-4'>
      <section id='ContainerSuccess' className='w-full rounded-3xl bg-background'>
        <header className='mb-8 w-full px-4'>
          <img src='/assets/icons/succespage-booking-succes.svg' alt='Icon' className='mx-auto mb-6' />
          <h1 id='success-heading' className='text-center text-2xl font-extrabold leading-[30.24px]'>
            Booking Succes,
            <br />
            well done🙌🏻
          </h1>
        </header>
        <div id='BookingId' className='w-full px-4'>
          <section className='mb-8 h-37 w-full rounded-3xl bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] pb-6'>
            <div className='w-full rounded-3xl bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] p-0.5'>
              <div className='mb-4 flex h-14 w-full items-center gap-x-1 rounded-3xl bg-background p-4'>
                <img src='/assets/icons/succespage-booking-id.svg' alt='Icon' loading='lazy' />
                <h2 className='font-semibold leading-[20.16px] text-gray-500'>Booking ID:</h2>
                <strong className='font-extrabold leading-[20.16px] text-primary'>
                  {appointmentQuery.data?.bookingCode}
                </strong>
              </div>
            </div>
            <p className='px-4 text-center font-bold leading-[25.6px] text-white'>Your appointment is set.</p>
          </section>
        </div>
      </section>
      <footer className='flex flex-col gap-3'>
        <Button className='text-base rounded-full leading-[20.16px] font-semibold py-7' asChild>
          <Link id='CtaViewBooking' to='/future-appointment-pending'>
            View My Booking
          </Link>
        </Button>
        <Button
          variant='ghost'
          className='text-base text-primary hover:text-primary bg-primary-light/30 rounded-full leading-[20.16px] font-semibold py-7'
          asChild
        >
          <Link id='CtaViewBooking' to='/appointments'>
            Make Another Appointment
          </Link>
        </Button>
      </footer>
    </div>
  );
}
