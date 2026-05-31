import { createMongoAbility, type MongoQuery } from '@casl/ability';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import { themeConfig } from '@/configs/theme-config';

import type { AbilityRule, AppAbility, PermissionAction, PermissionSubject } from '@/types/ability-rule.type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createAbility(rules: AbilityRule[]): AppAbility {
  return createMongoAbility<[PermissionAction, PermissionSubject], MongoQuery>(rules, {
    detectSubjectType: (object: any) => object.type,
  });
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(themeConfig.app.localCurrency, {
    style: 'currency',
    currency: themeConfig.app.currency,
    minimumFractionDigits: 0,
  }).format(value);
};

export const dayMapping: Record<number, string> = {
  0: 'SUNDAY',
  1: 'MONDAY',
  2: 'TUESDAY',
  3: 'WEDNESDAY',
  4: 'THURSDAY',
  5: 'FRIDAY',
  6: 'SATURDAY',
};

export const formatDate = (dateTime: string) => {
  try {
    return format(new Date(dateTime), 'dd MMM yyyy');
  } catch {
    return dateTime;
  }
};

export const formatDateTime = (dateTime: string) => {
  try {
    return format(new Date(dateTime), 'dd MMM yyyy, HH:mm');
  } catch {
    return dateTime;
  }
};

export const formatAppointmentDate = (date: string | undefined) => {
  if (!date) {
    return '-';
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return format(parsedDate, 'dd MMM yyyy');
};

export const formatAppointmentTime = (time: string | undefined) => {
  if (!time) {
    return '-';
  }

  const [hours, minutes] = time.split(':');
  const hourNumber = Number(hours);
  const minuteNumber = Number(minutes);

  if (Number.isNaN(hourNumber) || Number.isNaN(minuteNumber)) {
    return time;
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(2000, 0, 1, hourNumber, minuteNumber));
};

export const formatTimeAgo = (date: string): string => {
  const now = new Date().getTime();
  const posted = new Date(date).getTime();
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} day ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hr ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} min ago`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} sec ago`;
  }
  return 'just now';
};
