import { mutationOptions } from '@tanstack/react-query';

import { patientApi } from './patient.api';
import { patientKeys } from './patient.key';
import type { UpdateMyProfileDto, UpdatePatientDto } from './patient.schema';

export const patientMutationOptions = {
  update: (id: string) =>
    mutationOptions({
      mutationKey: patientKeys.update(id),
      mutationFn: (payload: UpdatePatientDto) => patientApi.update(id, payload),
    }),

  updateMyProfile: () =>
    mutationOptions({
      mutationKey: patientKeys.updateMyProfile(),
      mutationFn: (payload: UpdateMyProfileDto) => patientApi.updateMyProfile(payload),
    }),

  delete: (id: string) =>
    mutationOptions({
      mutationKey: patientKeys.delete(id),
      mutationFn: () => patientApi.delete(id),
    }),
};
