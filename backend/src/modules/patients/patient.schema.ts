import { z } from 'zod';

import { Gender } from '../../common/enums/gender.enum';

export const patientIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listPatientsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
  gender: z.enum(['all', 'MALE', 'FEMALE']).default('all'),
  column: z.enum(['fullName', 'createdAt']).default('createdAt'),
  sort: z.enum(['asc', 'desc']).default('desc'),
});

const patientEditableProfileSchema = z.object({
  fullName: z.string().trim().min(1).optional(),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(Gender).optional(),
  phoneNumber: z.string().trim().min(5).max(30).optional(),
  address: z.string().trim().min(1).max(500).optional(),
});

export const updateMyProfileSchema = patientEditableProfileSchema.refine(
  (value) => Object.keys(value).length > 0,
  'at least one field must be provided',
);

export const updatePatientSchema = patientEditableProfileSchema.refine(
  (value) => Object.keys(value).length > 0,
  'at least one field must be provided',
);

export type PatientIdDto = z.infer<typeof patientIdSchema>;
export type ListPatientsDto = z.infer<typeof listPatientsSchema>;
export type UpdateMyProfileDto = z.infer<typeof updateMyProfileSchema>;
export type UpdatePatientDto = z.infer<typeof updatePatientSchema>;
