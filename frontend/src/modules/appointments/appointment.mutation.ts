import { mutationOptions } from '@tanstack/react-query';

import { appointmentApi } from './appointment.api';
import { appointmentKeys } from './appointment.key';
import type { CreateAppointmentDto, UpdateAppointmentStatusDto } from './appointment.schema';

export const appointmentMutationOptions = {
  create: () =>
    mutationOptions({
      mutationKey: appointmentKeys.create(),
      mutationFn: (payload: CreateAppointmentDto) => appointmentApi.create(payload),
    }),

  updateStatus: (id: string) =>
    mutationOptions({
      mutationKey: appointmentKeys.updateStatus(id),
      mutationFn: (payload: UpdateAppointmentStatusDto) => appointmentApi.updateStatus(id, payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: appointmentKeys.delete(id),
      mutationFn: () => appointmentApi.delete(id),
    }),
};
