import type { ListUsersDto } from './user.schema';

export const userKeys = {
  all: ['users'] as const,

  lists: () => [...userKeys.all, 'list'] as const,

  list: (params?: ListUsersDto) => [...userKeys.lists(), params] as const,

  details: () => [...userKeys.all, 'detail'] as const,

  detail: (id: string) => [...userKeys.details(), id] as const,

  mutations: () => [...userKeys.all, 'mutation'] as const,

  delete: (id: string) => [...userKeys.mutations(), 'delete', id] as const,
};
