import type { ListSpecialistsDto } from './specialist.schema';

export const specialistKeys = {
  all: ['specialists'] as const,

  lists: () => [...specialistKeys.all, 'list'] as const,

  list: (params?: ListSpecialistsDto) => [...specialistKeys.lists(), params] as const,

  details: () => [...specialistKeys.all, 'detail'] as const,

  detail: (id: string) => [...specialistKeys.details(), id] as const,

  mutations: () => [...specialistKeys.all, 'mutation'] as const,

  create: () => [...specialistKeys.mutations(), 'create'] as const,

  update: (id: string) => [...specialistKeys.mutations(), 'update', id] as const,

  delete: (id: string) => [...specialistKeys.mutations(), 'delete', id] as const,
};
