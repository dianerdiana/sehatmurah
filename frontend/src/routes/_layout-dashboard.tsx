import { createFileRoute, Link, Outlet, redirect, useRouterState } from '@tanstack/react-router';

import { CompanyBrand } from '@/components/layouts/company-brand';
import { NavMain } from '@/components/layouts/nav-main';
import { NavUser } from '@/components/layouts/nav-user';
import { ModeToggle } from '@/components/themes/mode-toggle';
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
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const currentPageLabel = getDashboardBreadcrumbLabel(pathname);

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
                  <BreadcrumbLink asChild>
                    <Link to='/dashboard'>Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
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

function getDashboardBreadcrumbLabel(pathname: string) {
  if (pathname === '/dashboard') {
    return 'Overview';
  }

  if (pathname.startsWith('/app/appointments')) {
    return 'Appointments';
  }

  if (pathname.startsWith('/app/doctors/create')) {
    return 'Create Doctor';
  }

  if (pathname.startsWith('/app/doctors')) {
    return pathname.includes('/edit') ? 'Edit Doctor' : 'Doctors';
  }

  if (pathname.startsWith('/app/patients')) {
    return pathname.includes('/edit') ? 'Edit Patient' : 'Patients';
  }

  if (pathname.startsWith('/app/reviews')) {
    return pathname.includes('/edit') ? 'Edit Review' : 'Reviews';
  }

  if (pathname.startsWith('/app/specialists/create')) {
    return 'Create Specialist';
  }

  if (pathname.startsWith('/app/specialists')) {
    return pathname.includes('/edit') ? 'Edit Specialist' : 'Specialists';
  }

  if (pathname.startsWith('/app/users/create')) {
    return 'Create User';
  }

  if (pathname.startsWith('/app/users')) {
    return pathname.includes('/edit') ? 'Edit User' : 'Users';
  }

  if (pathname.startsWith('/settings/doctors/schedule')) {
    return 'Doctor Schedule';
  }

  return 'Overview';
}
