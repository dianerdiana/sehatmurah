import type { ListAppointmentsDto } from './appointment.schema';

export const appointmentKeys = {
  all: ['appointments'] as const,

  lists: () => [...appointmentKeys.all, 'list'] as const,

  list: (params?: ListAppointmentsDto) => [...appointmentKeys.lists(), params] as const,

  details: () => [...appointmentKeys.all, 'detail'] as const,

  detail: (id: string) => [...appointmentKeys.details(), id] as const,

  mutations: () => [...appointmentKeys.all, 'mutation'] as const,

  create: () => [...appointmentKeys.mutations(), 'create'] as const,

  updateStatus: (id: string) => [...appointmentKeys.mutations(), 'update-status', id] as const,

  delete: (id: string) => [...appointmentKeys.mutations(), 'delete', id] as const,
};
