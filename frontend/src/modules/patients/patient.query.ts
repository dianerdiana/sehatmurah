import { queryOptions } from '@tanstack/react-query';

import { patientApi } from './patient.api';
import { patientKeys } from './patient.key';
import type { ListPatientsDto } from './patient.schema';

export const patientQueryOptions = {
  list: (params?: ListPatientsDto) =>
    queryOptions({
      queryKey: patientKeys.list(params),
      queryFn: () => patientApi.list(params),
    }),

  getMyProfile: () =>
    queryOptions({
      queryKey: patientKeys.me(),
      queryFn: () => patientApi.getMyProfile(),
    }),

  getById: (id: string) =>
    queryOptions({
      queryKey: patientKeys.detail(id),
      queryFn: () => patientApi.getById(id),
      enabled: !!id,
    }),
};
