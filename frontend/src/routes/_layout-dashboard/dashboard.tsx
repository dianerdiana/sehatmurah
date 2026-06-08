import type { ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Clock3,
  HeartPulse,
  type LucideIcon,
  MapPin,
  MessageSquareMore,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  UserRound,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { appointmentStatusBadgeVariants, appointmentStatusLabels } from '@/modules/appointments/appointment-status';
import { dashboardQueryOptions } from '@/modules/dashboard/dashboard.query';
import type {
  DashboardAppointmentItem,
  DashboardDoctorItem,
  DashboardMetric,
  DashboardPatientItem,
  DashboardReviewItem,
  DashboardScheduleItem,
  DashboardSummary,
} from '@/modules/dashboard/dashboard.type';

import { hasPermissionPage } from '@/utils/auth/has-permission';
import { useAuth } from '@/utils/hooks/use-auth';
import { cn, formatAppointmentTime, formatCurrency, formatDateTime } from '@/utils/utils';

import { DoctorApprovalStatus } from '@/types/enums/doctor-approval-status.enum';
import { ReviewStatus } from '@/types/enums/review-status.enum';
import { UserRole } from '@/types/enums/user-role.enum';

export const Route = createFileRoute('/_layout-dashboard/dashboard')({
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'read', 'Dashboard');
  },
  component: DashboardPage,
  head: () => ({
    meta: [{ title: 'Dashboard | Sehatmurah' }],
  }),
});

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const metricToneClasses: Record<NonNullable<DashboardMetric['tone']>, string> = {
  default: 'border-border bg-card',
  info: 'border-sky-200/70 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/20',
  success: 'border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20',
  warning: 'border-amber-200/70 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20',
  danger: 'border-rose-200/70 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/20',
};

const metricBarClasses: Record<NonNullable<DashboardMetric['tone']>, string> = {
  default: 'bg-border',
  info: 'bg-sky-400',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
};

const reviewStatusLabels: Record<ReviewStatus, string> = {
  [ReviewStatus.PENDING]: 'Pending',
  [ReviewStatus.APPROVED]: 'Approved',
  [ReviewStatus.REJECTED]: 'Rejected',
};

const reviewStatusBadgeVariants: Record<ReviewStatus, 'warning' | 'success' | 'danger'> = {
  [ReviewStatus.PENDING]: 'warning',
  [ReviewStatus.APPROVED]: 'success',
  [ReviewStatus.REJECTED]: 'danger',
};

const doctorApprovalLabels: Record<DoctorApprovalStatus, string> = {
  [DoctorApprovalStatus.PENDING]: 'Pending approval',
  [DoctorApprovalStatus.APPROVED]: 'Approved',
  [DoctorApprovalStatus.REJECTED]: 'Rejected',
};

const doctorApprovalBadgeVariants: Record<DoctorApprovalStatus, 'warning' | 'success' | 'danger'> = {
  [DoctorApprovalStatus.PENDING]: 'warning',
  [DoctorApprovalStatus.APPROVED]: 'success',
  [DoctorApprovalStatus.REJECTED]: 'danger',
};

const quickActionMap: Record<UserRole.ADMIN | UserRole.DOCTOR, QuickAction[]> = {
  [UserRole.ADMIN]: [
    {
      title: 'Review appointments',
      description: 'Open the appointment queue and keep things moving.',
      href: '/app/appointments',
      icon: CalendarClock,
    },
    {
      title: 'Inspect doctors',
      description: 'Check approval status and new doctor submissions.',
      href: '/app/doctors',
      icon: BadgeCheck,
    },
    {
      title: 'Manage users',
      description: 'Handle accounts, roles, and activation status.',
      href: '/app/users',
      icon: Users,
    },
  ],
  [UserRole.DOCTOR]: [
    {
      title: 'Open appointments',
      description: 'Check your incoming consultations and schedule.',
      href: '/app/appointments',
      icon: ClipboardList,
    },
    {
      title: 'Update schedule',
      description: 'Keep your availability accurate for patients.',
      href: '/settings/doctors/schedule',
      icon: CalendarDays,
    },
    {
      title: 'Check profile status',
      description: 'Review your doctor profile and approval progress.',
      href: '/profile/join-doctor',
      icon: Stethoscope,
    },
  ],
};

function DashboardPage() {
  const { userData } = useAuth();
  const query = useQuery({
    ...dashboardQueryOptions.summary(),
  });

  if (query.isPending) {
    return <DashboardPageSkeleton />;
  }

  if (query.isError || !query.data) {
    return (
      <div className='space-y-4'>
        <Card className='overflow-hidden rounded-4xl border-0 bg-background shadow-sm'>
          <CardContent className='flex min-h-80 flex-col items-center justify-center gap-4 text-center'>
            <div className='flex size-14 items-center justify-center rounded-full bg-rose-50 text-rose-600'>
              <AlertTriangle className='size-7' />
            </div>
            <div className='space-y-2'>
              <h1 className='text-2xl font-semibold tracking-tight'>Unable to load dashboard</h1>
              <p className='max-w-xl text-sm text-muted-foreground'>
                {query.error instanceof Error ? query.error.message : 'Please refresh the page and try again.'}
              </p>
            </div>
            <Button onClick={() => query.refetch()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const summary = query.data;
  const isAdmin = summary.role === UserRole.ADMIN;
  const quickActions = quickActionMap[summary.role];
  const primaryAppointments = isAdmin ? summary.recentAppointments : summary.upcomingAppointments;

  return (
    <div className='space-y-6 pb-2'>
      <section className='relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-lg shadow-slate-900/15 md:p-8'>
        <div className='absolute -left-10 top-0 size-40 rounded-full bg-sky-500/15 blur-3xl' />
        <div className='absolute right-0 top-10 size-48 rounded-full bg-emerald-400/10 blur-3xl' />

        <div className='relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start'>
          <div className='space-y-6'>
            <div className='flex flex-wrap items-center gap-2'>
              <Badge className='border-white/15 bg-white/10 text-white' variant='outline'>
                {summary.role === UserRole.ADMIN ? 'Admin' : 'Doctor'}
              </Badge>
              <Badge className='border-white/15 bg-white/10 text-white' variant='outline'>
                {format(new Date(), 'EEEE, dd MMM yyyy')}
              </Badge>
            </div>

            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-sm font-medium text-white/75'>
                <Sparkles className='size-4' />
                <span>SehatMurah dashboard</span>
              </div>
              <p className='text-sm font-medium text-white/65'>Signed in as {userData.name}</p>
              <h1 className='max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl'>{summary.title}</h1>
              <p className='max-w-2xl text-sm leading-6 text-white/75 md:text-base'>{summary.description}</p>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row'>
              {quickActions.slice(0, 2).map((action) => {
                const Icon = action.icon;

                return (
                  <Button
                    key={action.title}
                    className='h-11 rounded-full bg-white px-5 text-slate-950 hover:bg-white/90'
                    asChild
                  >
                    <Link to={action.href}>
                      <span className='inline-flex items-center gap-2'>
                        <Icon className='size-4' />
                        {action.title}
                      </span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className='rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur'>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <p className='text-sm font-medium text-white/60'>Workspace overview</p>
                <p className='text-lg font-semibold'>Live metrics</p>
              </div>
              <div className='flex size-11 items-center justify-center rounded-full bg-white/10'>
                <Activity className='size-5' />
              </div>
            </div>

            <div className='mt-5 grid gap-3'>
              {summary.statusMetrics.slice(0, 4).map((metric) => (
                <div key={metric.label} className='rounded-2xl border border-white/10 bg-white/10 p-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <p className='text-xs font-medium uppercase tracking-[0.12em] text-white/55'>{metric.label}</p>
                    <span className='text-lg font-semibold'>{formatMetricValue(metric)}</span>
                  </div>
                  {metric.helper ? <p className='mt-1 text-xs text-white/60'>{metric.helper}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {summary.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {summary.statusMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} compact />
        ))}
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.4fr_0.9fr]'>
        <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
          <CardHeader className='border-b border-border/70 pb-5'>
            <div className='flex items-center justify-between gap-3'>
              <div className='space-y-1'>
                <CardTitle className='text-xl'>{isAdmin ? 'Recent appointments' : 'Upcoming appointments'}</CardTitle>
                <CardDescription>
                  {isAdmin
                    ? 'Track the latest bookings that just entered the system.'
                    : 'Keep an eye on the next visits that need your attention.'}
                </CardDescription>
              </div>
              <Button variant='ghost' className='rounded-full' asChild>
                <Link to='/app/appointments'>
                  View all
                  <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className='space-y-4 pt-6'>
            {primaryAppointments.length ? (
              primaryAppointments.map((appointment) => (
                <AppointmentRow key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <EmptyState
                icon={CalendarClock}
                title='No appointments found'
                description='Once new bookings arrive, they will appear here automatically.'
              />
            )}
          </CardContent>
        </Card>

        <div className='space-y-4'>
          {summary.role === UserRole.ADMIN ? (
            <>
              <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
                <CardHeader className='border-b border-border/70 pb-5'>
                  <CardTitle className='text-xl'>Doctor approvals</CardTitle>
                  <CardDescription>New or pending doctor submissions waiting for review.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 pt-6'>
                  {summary.pendingDoctors.length ? (
                    summary.pendingDoctors.map((doctor) => <DoctorRow key={doctor.id} doctor={doctor} />)
                  ) : (
                    <EmptyState
                      icon={BadgeCheck}
                      title='Approval queue is clear'
                      description='There are no pending doctor submissions at the moment.'
                    />
                  )}
                </CardContent>
              </Card>

              <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
                <CardHeader className='border-b border-border/70 pb-5'>
                  <CardTitle className='text-xl'>Recent patients</CardTitle>
                  <CardDescription>Fresh accounts and the latest profile activity.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 pt-6'>
                  {summary.recentPatients.length ? (
                    summary.recentPatients.map((patient) => <PatientRow key={patient.id} patient={patient} />)
                  ) : (
                    <EmptyState
                      icon={UserRound}
                      title='No patient activity yet'
                      description='New patient profiles will show up here when they are created.'
                    />
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
                <CardHeader className='border-b border-border/70 pb-5'>
                  <CardTitle className='text-xl'>Doctor profile</CardTitle>
                  <CardDescription>Your public profile and verification status.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 pt-6'>
                  {summary.profileMissing || !summary.doctor ? (
                    <EmptyState
                      icon={AlertTriangle}
                      title='Doctor profile not completed'
                      description='Complete your doctor profile to unlock the appointment dashboard and review insights.'
                      action={
                        <Button className='rounded-full' asChild>
                          <Link to='/profile/join-doctor'>Complete profile</Link>
                        </Button>
                      }
                    />
                  ) : (
                    <DoctorProfileCard doctor={summary.doctor} />
                  )}
                </CardContent>
              </Card>

              <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
                <CardHeader className='border-b border-border/70 pb-5'>
                  <CardTitle className='text-xl'>Today’s schedule</CardTitle>
                  <CardDescription>
                    {summary.todaySchedule.length
                      ? 'Available slots for the current Jakarta day.'
                      : 'No slots found for today.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 pt-6'>
                  {summary.todaySchedule.length ? (
                    summary.todaySchedule.map((slot) => (
                      <ScheduleRow key={`${slot.day}-${slot.startTime}-${slot.endTime}`} slot={slot} />
                    ))
                  ) : (
                    <EmptyState
                      icon={Clock3}
                      title='No schedule for today'
                      description='Add or update your schedule to make appointments bookable.'
                    />
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      <section className='grid gap-4 xl:grid-cols-2'>
        <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
          <CardHeader className='border-b border-border/70 pb-5'>
            <CardTitle className='text-xl'>{isAdmin ? 'Recent reviews' : 'Patient feedback'}</CardTitle>
            <CardDescription>
              {isAdmin
                ? 'Latest review submissions and moderation status.'
                : 'The most recent feedback that patients left for you.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 pt-6'>
            {summary.recentReviews.length ? (
              summary.recentReviews.map((review) => <ReviewRow key={review.id} review={review} />)
            ) : (
              <EmptyState
                icon={MessageSquareMore}
                title='No reviews yet'
                description='Reviews will appear here once patients submit feedback.'
              />
            )}
          </CardContent>
        </Card>

        <Card className='overflow-hidden rounded-[1.75rem] border shadow-sm'>
          <CardHeader className='border-b border-border/70 pb-5'>
            <CardTitle className='text-xl'>Quick actions</CardTitle>
            <CardDescription>Handy links to the places you use the most.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3 pt-6'>
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Button
                  key={action.title}
                  variant='outline'
                  className='h-auto justify-between rounded-2xl px-4 py-4 text-left'
                  asChild
                >
                  <Link to={action.href}>
                    <span className='flex items-center gap-3'>
                      <span className='flex size-10 items-center justify-center rounded-2xl bg-muted'>
                        <Icon className='size-4' />
                      </span>
                      <span>
                        <span className='block text-sm font-semibold'>{action.title}</span>
                        <span className='block text-xs text-muted-foreground'>{action.description}</span>
                      </span>
                    </span>
                    <ArrowRight className='size-4 text-muted-foreground' />
                  </Link>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function MetricCard({ metric, compact = false }: { metric: DashboardMetric; compact?: boolean }) {
  const tone = metric.tone ?? 'default';

  return (
    <Card className={cn('overflow-hidden rounded-3xl border shadow-sm', metricToneClasses[tone])}>
      <div className={cn('h-1 w-full', metricBarClasses[tone])} />
      <CardContent className={cn('space-y-3 pt-5', compact ? 'pb-5' : 'pb-6')}>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>{metric.label}</p>
            <h3 className={cn('tracking-tight', compact ? 'text-xl font-semibold' : 'text-2xl font-semibold')}>
              {formatMetricValue(metric)}
            </h3>
          </div>
          <div className='flex size-10 items-center justify-center rounded-2xl bg-background/70 text-muted-foreground'>
            <TrendingUp className='size-4' />
          </div>
        </div>
        {metric.helper ? <p className='text-xs text-muted-foreground'>{metric.helper}</p> : null}
      </CardContent>
    </Card>
  );
}

function AppointmentRow({ appointment }: { appointment: DashboardAppointmentItem }) {
  return (
    <div className='rounded-2xl border border-border/70 bg-muted/20 p-4'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
        <div className='space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant={appointmentStatusBadgeVariants[appointment.status]} className='px-2.5 py-0.5'>
              {appointmentStatusLabels[appointment.status]}
            </Badge>
            <span className='text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground'>
              {appointment.bookingCode}
            </span>
          </div>
          <p className='text-sm font-semibold leading-6'>
            {appointment.patientName}
            <span className='text-muted-foreground'> · {appointment.doctorName}</span>
          </p>
          {appointment.specialistName ? (
            <p className='text-xs text-muted-foreground'>{appointment.specialistName}</p>
          ) : null}
          {appointment.reason ? <p className='text-sm text-muted-foreground'>{appointment.reason}</p> : null}
        </div>

        <div className='space-y-2 text-sm text-muted-foreground lg:text-right'>
          <p className='font-medium text-foreground'>{formatDateLabel(appointment.appointmentDate)}</p>
          <p>
            {formatAppointmentTime(appointment.startTime)} - {formatAppointmentTime(appointment.endTime)}
          </p>
          <p>{formatDateTime(appointment.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ review }: { review: DashboardReviewItem }) {
  return (
    <div className='rounded-2xl border border-border/70 bg-muted/20 p-4'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
        <div className='space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant={reviewStatusBadgeVariants[review.status]} className='px-2.5 py-0.5'>
              {reviewStatusLabels[review.status]}
            </Badge>
            <span className='text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground'>
              {formatDateTime(review.createdAt)}
            </span>
          </div>
          <p className='text-sm font-semibold leading-6'>
            {review.patientName}
            <span className='text-muted-foreground'> · {review.doctorName}</span>
          </p>
          {review.specialistName ? <p className='text-xs text-muted-foreground'>{review.specialistName}</p> : null}
          {review.comment ? <p className='text-sm text-muted-foreground'>{review.comment}</p> : null}
        </div>

        <div className='flex items-center gap-2 text-sm font-semibold text-foreground lg:justify-end'>
          <Star className='size-4 fill-amber-400 text-amber-400' />
          {review.rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

function DoctorRow({ doctor }: { doctor: DashboardDoctorItem }) {
  return (
    <div className='rounded-2xl border border-border/70 bg-muted/20 p-4'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
        <div className='space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant={doctorApprovalBadgeVariants[doctor.status]} className='px-2.5 py-0.5'>
              {doctorApprovalLabels[doctor.status]}
            </Badge>
            <span className='text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground'>
              {formatDateTime(doctor.createdAt)}
            </span>
          </div>
          <p className='text-sm font-semibold leading-6'>{doctor.fullName}</p>
          <p className='text-xs text-muted-foreground'>
            {doctor.specialistName} · {doctor.city}
          </p>
        </div>

        <div className='space-y-1 text-sm text-muted-foreground lg:text-right'>
          <p className='font-medium text-foreground'>{doctor.isAvailable ? 'Available' : 'Not available'}</p>
          <p>{formatCurrency(doctor.consultationFee)}</p>
        </div>
      </div>
    </div>
  );
}

function PatientRow({ patient }: { patient: DashboardPatientItem }) {
  return (
    <div className='rounded-2xl border border-border/70 bg-muted/20 p-4'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
        <div className='space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant={patient.isActive ? 'success' : 'danger'} className='px-2.5 py-0.5'>
              {patient.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <span className='text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground'>
              {formatDateTime(patient.createdAt)}
            </span>
          </div>
          <p className='text-sm font-semibold leading-6'>{patient.fullName}</p>
          <p className='text-xs text-muted-foreground'>{patient.email}</p>
        </div>

        <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground lg:justify-end'>
          <Users className='size-4' />
          Patient profile
        </div>
      </div>
    </div>
  );
}

function DoctorProfileCard({
  doctor,
}: {
  doctor: NonNullable<Extract<DashboardSummary, { role: UserRole.DOCTOR }>['doctor']>;
}) {
  return (
    <div className='space-y-4'>
      <div className='rounded-2xl border border-border/70 bg-muted/20 p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <Badge variant={doctorApprovalBadgeVariants[doctor.approvalStatus]} className='px-2.5 py-0.5'>
                {doctorApprovalLabels[doctor.approvalStatus]}
              </Badge>
              <Badge variant={doctor.isAvailable ? 'success' : 'danger'} className='px-2.5 py-0.5'>
                {doctor.isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
            <div>
              <p className='text-lg font-semibold'>{doctor.fullName}</p>
              <p className='text-sm text-muted-foreground'>{doctor.specialistName}</p>
            </div>
          </div>
          <div className='flex size-11 items-center justify-center rounded-2xl bg-background'>
            <HeartPulse className='size-5 text-primary' />
          </div>
        </div>
      </div>

      <div className='grid gap-3 sm:grid-cols-2'>
        <InfoTile icon={Building2} label='Clinic' value={doctor.clinicName} />
        <InfoTile icon={MapPin} label='City' value={doctor.city} />
        <InfoTile icon={Star} label='Rating' value={`${doctor.ratingAverage.toFixed(1)} / 5`} />
        <InfoTile icon={BadgeCheck} label='Reviews' value={new Intl.NumberFormat('id-ID').format(doctor.ratingCount)} />
        <InfoTile icon={TrendingUp} label='Consultation fee' value={formatCurrency(doctor.consultationFee)} />
        <InfoTile icon={CalendarDays} label='Experience' value={`${doctor.experienceYears} years`} />
      </div>
    </div>
  );
}

function ScheduleRow({ slot }: { slot: DashboardScheduleItem }) {
  return (
    <div className='flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 px-4 py-3'>
      <div className='space-y-1'>
        <p className='text-sm font-semibold'>{slot.day}</p>
        <p className='text-xs text-muted-foreground'>
          {formatAppointmentTime(slot.startTime)} - {formatAppointmentTime(slot.endTime)}
        </p>
      </div>
      <Badge variant={slot.isAvailable ? 'success' : 'danger'}>{slot.isAvailable ? 'Open' : 'Closed'}</Badge>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof AlertTriangle;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/10 px-5 py-8 text-center'>
      <div className='flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground'>
        <Icon className='size-5' />
      </div>
      <div className='space-y-1'>
        <p className='text-sm font-semibold'>{title}</p>
        <p className='max-w-sm text-sm text-muted-foreground'>{description}</p>
      </div>
      {action}
    </div>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className='rounded-2xl border border-border/70 bg-muted/20 p-4'>
      <div className='flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground'>
        <Icon className='size-3.5' />
        {label}
      </div>
      <p className='mt-2 text-sm font-semibold'>{value}</p>
    </div>
  );
}

function DashboardPageSkeleton() {
  return (
    <div className='space-y-6 pb-2'>
      <Card className='overflow-hidden rounded-4xl border-0 shadow-sm'>
        <CardContent className='space-y-6 p-6 md:p-8'>
          <div className='flex flex-wrap gap-2'>
            <Skeleton className='h-7 w-24 rounded-full' />
            <Skeleton className='h-7 w-36 rounded-full' />
          </div>

          <div className='grid gap-8 lg:grid-cols-[1.4fr_0.9fr]'>
            <div className='space-y-4'>
              <Skeleton className='h-4 w-40 rounded-full' />
              <Skeleton className='h-12 w-full rounded-2xl' />
              <Skeleton className='h-6 w-5/6 rounded-full' />
              <Skeleton className='h-6 w-2/3 rounded-full' />
              <div className='flex gap-3'>
                <Skeleton className='h-11 w-36 rounded-full' />
                <Skeleton className='h-11 w-36 rounded-full' />
              </div>
            </div>
            <div className='space-y-3 rounded-[1.75rem] border border-border/70 bg-background/60 p-5'>
              <Skeleton className='h-6 w-32 rounded-full' />
              <Skeleton className='h-24 w-full rounded-2xl' />
              <Skeleton className='h-24 w-full rounded-2xl' />
              <Skeleton className='h-24 w-full rounded-2xl' />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className='rounded-3xl border shadow-sm'>
            <CardContent className='space-y-3 pt-5 pb-6'>
              <Skeleton className='h-4 w-24 rounded-full' />
              <Skeleton className='h-8 w-32 rounded-full' />
              <Skeleton className='h-4 w-40 rounded-full' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid gap-4 xl:grid-cols-[1.4fr_0.9fr]'>
        <Card className='rounded-[1.75rem] border shadow-sm'>
          <CardHeader className='border-b border-border/70 pb-5'>
            <Skeleton className='h-6 w-48 rounded-full' />
            <Skeleton className='h-4 w-72 rounded-full' />
          </CardHeader>
          <CardContent className='space-y-3 pt-6'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className='h-24 w-full rounded-2xl' />
            ))}
          </CardContent>
        </Card>

        <div className='space-y-4'>
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className='rounded-[1.75rem] border shadow-sm'>
              <CardHeader className='border-b border-border/70 pb-5'>
                <Skeleton className='h-6 w-40 rounded-full' />
                <Skeleton className='h-4 w-56 rounded-full' />
              </CardHeader>
              <CardContent className='space-y-3 pt-6'>
                {Array.from({ length: 3 }).map((__, innerIndex) => (
                  <Skeleton key={innerIndex} className='h-20 w-full rounded-2xl' />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatMetricValue(metric: DashboardMetric) {
  if (metric.format === 'currency') {
    return formatCurrency(Number(metric.value ?? 0));
  }

  if (metric.format === 'rating') {
    return `${Number(metric.value ?? 0).toFixed(1)} / 5`;
  }

  if (metric.format === 'number' || typeof metric.value === 'number') {
    return new Intl.NumberFormat('id-ID').format(Number(metric.value ?? 0));
  }

  return String(metric.value);
}

function formatDateLabel(dateTime: string) {
  try {
    return format(new Date(dateTime), 'dd MMM yyyy');
  } catch {
    return dateTime;
  }
}
