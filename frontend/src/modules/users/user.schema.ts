import { z } from 'zod';

import { UserRole } from '@/types/enums/user-role.enum';

export const userIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listUsersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
  role: z.union([z.literal('all'), z.enum(UserRole)]).default('all'),
  isActive: z.enum(['all', 'true', 'false']).default('all'),
  column: z.enum(['name', 'createdAt'] as const).default('createdAt'),
  sort: z.enum(['asc', 'desc'] as const).default('desc'),
});

export const createUserSchema = z.object({
  name: z.string().trim().min(1, 'name is required').max(120),
  email: z.email('invalid email').max(255),
  password: z.string().min(8, 'password must be at least 8 characters').max(128),
  role: z.enum(UserRole),
  isActive: z.boolean(),
});

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(1, 'name is required').max(120).optional(),
    email: z.email('invalid email').max(255).optional(),
    password: z.string().min(8, 'password must be at least 8 characters').max(128).optional(),
    role: z.enum(UserRole).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, 'at least one field must be provided');

export type UserIdDto = z.infer<typeof userIdSchema>;
export type ListUsersDto = z.input<typeof listUsersSchema>;
export type ListUsersSearchState = z.output<typeof listUsersSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
