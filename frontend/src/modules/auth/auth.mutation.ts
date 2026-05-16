import { mutationOptions } from '@tanstack/react-query';

import { login } from './auth.api';
import type { LoginDto } from './auth.schema';

export const loginOptions = () => {
  return mutationOptions({
    mutationKey: ['auth', 'login'],
    mutationFn: (payload: LoginDto) => login(payload),
  });
};
