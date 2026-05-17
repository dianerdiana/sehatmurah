import type { AbilityRule } from '@/types/ability-rule';
import { createMongoAbility } from '@casl/ability';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createAbility(rules: AbilityRule[]) {
  return createMongoAbility(rules, {
    detectSubjectType: (object: any) => object!.type,
  });
}
