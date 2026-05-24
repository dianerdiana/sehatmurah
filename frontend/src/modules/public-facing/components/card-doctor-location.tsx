import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { DoctorPracticeLocation } from '@/modules/doctors/doctor.type';

export function CardDoctorPracticeLocation({ practiceLocation }: { practiceLocation: DoctorPracticeLocation }) {
  const urlLocation = encodeURIComponent(practiceLocation.address);

  return (
    <Card className='w-full rounded-3xl border-none shadow-md bg-background'>
      <CardHeader className='py-0'>
        <CardTitle className='text-xl font-bold leading-tight text-foreground'>Check-Up Location</CardTitle>
      </CardHeader>

      <CardContent>
        <div id='ContainerMap' className='relative'>
          <div id='Map' className='h-70 w-full overflow-hidden rounded-3xl border bg-muted'>
            <iframe
              src={`https://maps.google.com/maps?q=${urlLocation}&output=embed`}
              width='100%'
              height='450'
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>

          <div id='CtaMap' className='absolute bottom-4 w-full px-4 left-0'>
            <div className='flex items-center justify-between rounded-2xl border p-3 shadow-md bg-white'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <MapPin className='h-5 w-5' />
                </div>

                <div>
                  <h3 className='text-base font-bold leading-tight text-card-foreground'>
                    {practiceLocation.clinicName}
                  </h3>
                  <p className='text-xs font-semibold text-muted-foreground mt-0.5'>
                    {practiceLocation.city}, Indonesia
                  </p>
                </div>
              </div>

              <Button asChild variant='link' className='text-sm font-semibold text-primary px-2'>
                <a href={`https://maps.google.com/maps?q=${urlLocation}`} target='_blank' rel='noopener noreferrer'>
                  See Map
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
