import { z } from 'zod';

import { AppointmentStatus } from '../../common/enums/appointment-status.enum';

export const appointmentIdParamSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const createAppointmentBodySchema = z.object({
  doctor: z.string().trim().min(1, 'doctor is required'),
  appointmentDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'appointmentDate must use YYYY-MM-DD format'),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid startTime HH:mm'),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid endTime HH:mm'),
  reason: z.string().trim().max(500).optional(),
});

export const updateAppointmentStatusBodySchema = z.object({
  status: z.enum(AppointmentStatus),
});

export const listAppointmentsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListAppointmentsQuery = z.infer<typeof listAppointmentsQuerySchema>;
