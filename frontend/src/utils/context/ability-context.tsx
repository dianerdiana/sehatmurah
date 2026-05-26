import { createContext } from 'react';

import type { MongoAbility } from '@casl/ability';
import { Can as CaslCan, type CanProps } from '@casl/react';

import { ability } from '@/configs/acl/initial-ability';

import type { PermissionAction, PermissionSubject } from '@/types/ability-rule.type';

export type AppAbility = MongoAbility<[PermissionAction, PermissionSubject]>;

export const AbilityContext = createContext(ability);
export const Can = (props: CanProps<AppAbility>) => <CaslCan {...props} />;
