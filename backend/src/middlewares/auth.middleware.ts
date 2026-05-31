import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../common/api-error';
import { UserModel } from '../models/user.model';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized');
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = verifyAccessToken(token);

    const user = await UserModel.findById(payload.sub).select('role isActive');

    if (!user || !user.isActive) {
      throw new ApiError(401, 'Your account has been disabled');
    }

    req.user = { id: payload.sub, role: user.role };
    next();
  } catch {
    throw new ApiError(401, 'Invalid token');
  }
};
