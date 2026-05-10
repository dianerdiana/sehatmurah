import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as appointmentController from './appointment.controller';
import {
  appointmentIdSchema,
  createAppointmentSchema,
  listAppointmentsSchema,
  updateAppointmentStatusSchema,
} from './appointment.schema';

export const appointmentRouter = Router();

appointmentRouter.use(authMiddleware);

appointmentRouter.post(
  '/',
  roleMiddleware(UserRole.PATIENT),
  validateRequest({ body: createAppointmentSchema }),
  appointmentController.createAppointment,
);

appointmentRouter.get(
  '/',
  roleMiddleware(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN),
  validateRequest({ query: listAppointmentsSchema }),
  appointmentController.listAppointments,
);

appointmentRouter.get(
  '/:id',
  roleMiddleware(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN),
  validateRequest({ params: appointmentIdSchema }),
  appointmentController.getAppointmentById,
);

appointmentRouter.patch(
  '/:id/status',
  roleMiddleware(UserRole.DOCTOR, UserRole.ADMIN),
  validateRequest({
    params: appointmentIdSchema,
    body: updateAppointmentStatusSchema,
  }),
  appointmentController.updateAppointmentStatus,
);

appointmentRouter.delete(
  '/:id',
  roleMiddleware(UserRole.PATIENT, UserRole.ADMIN),
  validateRequest({ params: appointmentIdSchema }),
  appointmentController.deleteAppointment,
);
