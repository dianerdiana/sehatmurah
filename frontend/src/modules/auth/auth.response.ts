import type { UserData } from '@/types/user-data.type';
import type { AbilityRule } from '@/types/ability-rule.type';

export type LoginResponse = {
  token: string;
  user: Omit<UserData, 'permissions'>;
  permissions: AbilityRule[];
};
