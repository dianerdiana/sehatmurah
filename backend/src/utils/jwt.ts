import jwt, { SignOptions } from 'jsonwebtoken';

import { UserRole } from '../common/enums/user-role.enum';
import { env } from '../config/env';

export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
}

export const signAccessToken = (payload: AccessTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, env.jwtSecret, options);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.jwtSecret) as AccessTokenPayload;
};
