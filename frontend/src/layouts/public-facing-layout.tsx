import type React from 'react';

import { Link } from '@tanstack/react-router';

const navigation = [
  {
    id: 1,
    title: 'Home',
    activeIcon: 'assets/icons/homepage-nav-home-active.svg',
    nonActiveIcon: 'assets/icons/homepage-nav-home-nonactive.svg',
    href: '/',
  },
  {
    id: 2,
    title: 'Appointment',
    activeIcon: 'assets/icons/homepage-nav-appointment-active.svg',
    nonActiveIcon: 'assets/icons/homepage-nav-appointment-nonactive.svg',
    href: '/search',
  },
  {
    id: 3,
    title: 'My Booking',
    activeIcon: 'assets/icons/homepage-nav-booking-active.svg',
    nonActiveIcon: 'assets/icons/homepage-nav-booking-nonactive.svg',
    href: '/my-booking',
  },
];

export function PublicFacingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='mx-auto max-w-160 overflow-hidden pb-24.5 min-h-screen'>
      {children}
      <nav className='navigate fixed bottom-0 left-0 right-0 z-30 mx-auto'>
        <div className='mx-auto max-w-160'>
          <div className='flex items-center justify-between rounded-t-2xl border-t border-gray-50 bg-white px-4 py-6'>
            {navigation.map((nav) => (
              <Link to={nav.href} key={nav.id} className='grid w-[112.33px] place-items-center gap-1.5'>
                {({ isActive }) => (
                  <>
                    <img src={isActive ? nav.activeIcon : nav.nonActiveIcon} alt='Icon' />
                    <p className={`font-bold leading-[20.16px] ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                      {nav.title}
                    </p>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </main>
  );
}
