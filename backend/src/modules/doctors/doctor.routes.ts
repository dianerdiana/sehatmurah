import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';
import { listReviewsByDoctor } from '../reviews/review.controller';
import {
  doctorIdSchema as doctorReviewParamSchema,
  listReviewsByDoctorQuerySchema,
} from '../reviews/review.schema';

import * as doctorController from './doctor.controller';
import {
  createDoctorSchema,
  doctorIdSchema,
  listDoctorsSchema,
  updateDoctorScheduleSchema,
  updateDoctorSchema,
} from './doctor.schema';

export const doctorRouter = Router();

doctorRouter.get('/', validateRequest({ query: listDoctorsSchema }), doctorController.listDoctors);
doctorRouter.get(
  '/:id',
  validateRequest({ params: doctorIdSchema }),
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
  validateRequest({ body: createDoctorSchema }),
  doctorController.createDoctor,
);

doctorRouter.patch(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest({
    params: doctorIdSchema,
    body: updateDoctorSchema,
  }),
  doctorController.updateDoctor,
);

doctorRouter.patch(
  '/:id/schedule',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest({
    params: doctorIdSchema,
    body: updateDoctorScheduleSchema,
  }),
  doctorController.updateDoctorSchedule,
);

doctorRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: doctorIdSchema }),
  doctorController.deleteDoctor,
);
