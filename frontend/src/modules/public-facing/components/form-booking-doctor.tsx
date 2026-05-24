import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { format, getDay, isBefore, startOfDay } from 'date-fns';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

import { appointmentMutationOptions } from '@/modules/appointments/appointment.query';

import { useAppForm } from '@/utils/hooks/use-app-form';
import { dayMapping } from '@/utils/utils';

import { createAppointmentSchema } from '../schemas/public-facing.schema';
import type { CreateAppointmentDto } from '../types/public-facing.type';

type ScheduleOption = {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export function FormBookingDoctor({
  scheduleOptions,
  doctorId,
}: {
  scheduleOptions: ScheduleOption[];
  doctorId: string;
}) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<ScheduleOption | null>(null);
  const createAppointmentMutation = useMutation(appointmentMutationOptions.create());

  const form = useAppForm({
    defaultValues: {
      doctor: doctorId,
      appointmentDate: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      reason: '',
    } as CreateAppointmentDto,
    validators: {
      onSubmit: createAppointmentSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await createAppointmentMutation.mutateAsync(value);

      if (response.status === 'success') {
        toast.success('Appointment created successfully');
        return;
      }

      toast.error(response.message);
    },
  });

  const availableDaysString = Array.from(new Set(scheduleOptions.filter((s) => s.isAvailable).map((s) => s.day)));

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTimeSlot(null);
      form.setFieldValue('appointmentDate', format(date, 'yyyy-MM-dd'));
      form.setFieldValue('startTime', '');
      form.setFieldValue('endTime', '');
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());

    if (isBefore(date, today)) return true;

    const dayName = dayMapping[getDay(date)];

    return !availableDaysString.includes(dayName);
  };

  const getTimeSlotsForDate = (date: Date | undefined) => {
    if (!date) return [];

    const dayName = dayMapping[getDay(date)];

    return scheduleOptions.filter((slot) => slot.day === dayName && slot.isAvailable);
  };

  const availableTimeSlots = getTimeSlotsForDate(selectedDate);

  const handleTimeSelect = (value: string) => {
    const selectedSlot = availableTimeSlots.find((slot) => `${slot.startTime}-${slot.endTime}` === value) || null;

    setSelectedTimeSlot(selectedSlot);

    form.setFieldValue('startTime', selectedSlot?.startTime ?? '');
    form.setFieldValue('endTime', selectedSlot?.endTime ?? '');
  };

  return (
    <Card className='shadow-sm rounded-3xl'>
      <CardHeader>
        <CardTitle>
          <h2 className='text-xl font-bold leading-[25.2px] text-gray-900'>Make Appointment</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name='appointmentDate'
              children={(field) => (
                <Field>
                  <div className='flex w-full items-center justify-between rounded-3xl border border-gray-200 bg-[#2C40FF08] p-6'>
                    <div>
                      <h3 className='mb-0.5 text-lg font-bold leading-[22.68px] text-gray-900'>
                        {format(selectedDate, 'dd MMMM yyyy')}
                      </h3>
                      <p className='font-semibold leading-[20.16px] text-gray-500'>
                        Doctor {isDateDisabled(selectedDate) ? 'Unavailable' : 'Available'}
                      </p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant='ghost'>
                          <img src='/assets/icons/doctordetails-doctor-available.svg' alt='Icon' loading='lazy' />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={isDateDisabled}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name='startTime'
              children={(field) => (
                <Field>
                  <div className='flex flex-col gap-3'>
                    <Label className='text-base font-semibold leading-[20.16px] text-gray-500'>
                      Set The Appointment Time.
                    </Label>

                    {availableTimeSlots.length > 0 ? (
                      <RadioGroup
                        value={selectedTimeSlot ? `${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}` : ''}
                        onValueChange={handleTimeSelect}
                        className='flex flex-col gap-2'
                      >
                        {availableTimeSlots.map((slot, index) => {
                          const value = `${slot.startTime}-${slot.endTime}`;

                          return (
                            <FieldLabel key={index} htmlFor={value} className='rounded-full! cursor-pointer'>
                              <Field orientation='horizontal'>
                                <FieldContent>
                                  <FieldDescription className='flex row items-center gap-3'>
                                    <img
                                      src='/assets/image/bookingconfirm-clock-nonactive.png'
                                      alt='Image'
                                      className='size-6'
                                      loading='lazy'
                                    />
                                    <p className='text-base font-semibold leading-[20.16px]'>
                                      {slot.startTime} - {slot.endTime}
                                    </p>
                                  </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value={value} id={value} className='size-6' />
                              </Field>
                            </FieldLabel>
                          );
                        })}
                      </RadioGroup>
                    ) : (
                      <div className='text-sm text-muted-foreground'>No slots available.</div>
                    )}
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name='reason'
              children={(field) => (
                <Field>
                  <Label htmlFor='reason' className='text-base font-semibold leading-[20.16px] text-gray-500'>
                    Reason (Optional)
                  </Label>
                  <Textarea
                    id='reason'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Tell the doctor your complaint or purpose of visit'
                    maxLength={500}
                    className='min-h-24 rounded-2xl'
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <Button type='submit' disabled={createAppointmentMutation.isPending} className='rounded-full'>
              {createAppointmentMutation.isPending ? 'Submitting...' : 'Submit Appointment'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
