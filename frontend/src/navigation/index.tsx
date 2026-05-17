import { Archive, BriefcaseBusiness, Clipboard, Home, UserRoundCog, Users } from 'lucide-react';

export const navigation = [
  {
    label: 'DASHBOARD',
    isActive: true,
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: <Home />,
      },
    ],
  },
  {
    label: 'PLATFORM',
    items: [
      {
        title: 'Appointment',
        url: '/appointments',
        icon: <Clipboard />,
      },
      {
        title: 'Doctor',
        url: '/doctors',
        icon: <Archive />,
      },
      {
        title: 'Patient',
        url: '/patients',
        icon: <Users />,
      },
    ],
  },
  {
    label: 'SETTING',
    items: [
      {
        title: 'User',
        url: '/users',
        icon: <UserRoundCog />,
      },
      {
        title: 'Review',
        url: '/reviews',
        icon: <BriefcaseBusiness />,
      },
    ],
  },
];
