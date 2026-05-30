import { useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { ImageServer } from '@/components/image-server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { useAppForm } from '@/utils/hooks/use-app-form';

import {
  type CreateDoctorFormDto,
  createDoctorSchema,
  type UpdateDoctorFormDto,
  updateDoctorSchema,
} from '../doctor.schema';
import type { Doctor } from '../doctor.type';

type DoctorFormProps = {
  mode: 'create' | 'edit';
  initialValue?: Doctor;
  isSubmitting: boolean;
  specialistOptions: ComboboxOption[];
  cityOptions: ComboboxOption[];
  availableUserOptions?: ComboboxOption[];
  isSpecialistsLoading?: boolean;
  isCitiesLoading?: boolean;
  isUsersLoading?: boolean;
  onSpecialistSearchChange?: (value: string) => void;
  onCitySearchChange?: (value: string) => void;
  onUserSearchChange?: (value: string) => void;
  onSubmit: (payload: FormData) => void;
};

type ComboboxOption = {
  value: string;
  label: string;
};

type FormValues = {
  userId: string;
  fullName: string;
  specialist: string;
  profilePhoto: File | undefined;
  experienceYears: number | undefined;
  description: string;
  practiceLocation: {
    clinicName: string;
    address: string;
    city: string;
  };
  consultationFee: number | undefined;
  isAvailable: boolean;
};

const buildDefaultValues = (value?: Doctor): FormValues => ({
  userId: '',
  fullName: value?.fullName ?? '',
  specialist: value?.specialist._id ?? '',
  profilePhoto: undefined,
  experienceYears: typeof value?.experienceYears === 'number' ? value.experienceYears : undefined,
  description: value?.description ?? '',
  practiceLocation: {
    clinicName: value?.practiceLocation.clinicName ?? '',
    address: value?.practiceLocation.address ?? '',
    city: value?.practiceLocation.city ?? '',
  },
  consultationFee: typeof value?.consultationFee === 'number' ? value.consultationFee : undefined,
  isAvailable: value?.isAvailable ?? true,
});

const toCreateFormData = (value: CreateDoctorFormDto): FormData => {
  const formData = new FormData();

  formData.append('userId', value.userId);
  formData.append('fullName', value.fullName.trim());
  formData.append('specialist', value.specialist);
  formData.append('practiceLocation', JSON.stringify(value.practiceLocation));
  formData.append('consultationFee', String(value.consultationFee));

  if (typeof value.experienceYears === 'number') {
    formData.append('experienceYears', String(value.experienceYears));
  }

  if (value.description) {
    formData.append('description', value.description.trim());
  }

  if (typeof value.isAvailable === 'boolean') {
    formData.append('isAvailable', String(value.isAvailable));
  }

  if (value.profilePhoto instanceof File) {
    formData.append('profilePhoto', value.profilePhoto);
  }

  return formData;
};

const toUpdateFormData = (value: UpdateDoctorFormDto): FormData => {
  const formData = new FormData();

  if (typeof value.fullName === 'string') {
    formData.append('fullName', value.fullName.trim());
  }

  if (typeof value.specialist === 'string') {
    formData.append('specialist', value.specialist);
  }

  if (typeof value.practiceLocation === 'object') {
    formData.append('practiceLocation', JSON.stringify(value.practiceLocation));
  }

  if (typeof value.consultationFee === 'number') {
    formData.append('consultationFee', String(value.consultationFee));
  }

  if (typeof value.experienceYears === 'number') {
    formData.append('experienceYears', String(value.experienceYears));
  }

  if (typeof value.description === 'string') {
    formData.append('description', value.description.trim());
  }

  if (typeof value.isAvailable === 'boolean') {
    formData.append('isAvailable', String(value.isAvailable));
  }

  if (value.profilePhoto instanceof File) {
    formData.append('profilePhoto', value.profilePhoto);
  }

  return formData;
};

export function DoctorForm({
  mode,
  initialValue,
  isSubmitting,
  specialistOptions,
  cityOptions,
  availableUserOptions = [],
  isSpecialistsLoading = false,
  isCitiesLoading = false,
  isUsersLoading = false,
  onSpecialistSearchChange,
  onCitySearchChange,
  onUserSearchChange,
  onSubmit,
}: DoctorFormProps) {
  const subtitle = useMemo(() => {
    if (mode === 'create') {
      return 'Create a doctor profile from a registered account and upload doctor photo.';
    }

    return 'Update doctor profile details. User role is not changed in this form.';
  }, [mode]);

  const form = useAppForm({
    defaultValues: buildDefaultValues(initialValue),
    onSubmit: ({ value }) => {
      if (mode === 'create') {
        const parsed = createDoctorSchema.safeParse(value);

        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
          return;
        }

        onSubmit(toCreateFormData(parsed.data));
        return;
      }

      const parsed = updateDoctorSchema.safeParse(value);

      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
        return;
      }

      onSubmit(toUpdateFormData(parsed.data));
    },
  });

  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>{mode === 'create' ? 'Create Doctor' : 'Edit Doctor'}</CardTitle>
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
            {mode === 'create' ? (
              <form.Field
                name='userId'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='doctor-user'>Registered User</FieldLabel>
                    <Combobox
                      items={availableUserOptions}
                      value={availableUserOptions.find((item) => item.value === field.state.value) ?? null}
                      onValueChange={(value) => field.handleChange(value?.value ?? '')}
                      onInputValueChange={(value) => {
                        onUserSearchChange?.(value);
                      }}
                      itemToStringLabel={(item) => item.label}
                      itemToStringValue={(item) => item.value}
                    >
                      <ComboboxInput id='doctor-user' placeholder='Search and select user' showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No user found.</ComboboxEmpty>
                        <ComboboxList>
                          {isUsersLoading ? (
                            <p className='px-2 py-1.5 text-xs text-muted-foreground'>Loading users...</p>
                          ) : null}
                          <ComboboxCollection>
                            {(item: ComboboxOption) => (
                              <ComboboxItem key={item.value} value={item}>
                                {item.label}
                              </ComboboxItem>
                            )}
                          </ComboboxCollection>
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {!availableUserOptions.length ? (
                      <p className='text-xs text-muted-foreground'>No eligible user available.</p>
                    ) : null}
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />
            ) : null}

            <form.Field
              name='fullName'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='doctor-fullName'>Full Name</FieldLabel>
                  <Input
                    id='doctor-fullName'
                    value={field.state.value}
                    placeholder='Dr. Jane Doe'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Field
              name='specialist'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='doctor-specialist'>Specialist</FieldLabel>
                  <Combobox
                    items={specialistOptions}
                    value={specialistOptions.find((item) => item.value === field.state.value) ?? null}
                    onValueChange={(value) => field.handleChange(value?.value ?? '')}
                    onInputValueChange={(value) => {
                      onSpecialistSearchChange?.(value);
                    }}
                    itemToStringLabel={(item) => item.label}
                    itemToStringValue={(item) => item.value}
                  >
                    <ComboboxInput id='doctor-specialist' placeholder='Search and select specialist' showClear />
                    <ComboboxContent>
                      <ComboboxEmpty>No specialist found.</ComboboxEmpty>
                      <ComboboxList>
                        {isSpecialistsLoading ? (
                          <p className='px-2 py-1.5 text-xs text-muted-foreground'>Loading specialists...</p>
                        ) : null}
                        <ComboboxCollection>
                          {(item: ComboboxOption) => (
                            <ComboboxItem key={item.value} value={item}>
                              {item.label}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Field
              name='profilePhoto'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='doctor-profilePhoto'>Profile Photo (Optional)</FieldLabel>
                  <Input
                    id='doctor-profilePhoto'
                    type='file'
                    accept='image/png,image/jpeg,image/webp,image/svg+xml'
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      field.handleChange(file);
                    }}
                  />
                  {field.state.value instanceof File ? (
                    <p className='text-xs text-muted-foreground'>Selected file: {field.state.value.name}</p>
                  ) : null}
                  {mode === 'edit' && initialValue?.profilePhoto ? (
                    <div className='mt-2 flex items-center gap-3 rounded-lg border p-2'>
                      <ImageServer
                        src={initialValue.profilePhoto}
                        alt={initialValue.fullName}
                        className='size-12 rounded-md object-cover'
                      />
                      <p className='text-xs text-muted-foreground'>Current file: {initialValue.profilePhoto}</p>
                    </div>
                  ) : null}
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <div className='grid gap-4 md:grid-cols-2'>
              <form.Field
                name='experienceYears'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='doctor-experienceYears'>Experience Years (Optional)</FieldLabel>
                    <Input
                      id='doctor-experienceYears'
                      type='number'
                      min={0}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        field.handleChange(nextValue === '' ? undefined : Number(nextValue));
                      }}
                    />
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />

              <form.Field
                name='consultationFee'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='doctor-consultationFee'>Consultation Fee</FieldLabel>
                    <Input
                      id='doctor-consultationFee'
                      type='number'
                      min={0}
                      value={field.state.value ?? ''}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        field.handleChange(nextValue === '' ? undefined : Number(nextValue));
                      }}
                    />
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />
            </div>

            <form.Field
              name='description'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='doctor-description'>Description (Optional)</FieldLabel>
                  <Textarea
                    id='doctor-description'
                    value={field.state.value}
                    rows={4}
                    placeholder='Add short doctor profile summary.'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <div className='rounded-xl border p-4'>
              <p className='mb-3 text-sm font-semibold'>Practice Location</p>
              <div className='grid gap-4 md:grid-cols-3'>
                <form.Field
                  name='practiceLocation.clinicName'
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor='doctor-clinicName'>Clinic Name</FieldLabel>
                      <Input
                        id='doctor-clinicName'
                        value={field.state.value}
                        placeholder='Sehat Clinic'
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {!field.state.meta.isValid && (
                        <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <form.Field
                  name='practiceLocation.address'
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor='doctor-address'>Address</FieldLabel>
                      <Input
                        id='doctor-address'
                        value={field.state.value}
                        placeholder='Jl. Kesehatan No. 1'
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {!field.state.meta.isValid && (
                        <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <form.Field
                  name='practiceLocation.city'
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor='doctor-city'>City</FieldLabel>
                      <Combobox
                        items={cityOptions}
                        value={cityOptions.find((item) => item.value === field.state.value) ?? null}
                        onValueChange={(value) => field.handleChange(value?.value ?? '')}
                        onInputValueChange={(value) => {
                          field.handleChange(value);
                          onCitySearchChange?.(value);
                        }}
                        itemToStringLabel={(item) => item.label}
                        itemToStringValue={(item) => item.value}
                      >
                        <ComboboxInput id='doctor-city' placeholder='Search city or type a new one' showClear />
                        <ComboboxContent>
                          <ComboboxEmpty>No city found. Keep typing to use a new city.</ComboboxEmpty>
                          <ComboboxList>
                            {isCitiesLoading ? (
                              <p className='px-2 py-1.5 text-xs text-muted-foreground'>Loading cities...</p>
                            ) : null}
                            <ComboboxCollection>
                              {(item: ComboboxOption) => (
                                <ComboboxItem key={item.value} value={item}>
                                  {item.label}
                                </ComboboxItem>
                              )}
                            </ComboboxCollection>
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                      {!field.state.meta.isValid && (
                        <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>

            <form.Field
              name='isAvailable'
              children={(field) => (
                <div className='flex items-center justify-between rounded-lg border p-3'>
                  <div>
                    <p className='text-sm font-medium'>Availability Status</p>
                    <p className='text-xs text-muted-foreground'>Control whether doctor appears as available.</p>
                  </div>
                  <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([formSubmitting]) => (
                <div className='flex flex-wrap gap-2'>
                  <Button
                    type='submit'
                    disabled={isSubmitting || formSubmitting || (mode === 'create' && !availableUserOptions.length)}
                  >
                    {isSubmitting || formSubmitting ? <Loader2 className='size-4 animate-spin' /> : null}
                    {mode === 'create' ? 'Create Doctor' : 'Save Changes'}
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
