import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { CompanyBrand } from './company-brand';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { navigation } from '@/navigation';

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = {
    name: 'Dian Erdiana',
    email: 'dianerdiana@dianerdiana.com',
    avatar: '/assets/image/doctordetails-dire-clove.png',
  };

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <CompanyBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={navigation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail className='border-destructive' />
    </Sidebar>
  );
}
