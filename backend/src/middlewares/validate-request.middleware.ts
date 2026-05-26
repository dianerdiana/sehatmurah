import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { ApiError } from '../common/api-error';
import { formatZodError } from '../common/format-zod-error';
import { deleteUploadFile } from '../utils/delete-upload-file';

interface ValidationSchemas {
  body?: z.ZodObject;
  params?: z.ZodObject;
  query?: z.ZodObject;
}

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.sanitizedParams = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.sanitizedQuery = schemas.query.parse(req.query);
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

      if (req.body.icon) deleteUploadFile(req.body.icon);
      if (req.body.image) deleteUploadFile(req.body.image);

      next(error);
    }
  };
};
