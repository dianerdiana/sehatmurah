import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../common/enums/user-role.enum';
import { ApiError } from './error.middleware';

export const roleMiddleware = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ApiError(401, 'Unauthorized'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new ApiError(403, 'Forbidden'));
      return;
    }

    next();
  };
};
