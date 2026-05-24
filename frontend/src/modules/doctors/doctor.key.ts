import type { ListDoctorsCitiesDto, ListDoctorsDto, ListReviewsByDoctorDto } from './doctor.schema';

export const doctorKeys = {
  all: ['doctors'] as const,

  lists: () => [...doctorKeys.all, 'list'] as const,

  list: (params?: ListDoctorsDto) => [...doctorKeys.lists(), params] as const,

  cities: (params?: ListDoctorsCitiesDto) => [...doctorKeys.all, 'cities', params] as const,

  details: () => [...doctorKeys.all, 'detail'] as const,

  detail: (id: string) => [...doctorKeys.details(), id] as const,

  reviews: (id: string, params?: ListReviewsByDoctorDto) => [...doctorKeys.detail(id), 'reviews', params] as const,

  mutations: () => [...doctorKeys.all, 'mutation'] as const,

  create: () => [...doctorKeys.mutations(), 'create'] as const,

  update: (id: string) => [...doctorKeys.mutations(), 'update', id] as const,

  updateSchedule: (id: string) => [...doctorKeys.mutations(), 'update-schedule', id] as const,

  delete: (id: string) => [...doctorKeys.mutations(), 'delete', id] as const,
};
