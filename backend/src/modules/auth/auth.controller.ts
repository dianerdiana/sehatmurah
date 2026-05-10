import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../common/http-response';
import { ApiError } from '../../common/api-error';
import * as authService from './auth.service';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, role } = req.body;

    const data = await authService.register({ name, email, password, role });
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const data = await authService.login({ email, password });
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const data = await authService.me(req.user.id);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};
