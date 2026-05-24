import { z } from 'zod';

export const specialistIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listSpecialistsSchema = z.object({
  isActive: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const createSpecialistSchema = z.object({
  name: z.string().trim().min(1, 'name is required'),
  slug: z.string().trim().min(1).optional(),
  description: z.string().trim().max(500).optional(),
  icon: z.string().trim().max(255).optional(),
  image: z.string().trim().max(255).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const updateSpecialistSchema = createSpecialistSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, 'at least one field must be provided');

export type SpecialistIdDto = z.infer<typeof specialistIdSchema>;
export type ListSpecialistsDto = z.infer<typeof listSpecialistsSchema>;
export type CreateSpecialistDto = z.infer<typeof createSpecialistSchema>;
export type UpdateSpecialistDto = z.infer<typeof updateSpecialistSchema>;
