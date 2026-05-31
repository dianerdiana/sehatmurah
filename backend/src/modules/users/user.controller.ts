import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';

import { CreateUserDto, ListUsersDto, UpdateUserDto, UserIdDto } from './user.schema';
import * as userService from './user.service';

export const createUser = async (req: Request, res: Response) => {
  const payload = req.body as CreateUserDto;
  const data = await userService.createUser(payload);

  res.status(201).json(HttpResponse.success({ data }));
};

export const getUserById = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as UserIdDto;
  const userId = params.id;

  const data = await userService.getUserById(userId);
  res.json(HttpResponse.success({ data }));
};

export const listUsers = async (req: Request, res: Response) => {
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
};

export const updateUser = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as UserIdDto;
  const userId = params.id;
  const payload = req.body as UpdateUserDto;
  const actorUserId = req.user?.id;
  const data = await userService.updateUser(userId, payload, actorUserId);

  res.json(HttpResponse.success({ data }));
};

export const deleteUser = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as UserIdDto;
  const userId = params.id;

  const data = await userService.deleteUser(userId);
  res.json(HttpResponse.success({ data, message: 'User deleted' }));
};
