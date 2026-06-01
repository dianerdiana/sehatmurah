import { useState } from 'react';

import { Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useAppForm } from '@/utils/hooks/use-app-form';

import { DOCTOR_SCHEDULE_DAYS, type UpdateDoctorScheduleDto, updateDoctorScheduleSchema } from '../doctor.schema';
import type { DoctorSchedule } from '../doctor.type';

type DoctorScheduleFormProps = {
  initialSchedule: DoctorSchedule[];
  isSubmitting: boolean;
  onSubmit: (payload: UpdateDoctorScheduleDto) => void;
  title?: string;
  description?: string;
  submitLabel?: string;
};

type DayValue = (typeof DOCTOR_SCHEDULE_DAYS)[number];

type ScheduleRow = {
  id: string;
  day: DayValue;
  startTime: string;
  endTime: string;
};

const DAY_LABELS: Record<DayValue, string> = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};

const createRow = (value?: Partial<DoctorSchedule>): ScheduleRow => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  day: DOCTOR_SCHEDULE_DAYS.includes(value?.day as DayValue) ? (value?.day as DayValue) : 'MONDAY',
  startTime: value?.startTime ?? '',
  endTime: value?.endTime ?? '',
});

const toMinutes = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);

  return hour * 60 + minute;
};

const toSchedulePayload = (rows: ScheduleRow[]): UpdateDoctorScheduleDto['schedule'] =>
  rows.map((row) => ({
    day: row.day,
    startTime: row.startTime,
    endTime: row.endTime,
    isAvailable: true,
  }));

export function DoctorScheduleForm({
  initialSchedule,
  isSubmitting,
  onSubmit,
  title = 'Doctor Schedule',
  description = 'Set available practice hours per day.',
  submitLabel = 'Save Schedule',
}: DoctorScheduleFormProps) {
  const [rows, setRows] = useState<ScheduleRow[]>(() =>
    initialSchedule.length ? initialSchedule.map((item) => createRow(item)) : [createRow()],
  );
  const [formError, setFormError] = useState('');
  const [rowErrors, setRowErrors] = useState<Record<number, string[]>>({});

  const form = useAppForm({
    defaultValues: {
      schedule: toSchedulePayload(rows),
    } satisfies UpdateDoctorScheduleDto,
    validators: {
      onSubmit: updateDoctorScheduleSchema,
    },
    onSubmit: ({ value }) => {
      const checked = validateSchedule(value);
      const hasRowErrors = Object.keys(checked.rowErrors).length > 0;

      setRowErrors(checked.rowErrors);
      setFormError(checked.formError);

      if (checked.formError || hasRowErrors) {
        toast.error(checked.formError || 'Please fix schedule errors before saving.');
        return;
      }

      onSubmit(value);
    },
  });

  const syncScheduleWithForm = (nextRows: ScheduleRow[]) => {
    form.setFieldValue('schedule', toSchedulePayload(nextRows));
  };

  const handleRowChange = (index: number, key: keyof Omit<ScheduleRow, 'id'>, value: string | DayValue) => {
    setRows((prev) => {
      const nextRows = prev.map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row));

      syncScheduleWithForm(nextRows);
      return nextRows;
    });
  };

  const handleAddRow = () => {
    setRows((prev) => {
      const nextRows = [...prev, createRow()];

      syncScheduleWithForm(nextRows);
      return nextRows;
    });
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length === 1) {
      return;
    }

    setRows((prev) => {
      const nextRows = prev.filter((_, rowIndex) => rowIndex !== index);

      syncScheduleWithForm(nextRows);
      return nextRows;
    });
  };

  const validateSchedule = (payload: UpdateDoctorScheduleDto) => {
    const nextRowErrors: Record<number, string[]> = {};

    if (payload.schedule.length < 1) {
      return {
        rowErrors: nextRowErrors,
        formError: 'At least one schedule row is required.',
      };
    }

    payload.schedule.forEach((item, index) => {
      if (toMinutes(item.endTime) <= toMinutes(item.startTime)) {
        nextRowErrors[index] = [...(nextRowErrors[index] ?? []), 'End time must be later than start time.'];
      }
    });

    const byDay = new Map<string, Array<{ index: number; start: number; end: number }>>();

    payload.schedule.forEach((item, index) => {
      const list = byDay.get(item.day) ?? [];
      list.push({ index, start: toMinutes(item.startTime), end: toMinutes(item.endTime) });
      byDay.set(item.day, list);
    });

    byDay.forEach((items, day) => {
      const sorted = [...items].sort((a, b) => a.start - b.start);

      for (let i = 1; i < sorted.length; i += 1) {
        const prev = sorted[i - 1];
        const current = sorted[i];

        if (current.start < prev.end) {
          const overlapMessage = `Time range overlaps on ${DAY_LABELS[day as keyof typeof DAY_LABELS]}.`;

          nextRowErrors[prev.index] = [...(nextRowErrors[prev.index] ?? []), overlapMessage];
          nextRowErrors[current.index] = [...(nextRowErrors[current.index] ?? []), overlapMessage];
        }
      }
    });

    return {
      rowErrors: nextRowErrors,
      formError: '',
    };
  };

  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardHeader>
      <CardContent>
        <form
          className='space-y-5'
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {rows.map((row, index) => (
              <div key={row.id} className='space-y-3 rounded-xl border p-4'>
                <div className='flex items-center justify-between gap-2'>
                  <p className='text-sm font-medium'>Row {index + 1}</p>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    disabled={rows.length === 1 || isSubmitting}
                    onClick={() => handleRemoveRow(index)}
                  >
                    <Trash2 />
                    Remove
                  </Button>
                </div>

                <div className='grid gap-3 md:grid-cols-3'>
                  <Field>
                    <FieldLabel htmlFor={`schedule-day-${row.id}`}>Day</FieldLabel>
                    <Select value={row.day} onValueChange={(value) => handleRowChange(index, 'day', value as DayValue)}>
                      <SelectTrigger id={`schedule-day-${row.id}`} className='w-full'>
                        <SelectValue placeholder='Select day' />
                      </SelectTrigger>
                      <SelectContent>
                        {DOCTOR_SCHEDULE_DAYS.map((day) => (
                          <SelectItem key={day} value={day}>
                            {DAY_LABELS[day]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor={`schedule-start-${row.id}`}>Start Time</FieldLabel>
                    <Input
                      id={`schedule-start-${row.id}`}
                      type='time'
                      value={row.startTime}
                      onChange={(event) => handleRowChange(index, 'startTime', event.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor={`schedule-end-${row.id}`}>End Time</FieldLabel>
                    <Input
                      id={`schedule-end-${row.id}`}
                      type='time'
                      value={row.endTime}
                      onChange={(event) => handleRowChange(index, 'endTime', event.target.value)}
                    />
                  </Field>
                </div>

                {rowErrors[index] ? <FieldError>{rowErrors[index].join(' ')}</FieldError> : null}
              </div>
            ))}
          </FieldGroup>

          <div className='flex flex-wrap items-center gap-3'>
            <Button type='button' variant='outline' onClick={handleAddRow} disabled={isSubmitting}>
              <Plus />
              Add Row
            </Button>

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className='animate-spin' /> : null}
              {submitLabel}
            </Button>
          </div>

          {formError ? <FieldError>{formError}</FieldError> : null}
        </form>
      </CardContent>
    </Card>
  );
}
