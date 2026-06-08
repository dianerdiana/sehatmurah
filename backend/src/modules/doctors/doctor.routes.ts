import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { mapFilesToBody } from '../../middlewares/map-file-to-body.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';
import { listReviewsByDoctor } from '../reviews/review.controller';
import {
  doctorIdSchema as doctorReviewParamSchema,
  listReviewsByDoctorSchema,
} from '../reviews/review.schema';

import * as doctorController from './doctor.controller';
import {
  approveDoctorSchema,
  createDoctorRequestSchema,
  createDoctorSchema,
  doctorIdSchema,
  listDoctorsCitiesSchema,
  listDoctorsSchema,
  rejectDoctorSchema,
  updateDoctorScheduleSchema,
  updateDoctorSchema,
} from './doctor.schema';

export const doctorRouter = Router();

doctorRouter.get('/', validateRequest({ query: listDoctorsSchema }), doctorController.listDoctors);
doctorRouter.get(
  '/cities',
  validateRequest({ query: listDoctorsCitiesSchema }),
  doctorController.listDoctorsCities,
);
doctorRouter.get('/me', authMiddleware, doctorController.getMyDoctorProfile);
doctorRouter.get(
  '/:id',
  validateRequest({ params: doctorIdSchema }),
  doctorController.getDoctorById,
);
doctorRouter.get(
  '/:doctorId/reviews',
  validateRequest({
    params: doctorReviewParamSchema,
    query: listReviewsByDoctorSchema,
  }),
  listReviewsByDoctor,
);

doctorRouter.post(
  '/request',
  authMiddleware,
  roleMiddleware(UserRole.PATIENT),
  upload.fields([{ name: 'profilePhoto', maxCount: 1 }]),
  mapFilesToBody,
  validateRequest({ body: createDoctorRequestSchema }),
  doctorController.requestDoctor,
);

doctorRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  upload.fields([{ name: 'profilePhoto', maxCount: 1 }]),
  mapFilesToBody,
  validateRequest({ body: createDoctorSchema }),
  doctorController.createDoctor,
);

doctorRouter.put(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN, UserRole.DOCTOR),
  upload.fields([{ name: 'profilePhoto', maxCount: 1 }]),
  mapFilesToBody,
  validateRequest({
    params: doctorIdSchema,
    body: updateDoctorSchema,
  }),
  doctorController.updateDoctor,
);

doctorRouter.patch(
  '/:id/approve',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({
    params: doctorIdSchema,
    body: approveDoctorSchema,
  }),
  doctorController.approveDoctor,
);

doctorRouter.patch(
  '/:id/reject',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({
    params: doctorIdSchema,
    body: rejectDoctorSchema,
  }),
  doctorController.rejectDoctor,
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
