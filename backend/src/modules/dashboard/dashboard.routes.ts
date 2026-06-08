import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

import * as dashboardController from './dashboard.controller';

export const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);
dashboardRouter.use(roleMiddleware(UserRole.ADMIN, UserRole.DOCTOR));

dashboardRouter.get('/', dashboardController.getDashboardSummary);
