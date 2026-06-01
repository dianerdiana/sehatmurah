import { mutationOptions } from '@tanstack/react-query';

import { doctorApi } from './doctor.api';
import { doctorKeys } from './doctor.key';
import type {
  ApproveDoctorDto,
  CreateDoctorDto,
  RejectDoctorDto,
  UpdateDoctorDto,
  UpdateDoctorScheduleDto,
} from './doctor.schema';

export const doctorMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: doctorKeys.create(),
      mutationFn: (payload: CreateDoctorDto) => doctorApi.create(payload),
    }),

  request: () =>
    mutationOptions({
      mutationKey: doctorKeys.request(),
      mutationFn: (payload: CreateDoctorDto) => doctorApi.request(payload),
    }),

  update: (id: string) =>
    mutationOptions({
      mutationKey: doctorKeys.update(id),
      mutationFn: (payload: UpdateDoctorDto) => doctorApi.update(id, payload),
    }),

  updateSchedule: (id: string) =>
    mutationOptions({
      mutationKey: doctorKeys.updateSchedule(id),
      mutationFn: (payload: UpdateDoctorScheduleDto) => doctorApi.updateSchedule(id, payload),
    }),

  approve: (id: string) =>
    mutationOptions({
      mutationKey: doctorKeys.approve(id),
      mutationFn: (payload: ApproveDoctorDto) => doctorApi.approve(id, payload),
    }),

  reject: (id: string) =>
    mutationOptions({
      mutationKey: doctorKeys.reject(id),
      mutationFn: (payload: RejectDoctorDto) => doctorApi.reject(id, payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: doctorKeys.delete(id),
      mutationFn: () => doctorApi.delete(id),
    }),
};
