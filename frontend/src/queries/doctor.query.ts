import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { api } from '@/configs/api-config';
import type { ApiResponse } from '@/types/api-response.type';
import type { Doctor } from '@/types/doctor.type';
import type { Review } from '@/types/reviews.type';

type DoctorListParams = {
  specialist?: string;
  city?: string;
  search?: string;
  page?: number;
  limit?: number;
};

type DoctorCitiesParams = {
  search?: string;
  page?: number;
  limit?: number;
};

type DoctorReviewsParams = {
  page?: number;
  limit?: number;
};

export type DoctorScheduleItemDto = {
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
};

export type DoctorPracticeLocationDto = {
  clinicName: string;
  address: string;
  city: string;
};

export type CreateDoctorDto = {
  userId: string;
  fullName: string;
  specialist: string;
  profilePhoto?: string;
  experienceYears?: number;
  description?: string;
  practiceLocation: DoctorPracticeLocationDto;
  schedule?: DoctorScheduleItemDto[];
  consultationFee: number;
  isAvailable?: boolean;
};

export type UpdateDoctorDto = Partial<Omit<CreateDoctorDto, 'userId'>>;

export type UpdateDoctorScheduleDto = {
  schedule: DoctorScheduleItemDto[];
};

export const doctorQueries = {
  list: (params?: DoctorListParams) => queryOptions<Doctor[]>({ queryKey: ['/doctors', params] }),
  cities: (params?: DoctorCitiesParams) => queryOptions<string[]>({ queryKey: ['/doctors/cities', params] }),
  getById: (id: string) => queryOptions<Doctor>({ queryKey: [`/doctors/${id}`] }),
  getDoctorReviews: (id: string, params?: DoctorReviewsParams) =>
    queryOptions<Review[]>({ queryKey: [`/doctors/${id}/reviews`, params] }),
};

export const doctorMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['doctors', 'create'],
      mutationFn: async (payload: CreateDoctorDto) => {
        const response = await api.post<CreateDoctorDto, ApiResponse<Doctor>>('/doctors', payload);

        return response.data;
      },
    }),
  update: (id: string) =>
    mutationOptions({
      mutationKey: ['doctors', 'update', id],
      mutationFn: async (payload: UpdateDoctorDto) => {
        const response = await api.patch<UpdateDoctorDto, ApiResponse<Doctor>>(`/doctors/${id}`, payload);

        return response.data;
      },
    }),
  updateSchedule: (id: string) =>
    mutationOptions({
      mutationKey: ['doctors', 'update-schedule', id],
      mutationFn: async (payload: UpdateDoctorScheduleDto) => {
        const response = await api.patch<UpdateDoctorScheduleDto, ApiResponse<Doctor>>(
          `/doctors/${id}/schedule`,
          payload,
        );

        return response.data;
      },
    }),
  delete: (id: string) =>
    mutationOptions({
      mutationKey: ['doctors', 'delete', id],
      mutationFn: async () => {
        const response = await api.delete<ApiResponse<Record<string, never>>>(`/doctors/${id}`);

        return response.data;
      },
    }),
};
