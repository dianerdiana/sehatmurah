import type { MongoAbility } from '@casl/ability';

import type { PermissionAction, PermissionSubject } from '@/types/ability-rule.type';

export const hasPermission = (ability: MongoAbility, action: PermissionAction, subject: PermissionSubject) => {
  return ability.can(action, subject);
};
