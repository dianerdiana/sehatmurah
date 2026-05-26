import type React from 'react';

import { Archive, BriefcaseBusiness, Clipboard, HeartPulse, Home, UserRoundCog, Users } from 'lucide-react';

import type { AbilityRule } from '@/types/ability-rule.type';

export type NavigationGroup = {
  label: string;
  isActive?: boolean;
  items: NavigationItem[];
  permission?: AbilityRule;
};

export type NavigationItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  permission?: AbilityRule;
  items?: NavigationItem[];
};

export const navigation: NavigationGroup[] = [
  {
    label: 'DASHBOARD',
    isActive: true,
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: <Home />,
        permission: {
          action: 'read',
          subject: 'Dashboard',
        },
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
        permission: {
          action: 'read',
          subject: 'ListAppointment',
        },
      },
      {
        title: 'Doctor',
        url: '/app/doctors',
        icon: <Archive />,
        permission: {
          action: 'read',
          subject: 'ListDoctor',
        },
      },
      {
        title: 'Patient',
        url: '/app/patients',
        icon: <Users />,
        permission: {
          action: 'read',
          subject: 'ListPatient',
        },
      },
      {
        title: 'Specialist',
        url: '/app/specialists',
        icon: <HeartPulse />,
        permission: {
          action: 'read',
          subject: 'ListSpecialist',
        },
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
