import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { useTheme } from '@/utils/hooks/use-theme';

export const Route = createFileRoute('/_layout-public-nav')({
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
    href: '/my-booking',
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
    <main className='mx-auto max-w-170 overflow-hidden pb-24.5 min-h-screen'>
      <Outlet />
      <nav className='navigate fixed bottom-0 left-0 right-0 z-30 mx-auto'>
        <div className='mx-auto max-w-170'>
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
