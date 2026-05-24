import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { CreateAppointmentDto, ListAppointmentsDto, UpdateAppointmentStatusDto } from './appointment.schema';
import type { Appointment } from './appointment.type';

export const appointmentApi = {
  list: async (params?: ListAppointmentsDto) => {
    try {
      const response = await api.get<ApiResponse<Appointment[]>>('/appointments', { params });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  create: async (payload: CreateAppointmentDto) => {
    try {
      const response = await api.post<CreateAppointmentDto, ApiResponse<Appointment>>('/appointments', payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  updateStatus: async (id: string, payload: UpdateAppointmentStatusDto) => {
    try {
      const response = await api.patch<UpdateAppointmentStatusDto, ApiResponse<Appointment>>(
        `/appointments/${id}/status`,
        payload,
      );

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<Record<string, never>>>(`/appointments/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
