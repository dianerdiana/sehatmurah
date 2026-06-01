import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ChevronRight, SearchX, Stethoscope } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { patientQueryOptions } from '@/modules/patients/patient.query';

import { useAuth } from '@/utils/hooks/use-auth';
import { formatDate } from '@/utils/utils';

import { Gender } from '@/types/enums/gender.enum';

export const Route = createFileRoute('/_layout-public-nav/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();

  const patientQuery = useQuery(patientQueryOptions.getMyProfile());

  const handleLogout = async () => {
    await logout();
    await navigate({
      to: '/auth/login',
      replace: true,
    });
  };

  if (patientQuery.isPending) {
    return <ProfilePageSkeleton />;
  }

  if (patientQuery.isError || !patientQuery.data) {
    return (
      <main className='space-y-4 px-4 py-6'>
        <Card className='rounded-3xl'>
          <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
            <SearchX className='size-7 text-muted-foreground' />
            <p className='font-semibold'>Unable to load your profile.</p>
            <Button variant='outline' onClick={() => patientQuery.refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const patient = patientQuery.data;
  const fullName = patient.fullName.trim() || userData.name || 'Patient';
  const avatarInitial = fullName[0]?.toUpperCase() ?? 'P';

  const details = [
    {
      label: 'Date of Birth',
      value: patient.dateOfBirth ? formatDate(patient.dateOfBirth) : '-',
    },
    {
      label: 'Gender',
      value: formatGender(patient.gender),
    },
    {
      label: 'Phone Number',
      value: patient.phoneNumber?.trim() || '-',
    },
    {
      label: 'Address',
      value: patient.address?.trim() || '-',
    },
  ];

  return (
    <main className='space-y-4 px-4 py-6'>
      <section aria-label='Profile head'>
        <Card className='rounded-3xl shadow-none border-none'>
          <CardContent className='flex flex-col items-center gap-4 text-center'>
            <Avatar size='lg' className='size-24 ring-2 ring-primary/10'>
              <AvatarFallback className='text-2xl font-semibold text-primary'>{avatarInitial}</AvatarFallback>
            </Avatar>
            <h1 className='text-xl font-bold leading-tight text-gray-900'>{fullName}</h1>
            <Button className='h-11 w-full rounded-full font-semibold' asChild>
              <Link to='/profile/edit'>Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section aria-label='Profile details'>
        <Card className='rounded-3xl shadow-none border-none'>
          <CardContent className='space-y-4'>
            {details.map((detail, index) => (
              <div key={detail.label} className={index < details.length - 1 ? 'border-b border-gray-100 pb-4' : ''}>
                <p className='text-sm font-semibold text-gray-500'>{detail.label}</p>
                <p className='mt-1 wrap-break-word text-base font-bold text-gray-900'>{detail.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section aria-label='Profile footer'>
        <Card className='rounded-3xl border-none shadow-none'>
          <CardContent className='space-y-3'>
            <Button variant='outline' className='h-auto w-full justify-between rounded-2xl px-4 py-4' asChild>
              <Link to='/profile/join-doctor'>
                <span className='flex items-center gap-3 text-left'>
                  <span className='rounded-full bg-primary/10 p-2 text-primary'>
                    <Stethoscope className='size-4' />
                  </span>
                  <span>
                    <span className='block text-sm font-semibold text-foreground'>Join as a Doctor</span>
                    <span className='block text-xs text-muted-foreground'>Submit your doctor profile for review</span>
                  </span>
                </span>
                <ChevronRight className='size-4 text-muted-foreground' />
              </Link>
            </Button>

            <Button
              variant='outline'
              className='h-11 w-full rounded-full border-red-200 font-semibold text-red-600 hover:bg-red-50 hover:text-red-700'
              onClick={() => void handleLogout()}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function ProfilePageSkeleton() {
  return (
    <main className='space-y-4 px-4 py-6'>
      <Card className='rounded-3xl'>
        <CardContent className='flex flex-col items-center gap-4'>
          <Skeleton className='size-24 rounded-full' />
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-11 w-full rounded-full' />
        </CardContent>
      </Card>

      <Card className='rounded-3xl'>
        <CardContent className='space-y-4'>
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-16 w-full rounded-lg' />
        </CardContent>
      </Card>

      <Card className='rounded-3xl'>
        <CardContent>
          <Skeleton className='h-11 w-full rounded-full' />
        </CardContent>
      </Card>
    </main>
  );
}

function formatGender(gender?: Gender) {
  if (!gender) {
    return '-';
  }

  return gender === Gender.MALE ? 'Male' : 'Female';
}
