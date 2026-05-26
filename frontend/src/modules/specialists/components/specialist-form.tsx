import { useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { useAppForm } from '@/utils/hooks/use-app-form';

import { createSpecialistSchema, type SpecialistAssetInput, updateSpecialistSchema } from '../specialist.schema';
import type { Specialist } from '../specialist.type';

type SpecialistFormProps = {
  mode: 'create' | 'edit';
  initialValue?: Specialist;
  isSubmitting: boolean;
  onSubmit: (payload: FormData) => void;
};

type FormValues = {
  name: string;
  slug: string;
  description: string;
  icon: SpecialistAssetInput;
  image: SpecialistAssetInput;
  sortOrder: number | undefined;
  isActive: boolean;
};

type SpecialistSubmitValue = {
  name?: string;
  slug?: string;
  description?: string;
  icon?: SpecialistAssetInput;
  image?: SpecialistAssetInput;
  sortOrder?: number;
  isActive?: boolean;
};

const buildDefaultValues = (value?: Specialist): FormValues => ({
  name: value?.name ?? '',
  slug: value?.slug ?? '',
  description: value?.description ?? '',
  icon: value?.icon,
  image: value?.image,
  sortOrder: value?.sortOrder,
  isActive: value?.isActive ?? true,
});

const toFormData = (values: SpecialistSubmitValue): FormData => {
  const formData = new FormData();

  if (typeof values.name === 'string' && values.name.trim()) {
    formData.append('name', values.name.trim());
  }

  if (typeof values.slug === 'string' && values.slug.trim()) {
    formData.append('slug', values.slug.trim());
  }

  if (typeof values.description === 'string' && values.description.trim()) {
    formData.append('description', values.description.trim());
  }

  if (values.icon instanceof File) {
    formData.append('icon', values.icon);
  } else if (typeof values.icon === 'string' && values.icon.trim()) {
    formData.append('icon', values.icon.trim());
  }

  if (values.image instanceof File) {
    formData.append('image', values.image);
  } else if (typeof values.image === 'string' && values.image.trim()) {
    formData.append('image', values.image.trim());
  }

  if (typeof values.isActive === 'boolean') {
    formData.append('isActive', String(values.isActive));
  }

  if (typeof values.sortOrder === 'number') {
    formData.append('sortOrder', String(values.sortOrder));
  }

  return formData;
};

export function SpecialistForm({ mode, initialValue, isSubmitting, onSubmit }: SpecialistFormProps) {
  const subtitle = useMemo(() => {
    if (mode === 'create') {
      return 'Create a new specialist category and provide the metadata shown in public search.';
    }

    return 'Update specialist information and keep media assets in sync.';
  }, [mode]);

  const form = useAppForm({
    defaultValues: buildDefaultValues(initialValue),
    onSubmit: ({ value }) => {
      if (mode === 'create') {
        const parsed = createSpecialistSchema.safeParse(value);

        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
          return;
        }

        onSubmit(toFormData(parsed.data));
        return;
      }

      const parsed = updateSpecialistSchema.safeParse(value);

      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
        return;
      }

      onSubmit(toFormData(parsed.data));
    },
  });

  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>
          {mode === 'create' ? 'Create Specialist' : 'Edit Specialist'}
        </CardTitle>
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
              name='name'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='specialist-name'>Name</FieldLabel>
                  <Input
                    id='specialist-name'
                    value={field.state.value}
                    placeholder='Cardiology'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Field
              name='slug'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='specialist-slug'>Slug (Optional)</FieldLabel>
                  <Input
                    id='specialist-slug'
                    value={field.state.value}
                    placeholder='cardiology'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Field
              name='description'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='specialist-description'>Description (Optional)</FieldLabel>
                  <Textarea
                    id='specialist-description'
                    value={field.state.value}
                    placeholder='Describe what this specialist category covers.'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    rows={4}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <form.Field
                name='sortOrder'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='specialist-sort-order'>Sort Order</FieldLabel>
                    <Input
                      id='specialist-sort-order'
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
                name='isActive'
                children={(field) => (
                  <div className='flex items-center justify-between rounded-lg border p-3'>
                    <div>
                      <p className='text-sm font-medium'>Active Status</p>
                      <p className='text-xs text-muted-foreground'>
                        Controls specialist visibility in dashboard filters.
                      </p>
                    </div>
                    <Switch checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked)} />
                  </div>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <form.Field
                name='image'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='specialist-image'>Image</FieldLabel>
                    <Input
                      id='specialist-image'
                      type='file'
                      accept='image/png,image/jpeg,image/webp,image/svg+xml'
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.handleChange(file ?? field.state.value);
                      }}
                    />
                    {typeof field.state.value === 'string' ? (
                      <p className='text-xs text-muted-foreground'>Current file: {field.state.value}</p>
                    ) : field.state.value instanceof File ? (
                      <p className='text-xs text-muted-foreground'>Selected file: {field.state.value.name}</p>
                    ) : null}
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />

              <form.Field
                name='icon'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='specialist-icon'>Icon</FieldLabel>
                    <Input
                      id='specialist-icon'
                      type='file'
                      accept='image/png,image/jpeg,image/webp,image/svg+xml'
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.handleChange(file ?? field.state.value);
                      }}
                    />
                    {typeof field.state.value === 'string' ? (
                      <p className='text-xs text-muted-foreground'>Current file: {field.state.value}</p>
                    ) : field.state.value instanceof File ? (
                      <p className='text-xs text-muted-foreground'>Selected file: {field.state.value.name}</p>
                    ) : null}
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />
            </div>

            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([formSubmitting]) => (
                <div className='flex flex-wrap gap-2'>
                  <Button type='submit' disabled={isSubmitting || formSubmitting}>
                    {isSubmitting || formSubmitting ? <Loader2 className='size-4 animate-spin' /> : null}
                    {mode === 'create' ? 'Create Specialist' : 'Save Changes'}
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
