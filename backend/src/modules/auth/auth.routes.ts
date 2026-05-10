import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';
import { loginBodySchema, registerBodySchema } from './auth.schema';
import * as authController from './auth.controller';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest({ body: registerBodySchema }),
  authController.register,
);
authRouter.post(
  '/login',
  validateRequest({ body: loginBodySchema }),
  authController.login,
);
authRouter.get('/me', authMiddleware, authController.me);
