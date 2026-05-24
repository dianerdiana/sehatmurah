import { Link } from '@tanstack/react-router';

export function HomeHeader() {
  return (
    <header>
      <div className='flex items-center justify-between rounded-b-3xl border border-gray-200 bg-white px-4 pb-8 pt-12'>
        <Link to='/'>
          <img src='/assets/image/homepage-nav-company.png' alt='Image' className='max-h-12.5' />
        </Link>
        <a href='#' className='flex size-12.5 items-center justify-center shrink-0 rounded-full border border-gray-200'>
          <img src='/assets/icons/homepage-nav-notification.svg' alt='Icon' />
        </a>
      </div>
      <img src='/assets/image/homepage-header-banner.png' alt='Image' className='mx-auto min-h-45.75 min-w-90.25 p-4' />
    </header>
  );
}
