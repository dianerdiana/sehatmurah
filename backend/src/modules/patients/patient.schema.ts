import { z } from 'zod';
import { Gender } from '../../common/enums/gender.enum';

export const patientIdParamSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const updateMyProfileBodySchema = z
  .object({
    fullName: z.string().trim().min(1).optional(),
    dateOfBirth: z.coerce.date().optional(),
    gender: z.enum(Gender).optional(),
    phoneNumber: z.string().trim().min(5).max(30).optional(),
    address: z.string().trim().min(1).max(500).optional(),
  })
  .refine(
    (value) => Object.keys(value).length > 0,
    'at least one field must be provided',
  );
