import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { AuthUser } from '../../types/auth-user.type';

import { LoginDto, RegisterDto } from './auth.schema';
import * as authService from './auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as RegisterDto;

    const data = await authService.register(payload);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as LoginDto;

    const data = await authService.login(payload);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;

    const data = await authService.me(authUser.id);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};
