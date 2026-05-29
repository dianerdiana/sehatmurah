import { z } from 'zod';

import { UserRole } from '../../common/enums/user-role.enum';

export const userIdSchema = z.object({
  id: z.string().trim().min(1, 'id is required'),
});

export const listUsersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
  role: z.union([z.literal('all'), z.nativeEnum(UserRole)]).default('all'),
  isActive: z.enum(['all', 'true', 'false']).default('all'),
  column: z.enum(['name', 'createdAt'] as const).default('createdAt'),
  sort: z.enum(['asc', 'desc'] as const).default('desc'),
});

export type UserIdDto = z.infer<typeof userIdSchema>;
export type ListUsersDto = z.infer<typeof listUsersSchema>;
