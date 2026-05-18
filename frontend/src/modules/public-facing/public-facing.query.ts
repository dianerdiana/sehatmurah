import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from '@/types/api-response.type';
import type { Doctor } from '@/types/doctor.type';
import type { Specialist } from '@/types/specialist.type';

export const useGetDoctors = ({
  params,
  enabled = true,
}: {
  params?: { city?: string; specialist?: string };
  enabled?: boolean;
}) => {
  return useQuery<Doctor[], ErrorResponse>({
    queryKey: ['/doctors', params],
    enabled,
  });
};

export const useGetDoctorsCity = ({ params }: { params?: { search?: string } }) => {
  return useQuery<string[], ErrorResponse>({
    queryKey: ['/doctors/cities', params],
    placeholderData: [],
  });
};

export const useGetSpecialists = ({
  params,
}: {
  params?: {
    limit?: number;
    page?: number;
  };
}) => {
  return useQuery<Specialist[], ErrorResponse>({
    queryKey: ['/specialists', params],
    placeholderData: [],
  });
};
