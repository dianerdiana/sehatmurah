import { z } from 'zod';

import { ReviewStatus } from '@/types/enums/review-status.enum';

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
  status: z.enum(ReviewStatus).default(ReviewStatus.PENDING),
});

export const updateReviewSchema = z
  .object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().trim().max(1000).optional(),
    status: z.enum(ReviewStatus).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, 'at least one field must be provided');

export const listReviewsByDoctorSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const listReviewsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
  status: z.union([z.literal('all'), z.enum(ReviewStatus)]).default('all'),
  specialist: z.string().trim().default(''),
  rating: z.union([z.literal('all'), z.enum(['1', '2', '3', '4', '5'])]).default('all'),
  startDate: z.string().trim().default(''),
  endDate: z.string().trim().default(''),
  column: z.enum(['patientName', 'doctorName', 'rating', 'createdAt'] as const).default('createdAt'),
  sort: z.enum(['asc', 'desc'] as const).default('desc'),
});

export type ReviewIdDto = z.infer<typeof reviewIdSchema>;
export type DoctorIdDto = z.infer<typeof doctorIdSchema>;
export type CreateReviewDto = z.infer<typeof createReviewSchema>;
export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;
export type ListReviewsByDoctorDto = z.infer<typeof listReviewsByDoctorSchema>;
export type ListReviewsDto = z.input<typeof listReviewsSchema>;
export type ListReviewsSearchState = z.output<typeof listReviewsSchema>;
