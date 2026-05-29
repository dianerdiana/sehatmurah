import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as userController from './user.controller';
import { listUsersSchema, userIdSchema } from './user.schema';

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get(
  '/',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ query: listUsersSchema }),
  userController.listUsers,
);

userRouter.get(
  '/:id',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: userIdSchema }),
  userController.getUserById,
);

userRouter.delete(
  '/:id',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: userIdSchema }),
  userController.deleteUser,
);
