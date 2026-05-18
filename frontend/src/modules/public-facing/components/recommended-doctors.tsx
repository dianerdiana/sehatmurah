import React from 'react';

import { Link } from '@tanstack/react-router';
import { Star, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { formatCurrency } from '@/utils/utils';

import { useGetDoctors, useGetSpecialists } from '../../../queries/public-facing.query';

export function RecommendedDoctors() {
  const [currentTab, setCurrentTab] = React.useState<string>('all');

  const { data: specialists } = useGetSpecialists({ params: { limit: 10 } });
  const queryDoctors = useGetDoctors({ params: { specialist: currentTab === 'all' ? undefined : currentTab } });

  const onTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <section id='Recommended' className='mb-4 mt-4 rounded-3xl bg-white py-8 px-4'>
      <h2 className='text-[20px] font-bold leading-[25.2px] text-gray-900'>Recommended Doctors</h2>
      <Tabs defaultValue={currentTab} onValueChange={onTabChange} className='w-full mt-4'>
        <TabsList className='w-full h-auto bg-transparent p-0 mb-6 block'>
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
                  className='h-auto cursor-pointer text-base rounded-[100px] border border-gray-200 bg-white px-5 py-3.5 font-semibold leading-[20.16px] text-gray-500 transition-all duration-300 data-[state=active]:border-transparent data-[state=active]:bg-[#2C40FF17] data-[state=active]:text-primary data-[state=active]:font-bold'
                >
                  All
                </TabsTrigger>
              </CarouselItem>

              {specialists &&
                specialists.map((specialist) => (
                  <CarouselItem key={specialist._id} className='pl-3 basis-auto shrink-0'>
                    <TabsTrigger
                      value={specialist._id}
                      className='h-auto cursor-pointer text-base rounded-[100px] border border-gray-200 bg-white px-5 py-3.5 font-semibold leading-[20.16px] text-gray-500 transition-all duration-300 data-[state=active]:border-transparent data-[state=active]:bg-[#2C40FF17] data-[state=active]:text-primary data-[state=active]:font-bold'
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
                  <CarouselItem className='basis-[45%] me-3' key={`skeleton-${index}`}>
                    <DoctorCardSkeleton />
                  </CarouselItem>
                ))
              ) : queryDoctors.data && queryDoctors.data.length ? (
                // KONDISI 2: Tampilkan Data Dokter jika loading selesai dan sukses
                queryDoctors.data.map((doctor) => (
                  <CarouselItem className='basis-[45%]' key={doctor._id}>
                    <Link to='/doctor-details' className='w-70 shrink-0 rounded-3xl'>
                      <div className='relative h-45 w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-gray-100'>
                        <img src={doctor.profilePhoto} alt='Image' className='w-full h-full object-contain' />

                        {doctor.isAvailable ? (
                          <Badge variant='success' className='absolute left-4 top-4 align-middle'>
                            <span className='w-2 h-2 rounded-full bg-emerald-500' /> Available
                          </Badge>
                        ) : (
                          <Badge variant='destructive' className='absolute left-4 top-4 align-middle'>
                            <span className='w-2 h-2 rounded-full bg-destructive' /> Unavailable
                          </Badge>
                        )}
                      </div>
                      <div className='flex h-12 w-full items-center justify-between bg-primary px-5 py-3.5'>
                        <p className='font-jakarta font-bold leading-[20.16px] text-white'>
                          {doctor.practiceLocation.clinicName}
                        </p>
                        <img src='assets/icons/homepage-recomended-hospital.svg' alt='Icon' />
                      </div>
                      <div className='w-full overflow-hidden rounded-b-3xl bg-white p-5 border border-gray-200'>
                        <div className='flex justify-between'>
                          <div>
                            <h3 className='font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>
                              {doctor.fullName}
                            </h3>
                            <p className='mt-1 font-semibold leading-[20.16px] text-gray-500'>
                              {doctor.specialist.name} Specialist
                            </p>
                          </div>
                          <div className='flex flex-col h-full shrink-0'>
                            <Star className='stroke-yellow-400 fill-yellow-400' />
                            {doctor.ratingAverage}
                          </div>
                        </div>
                        <p className='mt-4 text-start text-lg font-bold leading-[22.68px] text-accent-red'>
                          {formatCurrency(doctor.consultationFee)}
                          <span className='text-base font-semibold leading-[20.16px] text-gray-500'>/hours</span>
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))
              ) : (
                // KONDISI 3: Opsional, jika data kosong atau terjadi error
                <div className='w-full rounded-3xl border border-dashed border-gray-200 bg-gray-50/30 py-12 px-4 flex flex-col items-center justify-center text-center min-h-75'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3'>
                    <User />
                  </div>
                  <h3 className='font-jakarta text-lg font-bold text-gray-900'>No doctors found</h3>
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
    <div className='w-70 shrink-0 rounded-3xl animate-pulse'>
      <div className='relative h-45 w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-gray-100'>
        <div className='w-full h-full bg-gray-200' />

        <div className='absolute left-4 top-4 flex items-center gap-1.5 h-7 w-24 rounded-full bg-gray-300/80 px-2.5' />
      </div>

      <div className='flex h-12 w-full items-center justify-between bg-gray-200 px-5 py-3.5 border-x border-gray-200'>
        <div className='h-4 w-32 rounded bg-gray-300' />
        <div className='size-5 rounded-full bg-gray-300' />
      </div>

      <div className='w-full overflow-hidden rounded-b-3xl bg-white p-5 border border-gray-200 border-t-0'>
        <div className='flex justify-between items-start'>
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
