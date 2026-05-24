import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { api } from '@/configs/api-config';
import type { CreateAppointmentDto } from '@/modules/public-facing/types/public-facing.type';
import type { ApiResponse } from '@/types/api-response.type';
import type { AppointmentStatus } from '@/types/enums/appointment-status.enum';

type AppointmentParty = {
  _id: string;
  fullName: string;
  consultationFee?: number;
  user?: string;
};

type Appointment = {
  _id: string;
  patient: string | AppointmentParty;
  doctor: string | AppointmentParty;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  reason?: string;
  status: AppointmentStatus;
  bookingCode: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

type AppointmentListParams = {
  page?: number;
  limit?: number;
};

export type UpdateAppointmentStatusDto = {
  status: AppointmentStatus;
};

export const appointmentQueries = {
  list: (params?: AppointmentListParams) => queryOptions<Appointment[]>({ queryKey: ['/appointments', params] }),
  getById: (id: string) => queryOptions<Appointment>({ queryKey: [`/appointments/${id}`] }),
};

export const appointmentMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: ['appointments', 'create'],
      mutationFn: async (payload: CreateAppointmentDto) => {
        const response = await api.post<CreateAppointmentDto, ApiResponse<Appointment>>('/appointments', payload);

        return response.data;
      },
    }),
  updateStatus: (id: string) =>
    mutationOptions({
      mutationKey: ['appointments', 'update-status', id],
      mutationFn: async (payload: UpdateAppointmentStatusDto) => {
        const response = await api.patch<UpdateAppointmentStatusDto, ApiResponse<Appointment>>(
          `/appointments/${id}/status`,
          payload,
        );

        return response.data;
      },
    }),
  delete: (id: string) =>
    mutationOptions({
      mutationKey: ['appointments', 'delete', id],
      mutationFn: async () => {
        const response = await api.delete<ApiResponse<Record<string, never>>>(`/appointments/${id}`);

        return response.data;
      },
    }),
};
