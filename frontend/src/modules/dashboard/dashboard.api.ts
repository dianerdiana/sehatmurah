import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { DashboardSummary } from './dashboard.type';

export const dashboardApi = {
  summary: async () => {
    try {
      const response = await api.get<ApiResponse<DashboardSummary>>('/dashboard');

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
