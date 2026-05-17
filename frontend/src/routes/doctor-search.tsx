import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/doctor-search')({
  component: DoctorSearchPage,
});

function DoctorSearchPage() {
  return (
    <div className='bg-gray-50'>
      <main className='mx-auto flex h-screen max-w-[640px] items-center justify-center px-4'>
        <form action='search-result' method='' className='w-full'>
          <div id='form' className='w-full rounded-3xl bg-white px-4 py-8'>
            <div className='mb-8 grid justify-items-center'>
              <img src='assets/icons/doctorsearch-lets-make-appointment.svg' alt='Icon' className='mb-4' />
              <h1 className='font-jakarta text-2xl font-extrabold leading-[30.24px] text-gray-900'>
                Let’s Make Appointment
              </h1>
            </div>
            <div id='InputContainer'>
              <div className='mb-6'>
                <h3 className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Which city are you in?</h3>
                <div className='relative mt-4'>
                  <select
                    id='MySelect'
                    required
                    className='peer h-[56px] w-full appearance-none rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-semibold leading-[20.16px] text-gray-500 outline-none transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary'
                  >
                    <option value='' disabled selected>
                      Enter the city name
                    </option>
                    <option value='Buitenzorg'>Buitenzorg</option>
                    <option value='Surabaya'>Surabaya</option>
                    <option value='Jakarta'>Jakarta</option>
                  </select>
                  <img
                    src='assets/icons/doctorsearch-location-nonactive.svg'
                    alt='Icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-invalid:opacity-100'
                  />
                  <img
                    src='assets/icons/doctorsearch-location-active.svg'
                    alt='Icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 peer-valid:opacity-100'
                  />
                </div>
              </div>
              <div className='mb-8'>
                <h3 className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>
                  What Speciality you need?
                </h3>
                <button
                  id='openModal'
                  className='relative mt-4 h-[56px] w-full rounded-full border border-gray-200 pl-12 text-start font-jakarta font-bold leading-[20.16px] text-gray-500 outline-none transition-all duration-300 hover:border-primary'
                >
                  <input
                    type='text'
                    value=''
                    name='inputSpeciality'
                    id='inputSpeciality'
                    className='absolute bottom-0 left-0 right-0 top-0 z-50 w-full border opacity-0'
                    placeholder='Choose a specialist'
                  />
                  <span id='selectedValue'>Choose a specialist</span>
                  <img
                    src='assets/icons/doctorsearch-input-choose-a-specialist-nonactive.svg'
                    alt='Icon'
                    id='chooseGrey'
                    className='absolute left-4 top-1/2 -translate-y-1/2'
                  />
                  <img
                    src='assets/icons/doctorsearch-input-choose-a-specialist-active.svg'
                    alt='Icon'
                    id='chooseBlack'
                    className='absolute left-4 top-1/2 -translate-y-1/2 opacity-0'
                  />
                  <img
                    id='arrow'
                    src='assets/icons/doctorsearch-arrow-right.svg'
                    alt='Icon'
                    className='absolute right-4 top-1/2 -translate-y-1/2'
                  />
                  <span
                    id='change'
                    className='absolute right-4 top-1/2 opacity-0 -translate-y-1/2 font-jakarta font-semibold leading-[20.16px] text-primary'
                  >
                    Change
                  </span>
                </button>
              </div>
              <button
                type='submit'
                className='flex h-14 w-full items-center justify-center gap-[10px] rounded-[100px] bg-primary'
              >
                <img src='assets/icons/doctorsearch-search-doctor.svg' alt='Icon' />
                <span className='font-jakarta font-bold leading-[20.16px] text-white'>Search Doctor</span>
              </button>
            </div>
          </div>
          <div id='myModal' className='absolute left-0 right-0 top-12 z-50 hidden pb-[208px]'>
            <div className='mx-auto max-w-[640px] px-4'>
              <div className='h-[145px] rounded-t-3xl bg-[linear-gradient(100.99deg,_#277B53_0%,_#277B7B_100%)] px-4 pt-6'>
                <p className='text-center font-jakarta font-bold leading-[25.6px] text-white'>
                  SEHATMURAH provides experienced and trusted doctors.
                </p>
              </div>
              <div className='-mt-[45px] rounded-3xl bg-white px-4 py-8'>
                <h1 className='mb-[3px] text-center font-jakarta text-xl font-bold leading-[25.2px] text-gray-900'>
                  Select Specialist
                </h1>
                <p className='mb-4 text-center font-jakarta font-semibold leading-[20.16px] text-gray-500'>
                  6 Total Specialist
                </p>
                <div id='ContainerRadioInputs' className='group'>
                  <label className='obstetrics mb-4 block'>
                    <div className='w-full rounded-3xl border border-gray-200 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex size-[70px] items-center justify-center'>
                            <img
                              src='assets/image/doctorsearch-modal-obstetrics.png'
                              alt='Image'
                              className='h-full w-full rounded-3xl object-cover'
                            />
                          </div>
                          <div className='gap-[6px]'>
                            <h2 className='mb-[6px] font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900'>
                              Obstetrics
                            </h2>
                            <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                              230 doctors
                            </p>
                          </div>
                        </div>
                        <input
                          value='Obstetrics'
                          type='radio'
                          name='specialist'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </div>
                  </label>
                  <label className='neurology mb-4 block'>
                    <div className='w-full rounded-3xl border border-gray-200 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex size-[70px] items-center justify-center'>
                            <img
                              src='assets/image/doctorsearch-modal-neurology.png'
                              alt='Image'
                              className='h-full w-full rounded-3xl object-cover'
                            />
                          </div>
                          <div>
                            <h2 className='mb-[6px] font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900'>
                              Neurology
                            </h2>
                            <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                              230 doctors
                            </p>
                          </div>
                        </div>
                        <input
                          type='radio'
                          value='Neurology'
                          name='specialist'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </div>
                  </label>
                  <label className='ophthalmology mb-4 block'>
                    <div className='w-full rounded-3xl border border-gray-200 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex size-[70px] items-center justify-center'>
                            <img
                              src='assets/image/doctorsearch-modal-ophthalmology.png'
                              alt='Image'
                              className='h-full w-full rounded-3xl object-cover'
                            />
                          </div>
                          <div>
                            <h2 className='mb-[6px] font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900'>
                              Ophthalmology
                            </h2>
                            <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                              230 doctors
                            </p>
                          </div>
                        </div>
                        <input
                          type='radio'
                          value='Ophthalmology'
                          name='specialist'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </div>
                  </label>
                  <label className='cardiology mb-4 block'>
                    <div className='w-full rounded-3xl border border-gray-200 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex size-[70px] items-center justify-center'>
                            <img
                              src='assets/image/doctorsearch-modal-cardiology.png'
                              alt='Image'
                              className='h-full w-full rounded-3xl object-cover'
                            />
                          </div>
                          <div>
                            <h2 className='mb-[6px] font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900'>
                              Cardiology
                            </h2>
                            <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                              230 doctors
                            </p>
                          </div>
                        </div>
                        <input
                          type='radio'
                          value='Cardiology'
                          name='specialist'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </div>
                  </label>
                  <label className='pediatric mb-4 block'>
                    <div className='w-full rounded-3xl border border-gray-200 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex size-[70px] items-center justify-center'>
                            <img
                              src='assets/image/doctorsearch-modal-pediatric.png'
                              alt='Image'
                              className='h-full w-full rounded-3xl object-cover'
                            />
                          </div>
                          <div>
                            <h2 className='mb-[6px] font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900'>
                              Pediatric
                            </h2>
                            <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                              230 doctors
                            </p>
                          </div>
                        </div>
                        <input
                          type='radio'
                          value='Pediatric'
                          name='specialist'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </div>
                  </label>
                  <label className='dermatology'>
                    <div className='w-full rounded-3xl border border-gray-200 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex size-[70px] items-center justify-center'>
                            <img
                              src='assets/image/doctorsearch-modal-dermatology.png'
                              alt='Image'
                              className='h-full w-full rounded-3xl object-cover'
                            />
                          </div>
                          <div>
                            <h2 className='mb-[6px] font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900'>
                              Dermatology
                            </h2>
                            <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                              230 doctors
                            </p>
                          </div>
                        </div>
                        <input
                          type='radio'
                          value='Dermatology'
                          name='specialist'
                          className='size-6 rounded-full p-1 accent-primary'
                        />
                      </div>
                    </div>
                  </label>
                  <nav className='modal-cta fixed bottom-0 left-0 right-0 z-30 mx-auto'>
                    <div className='mx-auto max-w-[640px]'>
                      <div className='flex h-[192px] w-full flex-col gap-y-4 rounded-t-3xl bg-white px-4 py-8'>
                        <button
                          type='button'
                          id='okButton'
                          disabled
                          className='flex h-[56px] w-full items-center justify-center rounded-full bg-gray-200 text-center font-jakarta font-bold leading-[20.16px] text-white transition-all duration-300 group-has-[:checked]:bg-primary'
                        >
                          Continue
                        </button>
                        <button
                          type='button'
                          id='closeModal'
                          className='flex h-[56px] w-full items-center justify-center rounded-full bg-[#2C40FF17] text-center font-jakarta font-bold leading-[20.16px] text-primary'
                        >
                          Kembali
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
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
              <img src='assets/icons/homepage-nav-appointment-active.svg' alt='Icon' />
              <p className='font-jakarta font-bold leading-[20.16px] text-primary'>Appointment</p>
            </a>
            <a href='my-booking' className='grid w-[112.33px] place-items-center gap-[6px]'>
              <img src='assets/icons/homepage-nav-booking-nonactive.svg' alt='Icon' />
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>My Booking</p>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
