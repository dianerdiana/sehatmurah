import type { UserRole } from '@/types/enums/user-role.enum';

export type UserListItem = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
