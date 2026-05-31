import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { CompanyBrand } from '@/components/layouts/company-brand';
import { NavMain } from '@/components/layouts/nav-main';
import { NavUser } from '@/components/layouts/nav-user';
import { ModeToggle } from '@/components/themes/mode-toogle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { requireAuthenticated } from '@/utils/auth/route-guard';
import { useAuth } from '@/utils/hooks/use-auth';
import { navigation } from '@/utils/navigation';

import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-dashboard')({
  beforeLoad: ({ context, location }) => {
    const canAccessDashboard = [UserRole.ADMIN, UserRole.DOCTOR].includes(context.auth.userData.role);

    let redirectTarget = location.href;

    if (!canAccessDashboard) {
      redirectTarget = '/profile';
    }

    if (context.auth.isAuthenticated && !canAccessDashboard) {
      throw redirect({ to: redirectTarget, replace: true });
    } else {
      requireAuthenticated(context.auth, redirectTarget);
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  const { userData } = useAuth();

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <CompanyBrand />
        </SidebarHeader>
        <SidebarContent>
          <NavMain groups={navigation} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
        <SidebarRail className='border-destructive' />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>Build Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
