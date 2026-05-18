import type { UserRole } from './enums/user-role.enum';

export type UserData = {
  id: string;
  name: string;
  role: UserRole;
  email: string;
};
