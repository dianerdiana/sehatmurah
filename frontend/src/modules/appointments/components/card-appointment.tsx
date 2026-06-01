import { Link } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { getPartyName } from '@/utils/appointment-party';
import { formatAppointmentDate, formatAppointmentTime, formatCurrency } from '@/utils/utils';

import { AppointmentStatus } from '@/types/enums/appointment-status.enum';

import type { Appointment, AppointmentDoctorParty, AppointmentSpecialistParty } from '../appointment.type';
import { appointmentStatusBadgeVariants, appointmentStatusLabels } from '../appointment-status';

type CardAppointmentProps = {
  appointment: Appointment;
};

const getDoctorParty = (doctor: Appointment['doctor']): AppointmentDoctorParty | null => {
  if (typeof doctor === 'string') {
    return null;
  }

  return doctor;
};

const getSpecialistName = (specialist: string | AppointmentSpecialistParty | undefined) => {
  if (!specialist || typeof specialist === 'string') {
    return 'Specialist not available';
  }

  return specialist.name;
};

export function CardAppointment({ appointment }: CardAppointmentProps) {
  const doctor = getDoctorParty(appointment.doctor);
  const doctorName = doctor?.fullName ?? getPartyName(appointment.doctor);
  const specialistName = getSpecialistName(doctor?.specialist);

  return (
    <Card className='rounded-3xl bg-white py-0 shadow-none border-none'>
      <CardContent className='space-y-4 px-4 py-4'>
        <header className='flex items-start gap-3'>
          {doctor ? (
            <Avatar className='size-14 shrink-0 rounded-2xl bg-gray-200 p-1'>
              {doctor.profilePhoto ? (
                <AvatarImage
                  loading='lazy'
                  serverImage
                  src={doctor.profilePhoto}
                  alt={doctorName}
                  className='object-cover'
                />
              ) : null}
              <AvatarFallback className='rounded-2xl bg-primary-light text-base font-semibold text-primary'>
                {doctor.fullName[0].toUpperCase() ?? 'D'}
              </AvatarFallback>
            </Avatar>
          ) : null}

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-start justify-between gap-2'>
              <div className='py-1 space-y-1'>
                <p className='truncate text-lg font-bold leading-tight text-gray-900'>{doctorName}</p>
                <p className='truncate text-sm font-semibold text-gray-500'>{specialistName}</p>
              </div>
              <Badge variant={appointmentStatusBadgeVariants[appointment.status]} className='shrink-0'>
                {appointmentStatusLabels[appointment.status]}
              </Badge>
            </div>
          </div>
        </header>

        <div className='grid gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4'>
          <div className='min-w-0'>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Booking Code</p>
            <h2 className='truncate text-base font-bold text-gray-900'>{appointment.bookingCode}</h2>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Appointment Date</p>
              <p className='mt-1 text-sm font-bold text-gray-900'>
                {formatAppointmentDate(appointment.appointmentDate)}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Time</p>
              <p className='mt-1 text-sm font-bold text-gray-900'>
                {formatAppointmentTime(appointment.startTime)} - {formatAppointmentTime(appointment.endTime)}
              </p>
            </div>
          </div>

          {appointment.reason ? (
            <div>
              <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Reason</p>
              <p className='mt-1 text-sm font-medium leading-relaxed text-gray-700 line-clamp-2'>
                {appointment.reason}
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className='flex items-center justify-between gap-2 border-t border-gray-100 px-4 py-4'>
        <p className='text-base font-bold text-accent-red'>{formatCurrency(doctor?.consultationFee || 0)}</p>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            className='px-5 rounded-full'
            hidden={appointment.status !== AppointmentStatus.COMPLETED}
          >
            <Link to='/reviews/$appointmentId/create' params={{ appointmentId: appointment._id }}>
              Review
            </Link>
          </Button>
          <Button asChild className='px-5 rounded-full'>
            <Link to='/appointments/$appointmentId/details' params={{ appointmentId: appointment._id }}>
              Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function CardAppointmentSkeleton() {
  return (
    <Card className='rounded-3xl bg-white py-0 shadow-sm animate-pulse'>
      <CardContent className='space-y-4 px-4 py-5'>
        <header className='flex items-start gap-3'>
          <Skeleton className='size-14 shrink-0 rounded-2xl' />

          <div className='min-w-0 flex-1 space-y-3'>
            <div className='flex items-start justify-between gap-2'>
              <div className='space-y-2'>
                <Skeleton className='h-3 w-24 rounded-full' />
                <Skeleton className='h-5 w-28 rounded-full' />
              </div>
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-40 rounded-full' />
              <Skeleton className='h-4 w-28 rounded-full' />
            </div>
          </div>
        </header>

        <div className='grid gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4'>
          <div className='flex items-center justify-between gap-3'>
            <div className='space-y-2'>
              <Skeleton className='h-3 w-28 rounded-full' />
              <Skeleton className='h-4 w-32 rounded-full' />
            </div>
            <div className='space-y-2 text-right'>
              <Skeleton className='h-3 w-14 rounded-full' />
              <Skeleton className='h-4 w-28 rounded-full' />
            </div>
          </div>
          <Skeleton className='h-10 w-full rounded-2xl' />
        </div>
      </CardContent>

      <CardFooter className='flex items-center justify-between gap-2 border-t border-gray-100 px-4 py-4'>
        <Skeleton className='h-4 w-40 rounded-full' />
        <Skeleton className='h-4 w-16 rounded-full' />
      </CardFooter>
    </Card>
  );
}

export function CardAppointmentNotFound() {
  return (
    <div className='flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center'>
      <div className='mb-5 flex size-16 items-center justify-center rounded-full bg-gray-100 text-gray-400'>
        <SearchX className='size-8 text-gray-400' />
      </div>

      <h3 className='text-xl font-bold leading-7 text-gray-900'>No Appointments Found</h3>
      <p className='mt-2 max-w-sm text-base font-medium leading-relaxed text-gray-500'>
        We couldn't find any appointments that match your current search or filter settings.
      </p>
    </div>
  );
}
