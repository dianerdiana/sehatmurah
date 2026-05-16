import type { LoginDto } from './auth.schema';

import { api } from '@/configs/api-config';
import { toApiError } from '@/configs/auth/jwt-service';
import type { UserRole } from '@/types/enums/user-role.enum';
import type { HttpResponse } from '@/types/http-response';

export const login = async (payload: LoginDto) => {
  try {
    const res = await api.post<
      LoginDto,
      HttpResponse<{
        token: string;
        user: {
          id: string;
          email: string;
          role: UserRole;
          name: string;
        };
      }>
    >('/auth/login', payload);

    return res.data;
  } catch (error) {
    return toApiError(error);
  }
};
