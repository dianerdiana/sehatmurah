import { ApiError } from '../../common/api-error';
import { normalizePagination } from '../../common/pagination';
import { SpecialistModel } from '../../models/specialist.model';
import { deleteUploadFile } from '../../utils/delete-upload-file';
import { escapeRegex } from '../../utils/escape-regex';

import { CreateSpecialistDto, ListSpecialistsDto, UpdateSpecialistDto } from './specialist.schema';

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const listSpecialists = async (query: ListSpecialistsDto) => {
  const filters: Record<string, unknown>[] = [];

  if (query.isActive !== 'all') {
    filters.push({ isActive: query.isActive === 'true' });
  }

  const category = query.category.trim();
  if (category) {
    const categoryRegex = new RegExp(escapeRegex(category), 'i');
    filters.push({
      $or: [{ name: categoryRegex }, { slug: categoryRegex }],
    });
  }

  const search = query.search.trim();
  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), 'i');
    filters.push({
      $or: [{ name: searchRegex }, { slug: searchRegex }, { description: searchRegex }],
    });
  }

  const filter =
    filters.length === 0
      ? {}
      : filters.length === 1
        ? filters[0]
        : ({ $and: filters } as Record<string, unknown>);

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await SpecialistModel.countDocuments(filter);

  const sortDirection = query.sort === 'asc' ? 1 : -1;
  const sortByColumn: Record<ListSpecialistsDto['column'], string> = {
    name: 'name',
    createdAt: 'createdAt',
    sortOrder: 'sortOrder',
  };

  const primarySortField = sortByColumn[query.column];
  const sortOption: Record<string, 1 | -1> = {
    [primarySortField]: sortDirection,
    name: 1,
  };

  if (primarySortField !== 'sortOrder') {
    sortOption.sortOrder = 1;
  }

  const items = await SpecialistModel.find(filter)
    .populate('countDoctors')
    .sort(sortOption)
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

  const previousImage = specialist.image;
  const previousIcon = specialist.icon;

  Object.assign(specialist, payload);

  if (payload.name && !payload.slug) {
    specialist.slug = toSlug(String(payload.name));
  }

  await specialist.save();

  const removableFiles: string[] = [];

  if (payload.image && previousImage && payload.image !== previousImage) {
    removableFiles.push(previousImage);
  }

  if (payload.icon && previousIcon && payload.icon !== previousIcon) {
    removableFiles.push(previousIcon);
  }

  await Promise.all(
    removableFiles.map(async (filePath) => {
      try {
        await deleteUploadFile(filePath);
      } catch {
        // Ignore old-file cleanup failure so update response is not blocked.
      }
    }),
  );

  return specialist;
};

export const deleteSpecialist = async (specialistId: string) => {
  const specialist = await SpecialistModel.findByIdAndDelete(specialistId);

  if (!specialist) {
    throw new ApiError(404, 'Specialist not found');
  }

  return specialist;
};
