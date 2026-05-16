export type ApiErrorItem = {
  field?: string;
  message: string;
};

export type ResponseMeta = {
  page?: number;
  limit?: number;
  search?: string;
  column?: string;
  sort?: 'asc' | 'desc';
  totalItems?: number;
  totalPages?: number;
};

export type SuccessResponse<T> = {
  status: 'success';
  message: string;
  data: T;
  meta?: ResponseMeta;
};

export type ErrorResponse = {
  status: 'failed' | 'error';
  message: string;
  code?: string;
  details?: ApiErrorItem[];
};

export type HttpResponse<T> = SuccessResponse<T> | ErrorResponse;
