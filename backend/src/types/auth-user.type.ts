import { UserRole } from '../common/enums/user-role.enum';

export type AuthUser = {
  id: string;
  role: UserRole;
};
