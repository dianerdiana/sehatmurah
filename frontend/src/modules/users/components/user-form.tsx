import { useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { useAppForm } from '@/utils/hooks/use-app-form';

import { UserRole } from '@/types/enums/user-role.enum';

import { type CreateUserDto, createUserSchema, type UpdateUserDto, updateUserSchema } from '../user.schema';
import type { UserListItem } from '../user.type';

type UserFormProps = {
  mode: 'create' | 'edit';
  initialValue?: UserListItem;
  isSelfEdit?: boolean;
  isSubmitting: boolean;
  onSubmit: (payload: CreateUserDto | UpdateUserDto) => void;
};

type FormValues = {
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  password: string;
};

const buildDefaultValues = (value?: UserListItem): FormValues => ({
  name: value?.name ?? '',
  email: value?.email ?? '',
  role: value?.role ?? UserRole.PATIENT,
  isActive: value?.isActive ?? true,
  password: '',
});

export function UserForm({ mode, initialValue, isSelfEdit = false, isSubmitting, onSubmit }: UserFormProps) {
  const subtitle = useMemo(() => {
    if (mode === 'create') {
      return 'Create a new account with role and initial status.';
    }

    return 'Update account profile, role, and status. Leave password empty to keep it unchanged.';
  }, [mode]);

  const form = useAppForm({
    defaultValues: buildDefaultValues(initialValue),
    onSubmit: ({ value }) => {
      if (mode === 'create') {
        const parsed = createUserSchema.safeParse({
          ...value,
          name: value.name.trim(),
          email: value.email.trim().toLowerCase(),
          password: value.password.trim(),
        });

        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
          return;
        }

        onSubmit(parsed.data);
        return;
      }

      const payload: UpdateUserDto = {};

      const nextName = value.name.trim();
      if (initialValue && nextName !== initialValue.name) {
        payload.name = nextName;
      }

      const nextEmail = value.email.trim().toLowerCase();
      if (initialValue && nextEmail !== initialValue.email.toLowerCase()) {
        payload.email = nextEmail;
      }

      if (initialValue && value.role !== initialValue.role) {
        payload.role = value.role;
      }

      if (initialValue && value.isActive !== initialValue.isActive) {
        payload.isActive = value.isActive;
      }

      if (isSelfEdit && payload.isActive === false) {
        toast.error('You cannot deactivate your own account');
        return;
      }

      const nextPassword = value.password.trim();
      if (nextPassword) {
        payload.password = nextPassword;
      }

      const parsed = updateUserSchema.safeParse(payload);

      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
        return;
      }

      onSubmit(parsed.data);
    },
  });

  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>{mode === 'create' ? 'Create User' : 'Edit User'}</CardTitle>
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
                  <FieldLabel htmlFor='user-name'>Name</FieldLabel>
                  <Input
                    id='user-name'
                    value={field.state.value}
                    placeholder='Jane Doe'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Field
              name='email'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='user-email'>Email</FieldLabel>
                  <Input
                    id='user-email'
                    type='email'
                    value={field.state.value}
                    placeholder='jane@example.com'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <div className='grid gap-4 md:grid-cols-2'>
              <form.Field
                name='role'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='user-role'>Role</FieldLabel>
                    <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as UserRole)}>
                      <SelectTrigger id='user-role'>
                        <SelectValue placeholder='Select role' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.DOCTOR}>Doctor</SelectItem>
                        <SelectItem value={UserRole.PATIENT}>Patient</SelectItem>
                      </SelectContent>
                    </Select>
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
                        {isSelfEdit ? 'Your own account cannot be deactivated.' : 'Controls whether user can log in.'}
                      </p>
                    </div>
                    <Switch
                      checked={field.state.value}
                      disabled={isSelfEdit}
                      onCheckedChange={(checked) => field.handleChange(checked)}
                    />
                  </div>
                )}
              />
            </div>

            <form.Field
              name='password'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='user-password'>
                    {mode === 'create' ? 'Password' : 'Reset Password (Optional)'}
                  </FieldLabel>
                  <Input
                    id='user-password'
                    type='password'
                    value={field.state.value}
                    placeholder={mode === 'create' ? 'Minimum 8 characters' : 'Leave empty to keep current password'}
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
                    {mode === 'create' ? 'Create User' : 'Save Changes'}
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
