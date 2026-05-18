import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

import { PublicBlankLayout } from '@/layouts/public-blank-layout';

export const Route = createFileRoute('/doctors/$doctorId/details')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { doctorId } = Route.useParams();

  return (
    <PublicBlankLayout>
      <header className='h-67 w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <Button onClick={() => router.history.back()}>
          <img src='/assets/icons/arrow-left-blue.svg' alt='Image' />
        </Button>
        <div className='absolute left-1/2 top-12 -translate-x-1/2'>
          <h1 className='mb-0.75 whitespace-nowrap text-center text-xl font-bold leading-[25.2px] text-white'>
            Doctor Details
          </h1>
          <h2 className='whitespace-nowrap text-center font-semibold leading-[20.16px] text-primary-light'>
            We provide top doctors.
          </h2>
        </div>
      </header>
    </PublicBlankLayout>
  );
}
