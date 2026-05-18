import { CalendarDays, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { DoctorSchedule } from '@/types/doctor.type';

export function CardAvailableSchedule({ schedules }: { schedules: DoctorSchedule[] }) {
  const groupedSchedules = schedules.reduce(
    (acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    },
    {} as Record<string, DoctorSchedule[]>,
  );

  return (
    <Card className='w-full shadow-md rounded-3xl border-0'>
      <CardHeader className='space-y-1'>
        <div className='flex items-center space-x-2'>
          <CalendarDays className='h-5 w-5' />
          <CardTitle className='text-xl'>Available Schedule</CardTitle>
        </div>
        <CardDescription>Please select the available operating hours below.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        {Object.entries(groupedSchedules).map(([day, slots]) => (
          <div
            key={day}
            className='flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-muted bg-card hover:bg-accent/40 transition-colors gap-3'
          >
            <p className='font-medium text-sm sm:text-base text-card-foreground lowercase first-letter:uppercase'>
              {day}
            </p>

            <div className='flex flex-wrap gap-2 sm:justify-end'>
              {slots.map((slot, index) => (
                <Badge
                  key={index}
                  variant={slot.isAvailable ? 'secondary' : 'destructive'}
                  className='flex items-center gap-1.5 px-2.5 py-1 font-normal text-xs'
                >
                  <Clock className='h-3 w-3 text-muted-foreground' />
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
