import { mutationOptions } from '@tanstack/react-query';

import { patientApi } from './patient.api';
import { patientKeys } from './patient.key';
import type { UpdateMyProfileDto } from './patient.schema';

export const patientMutationOptions = {
  updateMyProfile: () =>
    mutationOptions({
      mutationKey: patientKeys.updateMyProfile(),
      mutationFn: (payload: UpdateMyProfileDto) => patientApi.updateMyProfile(payload),
    }),
};
