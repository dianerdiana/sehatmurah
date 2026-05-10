import { ApiError } from '../../common/api-error';
import { normalizePagination } from '../../common/pagination';
import { SpecialistModel } from '../../models/specialist.model';

import { CreateSpecialistDto, ListSpecialistsDto, UpdateSpecialistDto } from './specialist.schema';

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const listSpecialists = async (query: ListSpecialistsDto) => {
  const filter: Record<string, unknown> = {};

  if (typeof query.isActive === 'string') {
    filter.isActive = query.isActive === 'true';
  }

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await SpecialistModel.countDocuments(filter);

  const items = await SpecialistModel.find(filter)
    .sort({ sortOrder: 1, name: 1 })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const getSpecialistById = async (specialistId: string) => {
  const specialist = await SpecialistModel.findById(specialistId);

  if (!specialist) {
    throw new ApiError(404, 'Specialist not found');
  }

  return specialist;
};

export const createSpecialist = async (payload: CreateSpecialistDto) => {
  const name = String(payload.name ?? '').trim();

  if (!name) {
    throw new ApiError(400, 'name is required');
  }

  const slug = String(payload.slug ?? toSlug(name));
  return SpecialistModel.create({ ...payload, slug });
};

export const updateSpecialist = async (specialistId: string, payload: UpdateSpecialistDto) => {
  const specialist = await SpecialistModel.findById(specialistId);

  if (!specialist) {
    throw new ApiError(404, 'Specialist not found');
  }

  Object.assign(specialist, payload);

  if (payload.name && !payload.slug) {
    specialist.slug = toSlug(String(payload.name));
  }

  await specialist.save();
  return specialist;
};

export const deleteSpecialist = async (specialistId: string) => {
  const specialist = await SpecialistModel.findByIdAndDelete(specialistId);

  if (!specialist) {
    throw new ApiError(404, 'Specialist not found');
  }

  return specialist;
};
