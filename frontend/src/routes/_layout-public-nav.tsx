import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { useTheme } from '@/utils/hooks/use-theme';

export const Route = createFileRoute('/_layout-public-nav')({
  head: () => ({
    meta: [{ title: 'Sehatmurah' }],
  }),
  component: PublicNavLayout,
});

const navigation = [
  {
    id: 1,
    title: 'Home',
    activeIcon: '/assets/icons/homepage-nav-home-active.svg',
    nonActiveIcon: '/assets/icons/homepage-nav-home-nonactive.svg',
    href: '/',
  },
  {
    id: 2,
    title: 'Appointment',
    activeIcon: '/assets/icons/homepage-nav-appointment-active.svg',
    nonActiveIcon: '/assets/icons/homepage-nav-appointment-nonactive.svg',
    href: '/doctors/search',
  },
  {
    id: 3,
    title: 'My Booking',
    activeIcon: '/assets/icons/homepage-nav-booking-active.svg',
    nonActiveIcon: '/assets/icons/homepage-nav-booking-nonactive.svg',
    href: '/appointments',
  },
  {
    id: 4,
    title: 'Profile',
    activeIcon: '/assets/icons/homepage-nav-profile-active.svg',
    nonActiveIcon: '/assets/icons/homepage-nav-profile-nonactive.svg',
    href: '/profile',
  },
];

function PublicNavLayout() {
  const { setTheme } = useTheme();

  setTheme('light');

  return (
    <div className='mx-auto min-h-screen max-w-170 overflow-hidden pb-24 sm:pb-28'>
      <Outlet />
      <nav className='navigate fixed inset-x-0 bottom-0 z-30 mx-auto'>
        <div className='mx-auto max-w-170 px-2 sm:px-0'>
          <div className='grid grid-cols-4 items-center gap-1 rounded-t-2xl border-t border-gray-50 bg-white px-2 py-3 shadow-[0_-4px_24px_rgba(15,23,42,0.06)] sm:px-4 sm:py-5'>
            {navigation.map((nav) => (
              <Link
                to={nav.href}
                key={nav.id}
                className='flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center transition-colors active:bg-gray-50 sm:px-2'
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? nav.activeIcon : nav.nonActiveIcon}
                      alt='Icon'
                      className='h-5 w-5 sm:h-6 sm:w-6'
                    />
                    <p
                      className={`w-full truncate text-[11px] font-bold leading-4 sm:text-sm sm:leading-[20.16px] ${
                        isActive ? 'text-primary' : 'text-gray-500'
                      }`}
                    >
                      {nav.title}
                    </p>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
