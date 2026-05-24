import { z } from 'zod';

import { Gender } from '@/types/enums/gender.enum';

export const patientIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const updateMyProfileSchema = z
  .object({
    fullName: z.string().trim().min(1).optional(),
    dateOfBirth: z.coerce.date().optional(),
    gender: z.enum(Gender).optional(),
    phoneNumber: z.string().trim().min(5).max(30).optional(),
    address: z.string().trim().min(1).max(500).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, 'at least one field must be provided');

export type PatientIdDto = z.infer<typeof patientIdSchema>;
export type UpdateMyProfileDto = z.infer<typeof updateMyProfileSchema>;
