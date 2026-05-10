import { ApiError } from '../../common/api-error';
import { SpecialistModel } from '../../models/specialist.model';

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const listSpecialists = async (isActive?: string) => {
  const filter: Record<string, unknown> = {};

  if (typeof isActive === 'string') {
    filter.isActive = isActive === 'true';
  }

  return SpecialistModel.find(filter).sort({ sortOrder: 1, name: 1 });
};

export const getSpecialistById = async (specialistId: string) => {
  const specialist = await SpecialistModel.findById(specialistId);
  if (!specialist) {
    throw new ApiError(404, 'Specialist not found');
  }

  return specialist;
};

export const createSpecialist = async (payload: Record<string, unknown>) => {
  const name = String(payload.name ?? '').trim();
  if (!name) {
    throw new ApiError(400, 'name is required');
  }

  const slug = String(payload.slug ?? toSlug(name));
  return SpecialistModel.create({ ...payload, slug });
};

export const updateSpecialist = async (
  specialistId: string,
  payload: Record<string, unknown>,
) => {
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
