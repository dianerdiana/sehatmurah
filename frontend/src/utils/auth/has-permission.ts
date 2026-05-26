import type { AppAbility, PermissionAction, PermissionSubject } from '@/types/ability-rule.type';

export const hasPermission = (ability: AppAbility, action: PermissionAction, subject: PermissionSubject) => {
  return ability.can(action, subject);
};
