import type React from 'react';

import { Archive, BriefcaseBusiness, Calendar, Clipboard, HeartPulse, Home, UserRoundCog, Users } from 'lucide-react';

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
    permission: {
      action: 'read',
      subject: 'Dashboard',
    },
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
    permission: {
      action: 'read',
      subject: 'PlatformTitle',
    },
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
      {
        title: 'User',
        url: '/app/users',
        icon: <UserRoundCog />,
        permission: {
          action: 'read',
          subject: 'ListUser',
        },
      },
      {
        title: 'Review',
        url: '/app/reviews',
        icon: <BriefcaseBusiness />,
        permission: {
          action: 'read',
          subject: 'ListReview',
        },
      },
    ],
  },
  {
    label: 'SETTING',
    permission: {
      action: 'read',
      subject: 'SettingTitle',
    },
    items: [
      {
        title: 'Doctor Profile',
        url: '/settings/doctors/schedule',
        icon: <Calendar />,
        permission: {
          action: 'update',
          subject: 'OwnDoctorProfile',
        },
      },
    ],
  },
];
