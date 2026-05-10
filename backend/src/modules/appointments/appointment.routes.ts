import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as appointmentController from './appointment.controller';
import {
  appointmentIdParamSchema,
  createAppointmentBodySchema,
  listAppointmentsQuerySchema,
  updateAppointmentStatusBodySchema,
} from './appointment.schema';

export const appointmentRouter = Router();

appointmentRouter.use(authMiddleware);

appointmentRouter.post(
  '/',
  roleMiddleware(UserRole.PATIENT),
  validateRequest({ body: createAppointmentBodySchema }),
  appointmentController.createAppointment,
);

appointmentRouter.get(
  '/',
  roleMiddleware(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN),
  validateRequest({ query: listAppointmentsQuerySchema }),
  appointmentController.listAppointments,
);

appointmentRouter.get(
  '/:id',
  roleMiddleware(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN),
  validateRequest({ params: appointmentIdParamSchema }),
  appointmentController.getAppointmentById,
);

appointmentRouter.patch(
  '/:id/status',
  roleMiddleware(UserRole.DOCTOR, UserRole.ADMIN),
  validateRequest({
    params: appointmentIdParamSchema,
    body: updateAppointmentStatusBodySchema,
  }),
  appointmentController.updateAppointmentStatus,
);

appointmentRouter.delete(
  '/:id',
  roleMiddleware(UserRole.PATIENT, UserRole.ADMIN),
  validateRequest({ params: appointmentIdParamSchema }),
  appointmentController.deleteAppointment,
);
