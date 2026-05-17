import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/my-booking')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className='mx-auto flex h-screen max-w-[640px] items-center justify-center px-4'>
        <form action='future-appointment-succes' className='w-full'>
          <section
            role='alert'
            className='-mb-[45px] h-[145px] w-full rounded-t-3xl bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] px-4 pb-[69px] pt-6'
          >
            <h2 className='text-center font-jakarta font-bold leading-[25.6px] text-white'>
              Enter the booking code & phone number that match those in the email.
            </h2>
          </section>
          <section className='rounded-3xl bg-white px-5 py-8'>
            <div className='mb-8 grid justify-items-center'>
              <img src='assets/icons/succespage-booking-succes.svg' alt='Icon' className='mb-4' />
              <h1 className='font-jakarta text-2xl font-extrabold leading-[30.24px] text-gray-900'>
                View Your Booking
              </h1>
            </div>
            <div id='InputContainer'>
              <label id='BookingId' className='mb-6 block'>
                <p className='mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500'>Booking ID</p>
                <div className='relative'>
                  <input
                    type='text'
                    id='booking'
                    value=''
                    required
                    placeholder='Write your Booking ID'
                    name='bookingId'
                    className='booking peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none'
                  />
                  <img
                    src='assets/icons/succespage-booking-id.svg'
                    alt='Icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2'
                  />
                  <img
                    src='assets/icons/succespage-booking-id-active.svg'
                    alt='Icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0'
                  />
                </div>
              </label>
              <label id='PhoneNumber' className='mb-8 block'>
                <p className='mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500'>Phone No.</p>
                <div className='relative'>
                  <input
                    type='tel'
                    value=''
                    required
                    placeholder='Write your phone number'
                    name='phoneNumber'
                    id='phone'
                    className='phone peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none'
                  />
                  <img
                    src='assets/icons/paymentdetails-phone-nonactive.svg'
                    alt='Icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2'
                  />
                  <img
                    src='assets/icons/paymentdetails-phone-active.svg'
                    alt='Icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0'
                  />
                </div>
              </label>
              <button
                type='submit'
                className='flex h-14 w-full items-center justify-center gap-[10px] rounded-[100px] bg-primary'
              >
                <img src='assets/icons/doctorsearch-search-doctor.svg' alt='Icon' />
                <span className='font-jakarta font-bold leading-[20.16px] text-white'>Find My Booking</span>
              </button>
            </div>
          </section>
        </form>
      </main>
      <nav className='navigate fixed bottom-0 left-0 right-0 z-30 mx-auto'>
        <div className='mx-auto max-w-[640px]'>
          <div className='flex items-center justify-between rounded-t-2xl border-t border-gray-50 bg-white px-4 py-6'>
            <a href='/' className='grid w-[112.33px] place-items-center gap-[6px]'>
              <img src='assets/icons/homepage-nav-home-nonactive.svg' alt='Icon' />
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Home</p>
            </a>
            <a href='doctor-search' className='grid w-[112.33px] place-items-center gap-[6px]'>
              <img src='assets/icons/homepage-nav-appointment-nonactive.svg' alt='Icon' />
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Appointment</p>
            </a>
            <a href='my-booking' className='grid w-[112.33px] place-items-center gap-[6px]'>
              <img src='assets/icons/mybooking-active.svg' alt='Icon' />
              <p className='font-jakarta font-bold leading-[20.16px] text-primary'>My Booking</p>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
