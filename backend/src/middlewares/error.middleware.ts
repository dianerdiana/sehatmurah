import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { ZodError } from 'zod';

import { ApiError } from '../common/api-error';
import { formatZodError } from '../common/format-zod-error';
import { HttpResponse } from '../common/http-response';

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json(HttpResponse.error('Route not found', undefined, 'ROUTE_NOT_FOUND'));
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.log(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json(HttpResponse.error(err.message, err.details, err.code));
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json(HttpResponse.error(err.message, formatZodError(err), 'VALIDATION_ERROR'));
    return;
  }

  if ((err as { code?: number }).code === 11000) {
    res.status(409).json(HttpResponse.error('Duplicate resource', undefined, 'DUPLICATE_RESOURCE'));
    return;
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json(HttpResponse.error('File too large', undefined, 'FILE_TOO_LARGE'));
      return;
    }

    res.status(400).json(HttpResponse.error(err.message, undefined, 'UPLOAD_ERROR'));
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json(HttpResponse.error(message, undefined, 'INTERNAL_SERVER_ERROR'));
};
