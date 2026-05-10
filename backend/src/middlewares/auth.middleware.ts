import { NextFunction, Request, Response } from 'express';
import { ApiError } from './error.middleware';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new ApiError(401, 'Unauthorized'));
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(new ApiError(401, 'Invalid token'));
  }
};
