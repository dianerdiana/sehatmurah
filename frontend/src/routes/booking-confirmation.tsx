import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/booking-confirmation')({
  component: BookingConfirmationPage,
});

function BookingConfirmationPage() {
  return (
    <main className='relative mx-auto max-w-[640px] pb-[120px]'>
      <header className='h-[219px] w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <a href='doctor-details'>
          <img src='assets/icons/arrow-left-blue.svg' alt='Icon' loading='lazy' />
        </a>
        <div className='absolute left-1/2 top-12 -translate-x-1/2'>
          <h1 className='mb-[3px] whitespace-nowrap text-center font-jakarta text-xl font-bold leading-[25.2px] text-white'>
            Appointment Details
          </h1>
          <p className='whitespace-nowrap text-center font-jakarta font-semibold leading-[20.16px] text-primary-light'>
            Set your appointment schedule
          </p>
        </div>
      </header>
      <section id='ContainerBookingConfirmation' className='-mt-[91px] w-full space-y-4 pb-4'>
        <div id='Card' className='mx-4 space-y-5 rounded-3xl bg-white p-5'>
          <div id='CardHeader' className='flex items-center gap-x-[12px]'>
            <div className='relative h-[120px] w-[100px]'>
              <img
                className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
                src='assets/image/searchresult-dr-raze-invoker.png'
                alt='Image'
                loading='lazy'
              />
              <img className='absolute left-2 top-2' src='assets/icons/alert-online.svg' alt='Icon' loading='lazy' />
            </div>
            <div className='space-y-2'>
              <h3 className='font-jakarta font-bold leading-[20.16px] text-primary'>Radiant Hospital</h3>
              <h2 className='font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>Dr. Raze Invoker</h2>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Internist Specialist</p>
            </div>
          </div>
          <div id='CardInfo' className='flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-verify.svg' alt='Icon' loading='lazy' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>Verify</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Certified</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-5-years.svg' alt='Icon' loading='lazy' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>5 Years</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Experience</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-4.5.svg' alt='Icon' loading='lazy' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>4.5</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Rating</p>
            </div>
          </div>
        </div>
        <form method='' action='payment-details'>
          <div id='ContainerInputs'>
            <section id='MakeAppointment' className='mb-4 w-full space-y-6 rounded-3xl bg-white px-4 py-8'>
              <h2 className='font-jakarta text-xl font-bold leading-[25.2px] text-gray-900'>Make Appointment</h2>
              <div className='flex w-full items-center justify-between rounded-3xl border border-gray-200 bg-[#2C40FF08] p-6'>
                <div>
                  <h3 className='mb-[2px] font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>
                    31 Aug 2024
                  </h3>
                  <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Doctor Available</p>
                </div>
                <img src='assets/icons/doctordetails-doctor-available.svg' alt='Icon' loading='lazy' />
              </div>
              <div>
                <p className='mb-4 font-jakarta font-semibold leading-[20.16px] text-gray-500'>
                  Set The Appointment Time.
                </p>
                <div id='ContainerInputsRadio'>
                  <label className='group mb-3 flex items-center justify-between rounded-full border border-gray-200 p-4 text-gray-500 transition-all duration-300 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-[#2C40FF08] has-[:checked]:text-primary'>
                    <div className='flex items-center gap-[10px]'>
                      <img
                        src='assets/image/bookingconfirm-clock-nonactive.png'
                        alt='Image'
                        className='size-6 group-has-[:checked]:hidden'
                        loading='lazy'
                      />
                      <img
                        src='assets/image/bookingconfirm-clock-active.png'
                        alt='Image'
                        className='hidden size-6 group-has-[:checked]:block'
                        loading='lazy'
                      />
                      <p className='font-jakarta font-semibold leading-[20.16px]'>09:30 AM - 10:30 AM</p>
                    </div>
                    <input
                      id=''
                      value='09:30 AM - 10:30 AM'
                      type='radio'
                      name='appointment time'
                      className='size-6 rounded-full p-1 accent-primary'
                    />
                  </label>
                  <label className='group mb-3 flex items-center justify-between rounded-full border border-gray-200 p-4 text-gray-500 transition-all duration-300 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-[#2C40FF08] has-[:checked]:text-primary'>
                    <div className='flex items-center gap-[10px]'>
                      <img
                        src='assets/image/bookingconfirm-clock-nonactive.png'
                        alt='Image'
                        className='size-6 group-has-[:checked]:hidden'
                        loading='lazy'
                      />
                      <img
                        src='assets/image/bookingconfirm-clock-active.png'
                        alt='Image'
                        className='hidden size-6 group-has-[:checked]:block'
                        loading='lazy'
                      />
                      <p className='font-jakarta font-semibold leading-[20.16px]'>13:00 PM - 13:30 PM</p>
                    </div>
                    <input
                      id=''
                      value='13:00 PM - 13:30 PM'
                      type='radio'
                      name='appointment time'
                      className='size-6 rounded-full p-1 accent-primary'
                    />
                  </label>
                  <label className='group flex items-center justify-between rounded-full border border-gray-200 p-4 text-gray-500 transition-all duration-300 hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-[#2C40FF08] has-[:checked]:text-primary'>
                    <div className='flex items-center gap-[10px]'>
                      <img
                        src='assets/image/bookingconfirm-clock-nonactive.png'
                        alt='Image'
                        className='size-6 group-has-[:checked]:hidden'
                        loading='lazy'
                      />
                      <img
                        src='assets/image/bookingconfirm-clock-active.png'
                        alt='Image'
                        className='hidden size-6 group-has-[:checked]:block'
                        loading='lazy'
                      />
                      <p className='font-jakarta font-semibold leading-[20.16px]'>14:00 PM - 15:00 PM</p>
                    </div>
                    <input
                      id=''
                      value='14:00 PM - 15:00 PM'
                      type='radio'
                      name='appointment time'
                      className='size-6 rounded-full p-1 accent-primary'
                    />
                  </label>
                </div>
              </div>
            </section>
            <section id='PatientData' className='w-full rounded-3xl bg-white px-4 py-8'>
              <h2 className='mb-6 font-jakarta text-xl font-bold leading-[25.2px] text-gray-900'>Patient Data</h2>
              <div id='ContainerInputPatient'>
                <label id='Name' className='mb-6 block'>
                  <p className='mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500'>Name Of Patient</p>
                  <div className='relative h-[56px] w-full rounded-full border border-gray-200 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary'>
                    <input
                      required
                      id='Patient'
                      value=''
                      type='text'
                      className='peer h-full w-full rounded-full pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus:outline-none'
                      placeholder='Patient Full Name'
                    />
                    <img
                      src='assets/icons/bookingconfirm-people-nonactive.svg'
                      alt='Icon'
                      className='absolute left-4 top-1/2 -translate-y-1/2'
                      loading='lazy'
                    />
                    <img
                      src='assets/icons/bookingconfirm-people-active.svg'
                      alt='Icon'
                      className='absolute left-4 top-1/2 z-10 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0'
                      loading='lazy'
                    />
                  </div>
                </label>
                <div id='Age' className='mb-6'>
                  <p className='mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500'>Age</p>
                  <label className='counter flex h-[56px] w-full items-center justify-between rounded-full border border-gray-200 p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary'>
                    <button className='decrement'>
                      <img src='assets/icons/bookingconfirm-decrement.svg' alt='Icon' loading='lazy' />
                    </button>
                    <input
                      readOnly
                      type='text'
                      name='age'
                      id='count'
                      value='Years Old'
                      className='w-full text-center font-jakarta font-bold leading-[20.16px] text-gray-500 focus:outline-none'
                    />
                    <button className='increment'>
                      <img src='assets/icons/bookingconfirm-increment.svg' alt='Icon' loading='lazy' />
                    </button>
                  </label>
                </div>
                <div id='Gender'>
                  <p className='mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500'>Gender</p>
                  <div className='counter flex w-full items-center gap-2'>
                    <label
                      id='Woman'
                      className='w-full rounded-full border border-gray-200 p-4 transition-all duration-300 has-[:checked]:border-[1.5px] has-[:checked]:border-primary has-[:checked]:bg-[#2C40FF08]'
                    >
                      <div className='group flex items-center justify-between'>
                        <div className='mr-2 flex items-center'>
                          <img
                            src='assets/icons/bookingconfirm-woman-nonactive.svg'
                            alt='Icon'
                            className='mr-2 group-has-[:checked]:hidden'
                            loading='lazy'
                          />
                          <img
                            src='assets/icons/bookingconfirm-woman-active.svg'
                            alt='Icon'
                            className='mr-2 hidden group-has-[:checked]:block'
                            loading='lazy'
                          />
                          <p className='font-jakarta font-bold leading-[20.16px] text-gray-500 group-has-[:checked]:text-primary'>
                            Woman
                          </p>
                        </div>
                        <input
                          type='radio'
                          value='Woman'
                          id='Woman'
                          name='gender'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </label>
                    <label
                      id='Man'
                      className='w-full rounded-full border border-gray-200 p-4 transition-all duration-300 has-[:checked]:border-[1.5px] has-[:checked]:border-primary has-[:checked]:bg-[#2C40FF08]'
                    >
                      <div className='group flex items-center justify-between'>
                        <div className='mr-2 flex items-center'>
                          <img
                            src='assets/icons/man-nonactive.svg'
                            alt='Icon'
                            className='mr-2 group-has-[:checked]:hidden'
                            loading='lazy'
                          />
                          <img
                            src='assets/icons/man-active.svg'
                            alt='Icon'
                            className='mr-2 hidden group-has-[:checked]:block'
                            loading='lazy'
                          />
                          <p className='font-jakarta font-bold leading-[20.16px] text-gray-500 group-has-[:checked]:text-primary'>
                            Man
                          </p>
                        </div>
                        <input
                          type='radio'
                          name='gender'
                          value='Man'
                          id='Man'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <nav id='Cta' className='fixed bottom-0 left-0 right-0 z-30'>
            <div className='mx-auto max-w-[640px]'>
              <div className='flex h-[120px] w-full items-center justify-between space-x-2 rounded-t-3xl bg-white px-4'>
                <div>
                  <p className='mb-[2px] whitespace-nowrap font-jakarta text-[24px] font-bold leading-[30.24px] text-accent-red'>
                    Rp 240.000
                  </p>
                  <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>/hours</p>
                </div>
                <button
                  type='submit'
                  id='continue'
                  className='flex h-[52px] w-[197px] items-center justify-center rounded-[100px] bg-primary font-jakarta font-bold leading-[20.16px] text-white transition-all duration-300'
                >
                  Continue
                </button>
              </div>
            </div>
          </nav>
        </form>
      </section>
    </main>
  );
}
