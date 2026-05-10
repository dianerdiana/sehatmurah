import { z } from 'zod';

export const specialistIdParamSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listSpecialistsQuerySchema = z.object({
  isActive: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListSpecialistsQuery = z.infer<typeof listSpecialistsQuerySchema>;

export const createSpecialistBodySchema = z.object({
  name: z.string().trim().min(1, 'name is required'),
  slug: z.string().trim().min(1).optional(),
  description: z.string().trim().max(500).optional(),
  icon: z.string().trim().max(255).optional(),
  image: z.string().trim().max(255).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const updateSpecialistBodySchema = createSpecialistBodySchema
  .partial()
  .refine(
    (value) => Object.keys(value).length > 0,
    'at least one field must be provided',
  );
