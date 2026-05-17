import type { UserData } from '@/types/user-data';

export type LoginResponse = {
  token: string;
  user: UserData;
};
