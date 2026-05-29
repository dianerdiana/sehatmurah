import { ApiError } from '../../common/api-error';
import { normalizePagination } from '../../common/pagination';
import { UserModel } from '../../models/user.model';
import { escapeRegex } from '../../utils/escape-regex';

import { ListUsersDto } from './user.schema';

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId).select(
    'name email role isActive createdAt updatedAt',
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const listUsers = async (query: ListUsersDto) => {
  const filters: Record<string, unknown>[] = [];

  if (query.role !== 'all') {
    filters.push({ role: query.role });
  }

  if (query.isActive !== 'all') {
    filters.push({ isActive: query.isActive === 'true' });
  }

  const search = query.search.trim();

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), 'i');
    filters.push({
      $or: [{ name: searchRegex }, { email: searchRegex }],
    });
  }

  const filter =
    filters.length === 0
      ? {}
      : filters.length === 1
        ? filters[0]
        : ({ $and: filters } as Record<string, unknown>);

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await UserModel.countDocuments(filter);

  const sortField = query.column === 'name' ? 'name' : 'createdAt';
  const sortDirection = query.sort === 'asc' ? 1 : -1;

  const items = await UserModel.find(filter)
    .select('name email role isActive createdAt updatedAt')
    .sort({ [sortField]: sortDirection, _id: 1 })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const deleteUser = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return {};
};
