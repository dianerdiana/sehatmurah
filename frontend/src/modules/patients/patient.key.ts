import type { ListPatientsDto } from './patient.schema';

export const patientKeys = {
  all: ['patients'] as const,

  me: () => [...patientKeys.all, 'me'] as const,

  lists: () => [...patientKeys.all, 'list'] as const,

  list: (params?: ListPatientsDto) => [...patientKeys.lists(), params] as const,

  details: () => [...patientKeys.all, 'detail'] as const,

  detail: (id: string) => [...patientKeys.details(), id] as const,

  mutations: () => [...patientKeys.all, 'mutation'] as const,

  updateMyProfile: () => [...patientKeys.mutations(), 'update-my-profile'] as const,

  delete: (id: string) => [...patientKeys.mutations(), 'delete', id] as const,
};
