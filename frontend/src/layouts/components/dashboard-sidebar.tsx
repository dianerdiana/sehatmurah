import * as React from 'react';

import { Archive, BriefcaseBusiness, Building2, Clipboard, Home, LayoutGrid, UserRoundCog, Users } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { CompanyBrand } from './company-brand';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

// This is sample data.
const data = {
  user: {
    name: 'Dian Erdiana',
    email: 'dianerdiana@dianerdiana.com',
    avatar: '/assets/image/doctordetails-dire-clove.png',
  },
  navMain: [
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
  ],
};

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <CompanyBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail className='border-destructive' />
    </Sidebar>
  );
}
