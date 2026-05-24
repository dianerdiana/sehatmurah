import { Link } from '@tanstack/react-router';

import { formatCurrency } from '@/utils/utils';

export function FixedBookingCta({ fee, continueTo, label }: { fee: number; continueTo: string; label: string }) {
  return (
    <nav id='BookingCta' className='fixed bottom-0 left-0 right-0 z-30 mb-0'>
      <div className='mx-auto max-w-170'>
        <div className='flex h-30 w-full items-center justify-between space-x-2 rounded-t-3xl bg-white px-4'>
          <div>
            <p className='mb-0.5 whitespace-nowrap text-[24px] font-bold leading-[30.24px] text-accent-red'>
              {formatCurrency(fee)}
            </p>
            <p className='font-semibold leading-[20.16px] text-gray-500'>/hours</p>
          </div>
          <Link
            to={continueTo}
            className='flex h-13 w-49.25 items-center justify-center rounded-[100px] bg-primary font-bold leading-[20.16px] text-white'
          >
            {label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
