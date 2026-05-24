import z from 'zod';

export const createAppointmentSchema = z.object({
  doctor: z.string().trim().min(1, 'doctor is required'),
  appointmentDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'appointmentDate must use YYYY-MM-DD format'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid startTime HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid endTime HH:mm'),
  reason: z.string().trim().max(500).optional(),
});
