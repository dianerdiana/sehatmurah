import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { api } from '@/configs/api-config';
import type { ApiResponse } from '@/types/api-response.type';
import type { Gender } from '@/types/enums/gender.enum';
import type { PatientProfile } from '@/types/patient.type';

export type UpdateMyProfileDto = {
  fullName?: string;
  dateOfBirth?: string;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
};

export const patientQueries = {
  getMyProfile: () => queryOptions<PatientProfile>({ queryKey: ['/patients/me'] }),
  getById: (id: string) => queryOptions<PatientProfile>({ queryKey: [`/patients/${id}`] }),
};

export const patientMutationOptions = {
  updateMyProfile: () =>
    mutationOptions({
      mutationKey: ['patients', 'me', 'update'],
      mutationFn: async (payload: UpdateMyProfileDto) => {
        const response = await api.patch<UpdateMyProfileDto, ApiResponse<PatientProfile>>('/patients/me', payload);

        return response.data;
      },
    }),
};
