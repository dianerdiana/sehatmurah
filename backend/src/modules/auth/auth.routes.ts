import { Router } from 'express';

import { authMiddleware } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as authController from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

export const authRouter = Router();

authRouter.post('/register', validateRequest({ body: registerSchema }), authController.register);
authRouter.post('/login', validateRequest({ body: loginSchema }), authController.login);
authRouter.get('/me', authMiddleware, authController.me);
