import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { AuthUser } from '../../types/auth-user.type';

import * as dashboardService from './dashboard.service';

export const getDashboardSummary = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const data = await dashboardService.getDashboardSummary(authUser);

  res.json(HttpResponse.success({ data }));
};
