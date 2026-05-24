import type { ListReviewsByDoctorDto } from './review.schema';

export const reviewKeys = {
  all: ['reviews'] as const,

  doctorLists: () => [...reviewKeys.all, 'doctor-list'] as const,

  doctorList: (doctorId: string, params?: ListReviewsByDoctorDto) =>
    [...reviewKeys.doctorLists(), doctorId, params] as const,

  mutations: () => [...reviewKeys.all, 'mutation'] as const,

  create: () => [...reviewKeys.mutations(), 'create'] as const,

  delete: (id: string) => [...reviewKeys.mutations(), 'delete', id] as const,
};
