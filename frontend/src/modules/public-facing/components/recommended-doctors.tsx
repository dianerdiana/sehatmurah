import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { formatCurrency } from '@/lib/utils';

import { getDoctors, getSpecialists } from '../public-facing.api';

export function RecommendedDoctors() {
  const [currentTab, setCurrentTab] = React.useState<string>('all');

  const { data: specialistsData } = useQuery({
    queryKey: ['specialists'],
    queryFn: getSpecialists,
  });

  const { data: doctorsData, refetch } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctors({ specialist: currentTab === 'all' ? undefined : currentTab }),
  });

  const onTabChange = (tab: string) => {
    console.log(tab);
    refetch();
    setCurrentTab(tab);
  };

  return (
    <section id='Recommended' className='mb-4 mt-4 rounded-3xl bg-white py-8'>
      <h2 className='pl-4 text-[20px] font-bold leading-[25.2px] text-gray-900'>Recommended Doctors</h2>
      <Tabs defaultValue={currentTab} onValueChange={onTabChange} className='w-full mt-4'>
        <TabsList className='w-full h-auto bg-transparent p-0 mb-6 block'>
          <Carousel
            opts={{
              align: 'start',
              dragFree: true, // Mengizinkan gesekan bebas (free scroll) yang mulus
              slidesToScroll: 'auto',
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-3 flex flex-row'>
              <CarouselItem className='pl-3 basis-auto shrink-0'>
                <TabsTrigger
                  value='all'
                  className='h-auto cursor-pointer text-base rounded-[100px] border border-gray-200 bg-white px-5 py-3.5 font-semibold leading-[20.16px] text-gray-500 transition-all duration-300 data-[state=active]:border-transparent data-[state=active]:bg-[#2C40FF17] data-[state=active]:text-primary data-[state=active]:font-bold'
                >
                  All
                </TabsTrigger>
              </CarouselItem>

              {specialistsData &&
                specialistsData.status === 'success' &&
                specialistsData.data.map((specialist) => (
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
              {doctorsData &&
                doctorsData.status === 'success' &&
                doctorsData.data.map((doctor) => (
                  <CarouselItem className='basis-[45%]' key={doctor._id}>
                    <Link to='/doctor-details' className='swiper-slide w-70 shrink-0 rounded-3xl'>
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
                ))}
            </CarouselContent>
          </Carousel>
        </TabsContent>
      </Tabs>
    </section>
  );
}
