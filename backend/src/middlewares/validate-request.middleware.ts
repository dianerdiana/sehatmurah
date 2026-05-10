import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { ApiError, ApiErrorItem } from '../common/api-error';

interface ValidationSchemas {
  body?: z.ZodObject;
  params?: z.ZodObject;
  query?: z.ZodObject;
}

const formatZodError = (error: ZodError): ApiErrorItem[] => {
  return error.issues.map((issue) => ({
    field: issue.path.length ? issue.path.join('.') : undefined,
    message: issue.message,
  }));
};

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Request['params'];
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as Request['query'];
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ApiError(400, 'Validation error', {
            code: 'VALIDATION_ERROR',
            details: formatZodError(error),
          }),
        );
        return;
      }

      next(error);
    }
  };
};
