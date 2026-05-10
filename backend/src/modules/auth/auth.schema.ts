import { z } from 'zod';

import { UserRole } from '../../common/enums/user-role.enum';

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'name is required').max(120),
  email: z.email('invalid email').max(255),
  password: z.string().min(8, 'password must be at least 8 characters').max(128),
  role: z.enum(UserRole).optional(),
});

export const loginSchema = z.object({
  email: z.email('invalid email').max(255),
  password: z.string().min(1, 'password is required').max(128),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
