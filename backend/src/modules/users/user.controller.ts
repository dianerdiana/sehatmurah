import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';

import { ListUsersDto } from './user.schema';
import * as userService from './user.service';

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = String(req.params.id);

    const data = await userService.getUserById(userId);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.sanitizedQuery as ListUsersDto;
    const result = await userService.listUsers(payload);

    res.json(
      HttpResponse.success({
        data: result.items,
        meta: buildResponseMeta({
          ...payload,
          totalItems: result.totalItems,
        }),
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = String(req.params.id);

    const data = await userService.deleteUser(userId);
    res.json(HttpResponse.success({ data, message: 'User deleted' }));
  } catch (error) {
    next(error);
  }
};
