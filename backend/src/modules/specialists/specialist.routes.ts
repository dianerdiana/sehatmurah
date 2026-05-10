import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as specialistController from './specialist.controller';
import {
  createSpecialistBodySchema,
  listSpecialistsQuerySchema,
  specialistIdParamSchema,
  updateSpecialistBodySchema,
} from './specialist.schema';

export const specialistRouter = Router();

specialistRouter.get(
  '/',
  validateRequest({ query: listSpecialistsQuerySchema }),
  specialistController.listSpecialists,
);
specialistRouter.get(
  '/:id',
  validateRequest({ params: specialistIdParamSchema }),
  specialistController.getSpecialistById,
);

specialistRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ body: createSpecialistBodySchema }),
  specialistController.createSpecialist,
);

specialistRouter.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({
    params: specialistIdParamSchema,
    body: updateSpecialistBodySchema,
  }),
  specialistController.updateSpecialist,
);

specialistRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: specialistIdParamSchema }),
  specialistController.deleteSpecialist,
);
