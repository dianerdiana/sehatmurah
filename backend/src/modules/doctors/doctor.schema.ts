import { z } from 'zod';

export const doctorIdParamSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listDoctorsQuerySchema = z.object({
  specialist: z.string().trim().min(1).optional(),
  city: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
});

const doctorScheduleItemSchema = z.object({
  day: z.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ]),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid startTime HH:mm'),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'invalid endTime HH:mm'),
  isAvailable: z.boolean().default(true),
});

const practiceLocationSchema = z.object({
  clinicName: z.string().trim().min(1, 'clinicName is required'),
  address: z.string().trim().min(1, 'address is required'),
  city: z.string().trim().min(1, 'city is required'),
});

export const createDoctorBodySchema = z.object({
  user: z.string().trim().min(1, 'user is required'),
  fullName: z.string().trim().min(1, 'fullName is required'),
  specialist: z.string().trim().min(1, 'specialist is required'),
  profilePhoto: z.string().trim().url().optional(),
  experienceYears: z.number().int().min(0).optional(),
  description: z.string().trim().optional(),
  practiceLocation: practiceLocationSchema,
  schedule: z.array(doctorScheduleItemSchema).optional(),
  consultationFee: z.number().min(0, 'consultationFee must be >= 0'),
  isAvailable: z.boolean().optional(),
});

export const updateDoctorBodySchema = createDoctorBodySchema
  .omit({ user: true })
  .partial()
  .refine(
    (value) => Object.keys(value).length > 0,
    'at least one field must be provided',
  );

export const updateDoctorScheduleBodySchema = z.object({
  schedule: z.array(doctorScheduleItemSchema),
});
