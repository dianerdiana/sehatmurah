import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { themeConfig } from '@/configs/theme-config';
import { doctorQueries } from '@/queries/doctor.query';
import { specialistQueries } from '@/queries/specialist.query';

export function FormSearchDoctor() {
  const [selectedSpecialist, setSelectedSpecialist] = React.useState<undefined | string>(undefined);
  const [selectedCity, setSelectedCity] = React.useState<undefined | string>(undefined);

  const { data: cities } = useQuery(doctorQueries.cities());
  const { data: specialists } = useQuery(specialistQueries.list({ limit: 10 }));

  return (
    <div id='form' className='w-full rounded-3xl bg-white px-4 py-8'>
      <div className='mb-8 grid justify-items-center'>
        <img src='/assets/icons/doctorsearch-lets-make-appointment.svg' alt='Icon' className='mb-4' />
        <h1 className='text-2xl font-extrabold leading-[30.24px] text-gray-900'>Let’s Make Appointment</h1>
      </div>
      <div id='InputContainer'>
        <div className='mb-6'>
          <h3 className='font-semibold leading-[20.16px] text-gray-500'>Which city are you in?</h3>
          <div className='relative mt-4'>
            <Select onValueChange={setSelectedCity}>
              <SelectTrigger className='w-full cursor-pointer rounded-full py-6 ps-14 font-semibold text-gray-500 text-base'>
                <SelectValue placeholder='Select city...' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  {cities &&
                    cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
          <h3 className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>What Speciality you need?</h3>
          <Dialog>
            <DialogTrigger asChild>
              <button
                id='openModal'
                className='relative cursor-pointer mt-4 h-14 w-full rounded-full border border-gray-200 pl-12 text-start font-bold leading-[20.16px] text-gray-500 outline-none transition-all duration-300 hover:border-primary'
              >
                <span id='selectedValue'>{selectedSpecialist ? selectedSpecialist : 'Choose a specialist'}</span>
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
              </button>
            </DialogTrigger>

            <DialogContent className='p-0 bg-transparent border-0 sm:max-w-170 gap-0' showCloseButton={false}>
              <DialogHeader className='h-36.25 rounded-t-3xl bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] px-4 pt-6'>
                <DialogTitle className='text-center font-bold leading-[25.6px] text-white'>
                  {themeConfig.app.appName} &nbsp;{' '}
                  <DialogDescription className='text-base text-white'>
                    provides experienced and trusted doctors.
                  </DialogDescription>
                </DialogTitle>
              </DialogHeader>
              <div className='bg-white rounded-3xl -mt-10 py-4 px-4 no-scrollbar overflow-y-auto'>
                <h1 className='mb-0.75 text-center text-xl font-bold leading-[25.2px] text-gray-900'>
                  Select Specialist
                </h1>
                <p className='mb-4 text-center font-semibold leading-[20.16px] text-gray-500'>
                  {(specialists && specialists.length) || 0} Total Specialist
                </p>
                <div className='group bg-white max-h-[50vh] overflow-y-auto [ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden'>
                  {specialists &&
                    specialists.map((specialist) => (
                      <label key={specialist._id} className='obstetrics mb-4 block cursor-pointer'>
                        <div className='w-full rounded-3xl border border-gray-200 p-4'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                              <div className='flex size-17.5 items-center justify-center'>
                                <img
                                  src={specialist.image}
                                  alt='Image'
                                  className='h-full w-full rounded-3xl object-cover'
                                />
                              </div>
                              <div className='gap-1.5'>
                                <h2 className='mb-1.5 text-[18px] font-bold leading-[22.68px] text-gray-900'>
                                  {specialist.name}
                                </h2>
                                <p className='font-jakarta text-[16px] font-semibold leading-[20.16px] text-gray-500'>
                                  {specialist.countDoctors} doctors
                                </p>
                              </div>
                            </div>
                            <input
                              value={specialist.name}
                              type='radio'
                              name='specialist'
                              className='size-6 rounded-full p-1 accent-primary'
                              checked={selectedSpecialist === specialist.name}
                              onChange={(e) => setSelectedSpecialist(e.target.value)}
                            />
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
              <DialogFooter className='mt-3'>
                <DialogClose asChild>
                  <Button className='w-full py-8 rounded-full text-base'>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Link
          from='/search'
          to='.'
          search={{
            specialist: selectedSpecialist,
            city: selectedCity,
          }}
          type='submit'
          className='flex h-14 w-full items-center justify-center gap-2.5 rounded-[100px] bg-primary'
        >
          <Search className='stroke-white size-6' />
          <span className='font-bold text-base leading-[20.16px] text-white'>Search Doctor</span>
        </Link>
      </div>
    </div>
  );
}
