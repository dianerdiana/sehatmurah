import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as specialistController from './specialist.controller';
import {
  createSpecialistSchema,
  listSpecialistsSchema,
  specialistIdSchema,
  updateSpecialistSchema,
} from './specialist.schema';

export const specialistRouter = Router();

// Public Route
specialistRouter.get(
  '/',
  validateRequest({ query: listSpecialistsSchema }),
  specialistController.listSpecialists,
);
specialistRouter.get(
  '/:id',
  validateRequest({ params: specialistIdSchema }),
  specialistController.getSpecialistById,
);

// Private Route
specialistRouter.post(
  '/upload',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  upload.single('file'),
  specialistController.uploadSpecialistAsset,
);

specialistRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ body: createSpecialistSchema }),
  specialistController.createSpecialist,
);

specialistRouter.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({
    params: specialistIdSchema,
    body: updateSpecialistSchema,
  }),
  specialistController.updateSpecialist,
);

specialistRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: specialistIdSchema }),
  specialistController.deleteSpecialist,
);
