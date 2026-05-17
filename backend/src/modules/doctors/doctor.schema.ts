import { z } from 'zod';

export const doctorIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listDoctorsSchema = z.object({
  specialist: z.string().trim().min(1).optional(),
  city: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const listDoctorsCitiesSchema = z.object({
  search: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

const doctorScheduleItemSchema = z.object({
  day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid startTime HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid endTime HH:mm'),
  isAvailable: z.boolean().default(true),
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
  profilePhoto: z.url().optional(),
  experienceYears: z.number().int().min(0).optional(),
  description: z.string().trim().optional(),
  practiceLocation: practiceLocationSchema,
  schedule: z.array(doctorScheduleItemSchema).optional(),
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

export type DoctorIdDto = z.infer<typeof doctorIdSchema>;
export type ListDoctorsDto = z.infer<typeof listDoctorsSchema>;
export type ListDoctorsCitiesDto = z.infer<typeof listDoctorsCitiesSchema>;
export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorDto = z.infer<typeof updateDoctorSchema>;
export type UpdateDoctorScheduleDto = z.infer<typeof updateDoctorScheduleSchema>;
