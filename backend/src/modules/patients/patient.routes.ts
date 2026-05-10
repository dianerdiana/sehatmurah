import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as patientController from './patient.controller';
import { patientIdSchema, updateMyProfileSchema } from './patient.schema';

export const patientRouter = Router();

patientRouter.use(authMiddleware);

patientRouter.get('/me', roleMiddleware(UserRole.PATIENT), patientController.getMyProfile);
patientRouter.patch(
  '/me',
  roleMiddleware(UserRole.PATIENT),
  validateRequest({ body: updateMyProfileSchema }),
  patientController.updateMyProfile,
);

patientRouter.get(
  '/:id',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: patientIdSchema }),
  patientController.getPatientById,
);
