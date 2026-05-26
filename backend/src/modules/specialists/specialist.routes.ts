import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { mapFilesToBody } from '../../middlewares/map-file-to-body.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as specialistController from './specialist.controller';
import { listSpecialistsSchema, specialistIdSchema } from './specialist.schema';

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
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  mapFilesToBody,
  specialistController.createSpecialist,
);

specialistRouter.put(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
  ]),
  mapFilesToBody,
  validateRequest({
    params: specialistIdSchema,
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
