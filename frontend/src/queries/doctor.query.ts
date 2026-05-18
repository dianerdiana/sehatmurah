import { queryOptions } from '@tanstack/react-query';

import type { Doctor } from '@/types/doctor.type';

export const doctorQueries = {
  list: (params: { specialist?: string; city?: string }) => queryOptions<Doctor[]>({ queryKey: ['/doctors', params] }),
  cities: () => queryOptions<string[]>({ queryKey: ['/doctors/cities'] }),
  getById: (id: string) => queryOptions<Doctor>({ queryKey: [`/doctors/${id}`] }),
};
