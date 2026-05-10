import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';
import { listReviewsByDoctor } from '../reviews/review.controller';
import {
  doctorIdParamSchema as doctorReviewParamSchema,
  listReviewsByDoctorQuerySchema,
} from '../reviews/review.schema';

import * as doctorController from './doctor.controller';
import {
  createDoctorBodySchema,
  doctorIdParamSchema,
  listDoctorsQuerySchema,
  updateDoctorBodySchema,
  updateDoctorScheduleBodySchema,
} from './doctor.schema';

export const doctorRouter = Router();

doctorRouter.get(
  '/',
  validateRequest({ query: listDoctorsQuerySchema }),
  doctorController.listDoctors,
);
doctorRouter.get(
  '/:id',
  validateRequest({ params: doctorIdParamSchema }),
  doctorController.getDoctorById,
);
doctorRouter.get(
  '/:doctorId/reviews',
  validateRequest({
    params: doctorReviewParamSchema,
    query: listReviewsByDoctorQuerySchema,
  }),
  listReviewsByDoctor,
);

doctorRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ body: createDoctorBodySchema }),
  doctorController.createDoctor,
);

doctorRouter.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest({
    params: doctorIdParamSchema,
    body: updateDoctorBodySchema,
  }),
  doctorController.updateDoctor,
);

doctorRouter.patch(
  '/:id/schedule',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest({
    params: doctorIdParamSchema,
    body: updateDoctorScheduleBodySchema,
  }),
  doctorController.updateDoctorSchedule,
);

doctorRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: doctorIdParamSchema }),
  doctorController.deleteDoctor,
);
