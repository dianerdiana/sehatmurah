import { useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useAppForm } from '@/utils/hooks/use-app-form';

import { Gender } from '@/types/enums/gender.enum';

import { type UpdatePatientDto, updatePatientSchema } from '../patient.schema';
import type { PatientProfile } from '../patient.type';

type PatientFormProps = {
  initialValue: PatientProfile;
  isSubmitting: boolean;
  onSubmit: (payload: UpdatePatientDto) => void;
};

type FormValues = {
  fullName: string;
  dateOfBirth: string;
  gender: '' | Gender;
  phoneNumber: string;
  address: string;
};

const toDateInputValue = (value?: string) => {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toISOString().slice(0, 10);
};

const buildDefaultValues = (value: PatientProfile): FormValues => ({
  fullName: value.fullName,
  dateOfBirth: toDateInputValue(value.dateOfBirth),
  gender: value.gender ?? '',
  phoneNumber: value.phoneNumber ?? '',
  address: value.address ?? '',
});

const dateOnly = (value?: string) => {
  if (!value) return '';

  return toDateInputValue(value);
};

export function PatientForm({ initialValue, isSubmitting, onSubmit }: PatientFormProps) {
  const subtitle = useMemo(() => {
    return 'Update patient biodata and contact details.';
  }, []);

  const form = useAppForm({
    defaultValues: buildDefaultValues(initialValue),
    onSubmit: ({ value }) => {
      const payload: Record<string, unknown> = {};

      const fullName = value.fullName.trim();
      if (fullName !== initialValue.fullName.trim()) {
        payload.fullName = fullName;
      }

      if (dateOnly(value.dateOfBirth) !== dateOnly(initialValue.dateOfBirth)) {
        if (value.dateOfBirth) {
          payload.dateOfBirth = value.dateOfBirth;
        }
      }

      if ((value.gender || undefined) !== initialValue.gender) {
        if (value.gender) {
          payload.gender = value.gender;
        }
      }

      const nextPhone = value.phoneNumber.trim();
      if (nextPhone !== (initialValue.phoneNumber ?? '').trim()) {
        payload.phoneNumber = nextPhone;
      }

      const nextAddress = value.address.trim();
      if (nextAddress !== (initialValue.address ?? '').trim()) {
        payload.address = nextAddress;
      }

      const parsed = updatePatientSchema.safeParse(payload);

      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
        return;
      }

      onSubmit(parsed.data);
    },
  });

  return (
    <Card className='rounded-3xl border-none'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Edit Patient</CardTitle>
        <p className='text-sm text-muted-foreground'>{subtitle}</p>
      </CardHeader>
      <CardContent>
        <form
          className='grid gap-5'
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name='fullName'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='patient-fullName'>Full Name</FieldLabel>
                  <Input
                    id='patient-fullName'
                    value={field.state.value}
                    placeholder='Patient full name'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <div className='grid gap-4 md:grid-cols-2'>
              <form.Field
                name='dateOfBirth'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='patient-dateOfBirth'>Date of Birth</FieldLabel>
                    <Input
                      id='patient-dateOfBirth'
                      type='date'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />

              <form.Field
                name='gender'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='patient-gender'>Gender</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value as Gender | '')}
                    >
                      <SelectTrigger id='patient-gender'>
                        <SelectValue placeholder='Select gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Gender.MALE}>Male</SelectItem>
                        <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />
            </div>

            <form.Field
              name='phoneNumber'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='patient-phoneNumber'>Phone Number</FieldLabel>
                  <Input
                    id='patient-phoneNumber'
                    value={field.state.value}
                    placeholder='081234567890'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Field
              name='address'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='patient-address'>Address</FieldLabel>
                  <Textarea
                    id='patient-address'
                    value={field.state.value}
                    rows={4}
                    placeholder='Patient address'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([formSubmitting]) => (
                <div className='flex flex-wrap gap-2'>
                  <Button type='submit' disabled={isSubmitting || formSubmitting}>
                    {isSubmitting || formSubmitting ? <Loader2 className='size-4 animate-spin' /> : null}
                    Save Changes
                  </Button>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
