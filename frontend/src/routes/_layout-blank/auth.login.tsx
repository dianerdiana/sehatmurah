import { createFileRoute, Link, redirect } from '@tanstack/react-router';

import { themeConfig } from '@/configs/theme-config';

import { FormLogin } from '@/modules/auth/components/form-login';

export const Route = createFileRoute('/_layout-blank/auth/login')({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
        replace: true,
      });
    }
  },
});

function LoginPage() {
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
            <FormLogin />
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
