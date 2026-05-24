export const patientKeys = {
  all: ['patients'] as const,

  me: () => [...patientKeys.all, 'me'] as const,

  details: () => [...patientKeys.all, 'detail'] as const,

  detail: (id: string) => [...patientKeys.details(), id] as const,

  mutations: () => [...patientKeys.all, 'mutation'] as const,

  updateMyProfile: () => [...patientKeys.mutations(), 'update-my-profile'] as const,
};
