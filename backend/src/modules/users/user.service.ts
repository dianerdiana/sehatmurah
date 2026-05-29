import { ApiError } from '../../common/api-error';
import { normalizePagination } from '../../common/pagination';
import { UserModel } from '../../models/user.model';
import { escapeRegex } from '../../utils/escape-regex';
import { hashPassword } from '../../utils/password';

import { CreateUserDto, ListUsersDto, UpdateUserDto } from './user.schema';

const USER_SELECT_FIELDS = 'name email role isActive createdAt updatedAt';

const toNormalizedEmail = (email: string) => email.trim().toLowerCase();

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId).select(USER_SELECT_FIELDS);

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
    .select(USER_SELECT_FIELDS)
    .sort({ [sortField]: sortDirection, _id: 1 })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const createUser = async (payload: CreateUserDto) => {
  const normalizedEmail = toNormalizedEmail(payload.email);

  const existingUser = await UserModel.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await UserModel.create({
    name: payload.name,
    email: normalizedEmail,
    password: hashedPassword,
    role: payload.role,
    isActive: payload.isActive,
  });

  return UserModel.findById(user._id).select(USER_SELECT_FIELDS);
};

export const updateUser = async (userId: string, payload: UpdateUserDto, actorUserId?: string) => {
  if (payload.isActive === false && actorUserId === userId) {
    throw new ApiError(400, 'You cannot deactivate your own account');
  }

  const existingUser = await UserModel.findById(userId).select('email');

  if (!existingUser) {
    throw new ApiError(404, 'User not found');
  }

  const updatePayload: Record<string, unknown> = {};

  if (typeof payload.name === 'string') {
    updatePayload.name = payload.name;
  }

  if (typeof payload.role === 'string') {
    updatePayload.role = payload.role;
  }

  if (typeof payload.isActive === 'boolean') {
    updatePayload.isActive = payload.isActive;
  }

  if (typeof payload.email === 'string') {
    const normalizedEmail = toNormalizedEmail(payload.email);

    if (normalizedEmail !== existingUser.email) {
      const duplicateUser = await UserModel.findOne({
        email: normalizedEmail,
        _id: { $ne: userId },
      }).select('_id');

      if (duplicateUser) {
        throw new ApiError(409, 'Email is already registered');
      }
    }

    updatePayload.email = normalizedEmail;
  }

  if (typeof payload.password === 'string') {
    updatePayload.password = await hashPassword(payload.password);
  }

  const user = await UserModel.findByIdAndUpdate(userId, updatePayload, {
    new: true,
    runValidators: true,
  }).select(USER_SELECT_FIELDS);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return {};
};
