import { z } from 'zod';

export const reviewIdParamSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const doctorIdParamSchema = z.object({
  doctorId: z.string().trim().min(1, 'doctorId is required'),
});

export const createReviewBodySchema = z.object({
  doctor: z.string().trim().min(1, 'doctor is required'),
  appointment: z.string().trim().min(1).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional(),
});

export const listReviewsByDoctorQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListReviewsByDoctorQuery = z.infer<
  typeof listReviewsByDoctorQuerySchema
>;
