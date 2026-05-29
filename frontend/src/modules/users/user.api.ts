import { api } from '@/configs/api-config';

import { toApiError } from '@/utils/api-error.util';
import { unwrapApiResponse, unwrapPaginatedApiResponse } from '@/utils/api-response.util';

import type { ApiResponse } from '@/types/api-response.type';

import type { CreateUserDto, ListUsersDto, UpdateUserDto } from './user.schema';
import type { UserListItem } from './user.type';

export const userApi = {
  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<UserListItem>>(`/users/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  list: async (params?: ListUsersDto) => {
    try {
      const response = await api.get<ApiResponse<UserListItem[]>>('/users', { params });

      return unwrapPaginatedApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  create: async (payload: CreateUserDto) => {
    try {
      const response = await api.post<ApiResponse<UserListItem>>('/users', payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  update: async (id: string, payload: UpdateUserDto) => {
    try {
      const response = await api.put<ApiResponse<UserListItem>>(`/users/${id}`, payload);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<Record<string, never>>>(`/users/${id}`);

      return unwrapApiResponse(response.data);
    } catch (error) {
      throw toApiError(error);
    }
  },
};
