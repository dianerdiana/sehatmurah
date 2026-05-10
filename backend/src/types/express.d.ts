/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

import { UserRole } from '../common/enums/user-role.enum';

import { AuthUser } from './auth-user.type';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
