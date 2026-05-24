import { queryOptions } from '@tanstack/react-query';

import { appointmentApi } from './appointment.api';
import { appointmentKeys } from './appointment.key';
import type { ListAppointmentsDto } from './appointment.schema';

export const appointmentQueryOptions = {
  list: (params?: ListAppointmentsDto) =>
    queryOptions({
      queryKey: appointmentKeys.list(params),
      queryFn: () => appointmentApi.list(params),
    }),

  getById: (id: string) =>
    queryOptions({
      queryKey: appointmentKeys.detail(id),
      queryFn: () => appointmentApi.getById(id),
      enabled: !!id,
    }),
};
