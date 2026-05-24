import { queryOptions } from '@tanstack/react-query';

import { patientApi } from './patient.api';
import { patientKeys } from './patient.key';

export const patientQueryOptions = {
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
