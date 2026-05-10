import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../common/api-error';
import { HttpResponse } from '../common/http-response';

export const notFoundHandler = (_req: Request, res: Response): void => {
  res
    .status(404)
    .json(HttpResponse.error('Route not found', undefined, 'ROUTE_NOT_FOUND'));
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .json(HttpResponse.error(err.message, err.details, err.code));
    return;
  }

  if ((err as { code?: number }).code === 11000) {
    res
      .status(409)
      .json(
        HttpResponse.error(
          'Duplicate resource',
          undefined,
          'DUPLICATE_RESOURCE',
        ),
      );
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  res
    .status(500)
    .json(HttpResponse.error(message, undefined, 'INTERNAL_SERVER_ERROR'));
};
