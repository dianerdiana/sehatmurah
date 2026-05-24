import { createMongoAbility } from '@casl/ability';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { themeConfig } from '@/configs/theme-config';
import type { AbilityRule } from '@/types/ability-rule.type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createAbility(rules: AbilityRule[]) {
  return createMongoAbility(rules, {
    detectSubjectType: (object: any) => object!.type,
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
