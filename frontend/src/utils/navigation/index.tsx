import { Archive, BriefcaseBusiness, Clipboard, HeartPulse, Home, UserRoundCog, Users } from 'lucide-react';

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
        url: '/app/appointments',
        icon: <Clipboard />,
      },
      {
        title: 'Doctor',
        url: '/app/doctors',
        icon: <Archive />,
      },
      {
        title: 'Patient',
        url: '/app/patients',
        icon: <Users />,
      },
      {
        title: 'Specialist',
        url: '/app/specialists',
        icon: <HeartPulse />,
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
