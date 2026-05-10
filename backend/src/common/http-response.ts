import { ApiErrorItem } from './api-error';

export type ResponseMeta = {
  page?: number;
  limit?: number;
  search?: string;
  column?: string;
  sort?: 'asc' | 'desc';
  totalItems?: number;
  totalPages?: number;
};

export class HttpResponse<TData = unknown> {
  status: 'success' | 'failed' | 'error';
  message: string;
  data?: TData;
  meta?: ResponseMeta;
  code?: string;
  details?: ApiErrorItem[];

  constructor(
    args: {
      status?: 'success' | 'failed' | 'error';
      message?: string;
      data?: TData;
      meta?: ResponseMeta;
      code?: string;
      details?: ApiErrorItem[];
    } = {},
  ) {
    const {
      status = 'success',
      message = 'ok',
      data,
      meta,
      code,
      details,
    } = args;

    this.status = status;
    this.message = message;

    if (data !== undefined) this.data = data;
    if (meta !== undefined) this.meta = meta;
    if (code !== undefined) this.code = code;
    if (details?.length) this.details = details;
  }

  static success<TData>(
    args: {
      data?: TData;
      message?: string;
      meta?: ResponseMeta;
    } = {},
  ) {
    return new HttpResponse<TData>({
      status: 'success',
      message: args.message ?? 'ok',
      data: args.data,
      meta: args.meta,
    });
  }

  static error(message: string, details?: ApiErrorItem[], code?: string) {
    return new HttpResponse<never>({
      status: 'error',
      message,
      code,
      details,
    });
  }
}
