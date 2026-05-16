import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useAppForm } from '@/hooks/use-app-form';

import { login } from '../auth.api';
import { loginSchema } from '../auth.schema';

export function LoginForm() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ['auth', 'login'],
    onError: (error) => console.log(error),
    onSuccess: (props) => console.log(props),
  });

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: (props) => {
      // navigate({ to: '/dashboard' });
      mutation.mutate(props.value);
    },
    onSubmitInvalid: (props) => {
      console.log(props);
    },
  });

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-medium'>Hi, Welcome! 👋</h1>
          <p className='text-sm text-balance text-muted-foreground'>Please login to continue access your account</p>
        </div>
        <form.AppField name='email'>
          {(field) => <field.TextField id='email' name='email' label='Email' placeholder='example@mail.com' />}
        </form.AppField>
        <Field>
          <div className='flex items-center'>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
              Lupa Password?
            </a>
          </div>
          <form.Field
            name='password'
            children={(field) => (
              <Input
                value={field.state.value}
                id='password'
                type='password'
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={!field.state.meta.isValid}
              />
            )}
          />
        </Field>
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button type='submit' disabled={isSubmitting}>
              Login
            </Button>
          )}
        />
      </FieldGroup>
    </form>
  );
}
