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
    email: 'dianerdiana@talentaindonesia.id',
    avatar: '/avatars/shadcn.jpg',
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
          title: 'Modul',
          url: '/modules',
          icon: <Clipboard />,
        },
        {
          title: 'Proyek',
          url: '/projects',
          icon: <Archive />,
        },
        {
          title: 'Peserta',
          url: '/participants',
          icon: <Users />,
        },
        {
          title: 'Kumpulan Tes',
          url: '/tests',
          icon: <LayoutGrid />,
          items: [
            {
              title: 'Semua',
              url: '#',
            },
          ],
        },
      ],
    },
    {
      label: 'PENGATURAN',
      items: [
        {
          title: 'User',
          url: '/users',
          icon: <UserRoundCog />,
        },
        {
          title: 'Klien',
          url: '/clients',
          icon: <BriefcaseBusiness />,
        },
        {
          title: 'Perusahaan',
          url: '/companies',
          icon: <Building2 />,
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
