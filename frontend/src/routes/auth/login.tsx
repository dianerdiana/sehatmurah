import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useAppForm } from '@/hooks/use-app-form';

import { themeConfig } from '@/configs/theme-config';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

const loginSchema = z.object({
  identifier: z.union([z.string().min(3), z.email()]),
  password: z.string().min(1, { error: 'Password wajib diisi' }).min(6, { error: 'Password minimal 6 karakter' }),
});

function LoginPage() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: (_props) => {
      navigate({ to: '/dashboard' });
    },
    onSubmitInvalid: (props) => {
      console.log(props);
    },
  });

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link to='/' className='flex items-center gap-2 font-medium'>
            <div className='flex w-60 items-center justify-center rounded-md text-primary-foreground'>
              <img src={themeConfig.app.logoBrandName} alt='logo-brand' className='w-full h-auto' />
            </div>
          </Link>
        </div>
        <div className='flex flex-1 pt-10 justify-center'>
          <div className='w-full max-w-xs'>
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
                  <h1 className='text-2xl font-medium'>Hi, Selamat Datang! 👋</h1>
                  <p className='text-sm text-balance text-muted-foreground'>Silakan login untuk masuk ke akun anda</p>
                </div>
                <form.AppField name='identifier'>
                  {(field) => (
                    <field.TextField
                      id='identifier'
                      name='identifier'
                      label='Username or Email'
                      placeholder='example@mail.com'
                    />
                  )}
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
                      <>
                        <Input
                          value={field.state.value}
                          id='password'
                          type='password'
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={!field.state.meta.isValid}
                        />

                        {field.state.meta.isTouched && <FieldError>{field.state.meta.errors[0]?.message}</FieldError>}
                      </>
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
          </div>
        </div>
      </div>
      <div className='hidden bg-primary-light lg:block'>
        <div className='w-full h-full flex flex-wrap items-center justify-center'>
          <div className='flex flex-wrap justify-center'>
            <img src='/assets/image/login-image.png' alt='Image' className='inset-0 h-full w-full object-cover' />
          </div>
        </div>
      </div>
    </div>
  );
}
