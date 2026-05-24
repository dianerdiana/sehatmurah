import { z } from 'zod';

export const reviewIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const doctorIdSchema = z.object({
  doctorId: z.string().trim().min(1, 'doctorId is required'),
});

export const createReviewSchema = z.object({
  doctor: z.string().trim().min(1, 'doctor is required'),
  appointment: z.string().trim().min(1).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional(),
});

export const listReviewsByDoctorSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ReviewIdDto = z.infer<typeof reviewIdSchema>;
export type DoctorIdDto = z.infer<typeof doctorIdSchema>;
export type CreateReviewDto = z.infer<typeof createReviewSchema>;
export type ListReviewsByDoctorDto = z.infer<typeof listReviewsByDoctorSchema>;
