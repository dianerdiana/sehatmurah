import { z } from 'zod';

export const DOCTOR_SCHEDULE_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export const DOCTOR_APPROVAL_STATUS = ['pending', 'approved', 'rejected'] as const;

export const doctorIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listDoctorsSchema = z.object({
  status: z.union([z.literal('all'), z.enum(DOCTOR_APPROVAL_STATUS)]).default('all'),
  isAvailable: z.enum(['all', 'true', 'false']).default('all'),
  specialist: z.string().trim().default(''),
  city: z.string().trim().default(''),
  search: z.string().trim().default(''),
  column: z.enum(['fullName', 'createdAt'] as const).default('createdAt'),
  sort: z.enum(['asc', 'desc'] as const).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const listDoctorsCitiesSchema = z.object({
  search: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

const doctorScheduleItemSchema = z.object({
  day: z.enum(DOCTOR_SCHEDULE_DAYS),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid startTime HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid endTime HH:mm'),
  isAvailable: z.boolean(),
});

const practiceLocationSchema = z.object({
  clinicName: z.string().trim().min(1, 'clinicName is required'),
  address: z.string().trim().min(1, 'address is required'),
  city: z.string().trim().min(1, 'city is required'),
});

export const createDoctorSchema = z.object({
  userId: z.string().trim().min(1, 'user is required'),
  fullName: z.string().trim().min(1, 'fullName is required'),
  specialist: z.string().trim().min(1, 'specialist is required'),
  profilePhoto: z.instanceof(File).optional(),
  experienceYears: z.number().int().min(0).optional(),
  description: z.string().trim().optional(),
  practiceLocation: practiceLocationSchema,
  consultationFee: z.number().min(0, 'consultationFee must be >= 0'),
  isAvailable: z.boolean().optional(),
});

export const updateDoctorSchema = createDoctorSchema
  .omit({ userId: true })
  .partial()
  .refine((value) => Object.keys(value).length > 0, 'at least one field must be provided');

export const updateDoctorScheduleSchema = z.object({
  schedule: z.array(doctorScheduleItemSchema),
});

export const approveDoctorSchema = z.object({
  status: z.literal('approved'),
});

export const rejectDoctorSchema = z.object({
  status: z.literal('rejected'),
  rejectionReason: z.string().trim().min(1, 'Rejection reason is required').max(500),
});

export const listReviewsByDoctorSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export type DoctorIdDto = z.infer<typeof doctorIdSchema>;
export type ListDoctorsDto = z.input<typeof listDoctorsSchema>;
export type ListDoctorsSearchState = z.output<typeof listDoctorsSchema>;
export type ListDoctorsCitiesDto = z.infer<typeof listDoctorsCitiesSchema>;
export type CreateDoctorFormDto = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorFormDto = z.infer<typeof updateDoctorSchema>;
export type CreateDoctorDto = FormData;
export type UpdateDoctorDto = FormData;
export type UpdateDoctorScheduleDto = z.infer<typeof updateDoctorScheduleSchema>;
export type ListReviewsByDoctorDto = z.infer<typeof listReviewsByDoctorSchema>;
export type ApproveDoctorDto = z.infer<typeof approveDoctorSchema>;
export type RejectDoctorDto = z.infer<typeof rejectDoctorSchema>;
