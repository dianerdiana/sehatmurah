import type { ListReviewsByDoctorDto, ListReviewsDto } from './review.schema';

export const reviewKeys = {
  all: ['reviews'] as const,

  details: () => [...reviewKeys.all, 'detail'] as const,

  detail: (id: string) => [...reviewKeys.details(), id] as const,

  lists: () => [...reviewKeys.all, 'list'] as const,

  list: (params?: ListReviewsDto) => [...reviewKeys.lists(), params] as const,

  doctorLists: () => [...reviewKeys.all, 'doctor-list'] as const,

  doctorList: (doctorId: string, params?: ListReviewsByDoctorDto) =>
    [...reviewKeys.doctorLists(), doctorId, params] as const,

  mutations: () => [...reviewKeys.all, 'mutation'] as const,

  create: () => [...reviewKeys.mutations(), 'create'] as const,

  update: (id: string) => [...reviewKeys.mutations(), 'update', id] as const,

  delete: (id: string) => [...reviewKeys.mutations(), 'delete', id] as const,
};
