import { ZodError } from 'zod';

import { ApiErrorItem } from './api-error';

export const formatZodError = (error: ZodError): ApiErrorItem[] => {
  return error.issues.map((issue) => ({
    field: issue.path.length ? issue.path.join('.') : undefined,
    message: issue.message,
  }));
};
