import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Star, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ImageServer } from '@/components/ui/image-server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { doctorQueryOptions } from '@/modules/doctors/doctor.query';
import type { Specialist } from '@/modules/specialists/specialist.type';

import { formatCurrency } from '@/utils/utils';

export function RecommendedDoctors({ specialists }: { specialists: Specialist[] }) {
  const [currentTab, setCurrentTab] = React.useState<string>('all');

  const queryDoctors = useQuery(
    doctorQueryOptions.list({
      specialist: currentTab === 'all' ? undefined : currentTab,
      page: 1,
      limit: 10,
      city: '',
      search: '',
    }),
  );

  const doctors = queryDoctors.data && queryDoctors.data.items;

  const onTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <section id='Recommended' className='mb-4 mt-4 rounded-3xl bg-white px-4 py-6 sm:py-8'>
      <h2 className='text-[20px] font-bold leading-[25.2px] text-gray-900'>Recommended Doctors</h2>
      <Tabs defaultValue={currentTab} onValueChange={onTabChange} className='w-full mt-4'>
        <TabsList className='mb-6 block h-auto w-full bg-transparent p-0'>
          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
              slidesToScroll: 'auto',
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-3 flex flex-row pb-2'>
              <CarouselItem className='pl-3 basis-auto shrink-0'>
                <TabsTrigger
                  value='all'
                  className='h-auto cursor-pointer rounded-[100px] border border-gray-200 bg-white px-4 py-3 text-sm font-semibold leading-[20.16px] text-gray-500 transition-all duration-300 data-[state=active]:border-transparent data-[state=active]:bg-[#2C40FF17] data-[state=active]:font-bold data-[state=active]:text-primary sm:px-5 sm:py-3.5 sm:text-base'
                >
                  All
                </TabsTrigger>
              </CarouselItem>

              {specialists &&
                specialists.map((specialist) => (
                  <CarouselItem key={specialist._id} className='pl-3 basis-auto shrink-0'>
                    <TabsTrigger
                      value={specialist._id}
                      className='h-auto cursor-pointer rounded-[100px] border border-gray-200 bg-white px-4 py-3 text-sm font-semibold leading-[20.16px] text-gray-500 transition-all duration-300 data-[state=active]:border-transparent data-[state=active]:bg-[#2C40FF17] data-[state=active]:font-bold data-[state=active]:text-primary sm:px-5 sm:py-3.5 sm:text-base'
                    >
                      {specialist.name} Specialist
                    </TabsTrigger>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </TabsList>
        <TabsContent value={currentTab}>
          <Carousel>
            <CarouselContent>
              {/* KONDISI 1: Tampilkan Skeleton saat data sedang pending/loading */}
              {queryDoctors.isPending ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem className='basis-[88%] pr-3 sm:basis-[45%]' key={`skeleton-${index}`}>
                    <DoctorCardSkeleton />
                  </CarouselItem>
                ))
              ) : doctors && doctors.length ? (
                // KONDISI 2: Tampilkan Data Dokter jika loading selesai dan sukses
                doctors.map((doctor) => (
                  <CarouselItem className='basis-[88%] pr-3 sm:basis-[45%]' key={doctor._id}>
                    <Link
                      to={`/doctors/$doctorId/details`}
                      params={{ doctorId: doctor._id }}
                      className='w-full shrink-0 rounded-3xl sm:w-70'
                    >
                      <div className='relative h-40 w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-gray-100 sm:h-45'>
                        <ImageServer src={doctor.profilePhoto} alt='Image' className='w-full h-full object-contain' />

                        {doctor.isAvailable ? (
                          <Badge variant='success' className='absolute left-3 top-3 align-middle sm:left-4 sm:top-4'>
                            <span className='w-2 h-2 rounded-full bg-emerald-500' /> Available
                          </Badge>
                        ) : (
                          <Badge
                            variant='destructive'
                            className='absolute left-3 top-3 align-middle sm:left-4 sm:top-4'
                          >
                            <span className='w-2 h-2 rounded-full bg-destructive' /> Unavailable
                          </Badge>
                        )}
                      </div>
                      <div className='flex h-auto min-h-12 w-full items-center justify-between gap-3 bg-primary px-4 py-3 sm:px-5 sm:py-3.5'>
                        <p className='font-bold leading-[20.16px] text-white'>{doctor.practiceLocation.clinicName}</p>
                        <img src='assets/icons/homepage-recomended-hospital.svg' alt='Icon' />
                      </div>
                      <div className='w-full overflow-hidden rounded-b-3xl border border-gray-200 border-t-0 bg-white p-4 sm:p-5'>
                        <div className='flex items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <h3 className='text-base font-bold leading-[22.68px] text-gray-900 sm:text-lg'>
                              {doctor.fullName}
                            </h3>
                            <p className='mt-1 text-sm font-semibold leading-[20.16px] text-gray-500 sm:text-base'>
                              {doctor.specialist.name} Specialist
                            </p>
                          </div>
                          <div className='flex shrink-0 flex-col items-center'>
                            <Star className='stroke-yellow-400 fill-yellow-400' />
                            {doctor.ratingAverage}
                          </div>
                        </div>
                        <p className='mt-4 text-start text-base font-bold leading-[22.68px] text-accent-red sm:text-lg'>
                          {formatCurrency(doctor.consultationFee)}
                          <span className='text-base font-semibold leading-[20.16px] text-gray-500'>/hours</span>
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))
              ) : (
                // KONDISI 3: Opsional, jika data kosong atau terjadi error
                <div className='flex min-h-75 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/30 px-4 py-12 text-center'>
                  <div className='mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400'>
                    <User />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900'>No doctors found</h3>
                  <p className='mt-1 text-sm text-gray-500 max-w-sm'>
                    There are currently no doctors registered or active in this specialty. Please check other
                    categories.
                  </p>
                </div>
              )}
            </CarouselContent>
          </Carousel>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default function DoctorCardSkeleton() {
  return (
    <div className='w-full shrink-0 animate-pulse rounded-3xl sm:w-70'>
      <div className='relative h-40 w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-gray-100 sm:h-45'>
        <div className='w-full h-full bg-gray-200' />

        <div className='absolute left-3 top-3 h-7 w-24 rounded-full bg-gray-300/80 px-2.5 sm:left-4 sm:top-4' />
      </div>

      <div className='flex h-auto min-h-12 w-full items-center justify-between gap-3 border-x border-gray-200 bg-gray-200 px-4 py-3 sm:px-5 sm:py-3.5'>
        <div className='h-4 w-32 rounded bg-gray-300' />
        <div className='size-5 rounded-full bg-gray-300' />
      </div>

      <div className='w-full overflow-hidden rounded-b-3xl border border-gray-200 border-t-0 bg-white p-4 sm:p-5'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-2'>
            <div className='h-5 w-40 rounded bg-gray-300' />
            <div className='h-4 w-28 rounded bg-gray-200' />
          </div>

          <div className='flex flex-col items-center gap-1.5 shrink-0'>
            <div className='size-5 rounded bg-gray-200' />
            <div className='h-3.5 w-6 rounded bg-gray-200' />
          </div>
        </div>

        <div className='mt-4 flex items-baseline gap-1'>
          <div className='h-6 w-24 rounded bg-gray-300' />
          <div className='h-4 w-12 rounded bg-gray-200' />
        </div>
      </div>
    </div>
  );
}
