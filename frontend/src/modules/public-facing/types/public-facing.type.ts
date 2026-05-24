import z from 'zod';

import type { createAppointmentSchema } from '../schemas/public-facing.schema';

export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
