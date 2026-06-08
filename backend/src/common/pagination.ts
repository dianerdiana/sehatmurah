import { ResponseMeta } from './http-response';

export type PaginationQuery = {
  page?: number;
  limit?: number;
  search?: string;
  column?: string;
  sort?: 'asc' | 'desc';
};

export type PaginationWindow = {
  page: number;
  limit: number;
  skip: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const clampPositiveInteger = (value: number, fallback: number): number => {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.trunc(value));
};

export const normalizePagination = (query: PaginationQuery = {}): PaginationWindow => {
  const page = clampPositiveInteger(query.page ?? DEFAULT_PAGE, DEFAULT_PAGE);
  const limit = Math.min(
    MAX_LIMIT,
    clampPositiveInteger(query.limit ?? DEFAULT_LIMIT, DEFAULT_LIMIT),
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

export const buildResponseMeta = (
  query: PaginationQuery & { totalItems: number },
): ResponseMeta => {
  const { page, limit } = normalizePagination(query);
  const totalPages = query.totalItems === 0 ? 0 : Math.ceil(query.totalItems / limit);

  return {
    page,
    limit,
    search: query.search,
    column: query.column,
    sort: query.sort,
    totalItems: query.totalItems,
    totalPages,
  };
};
