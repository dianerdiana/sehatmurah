import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { ApiError } from '../common/api-error';
import { formatZodError } from '../common/format-zod-error';
import { cleanupUploadedFilesFromRequest } from '../utils/uploaded-file-request';

interface ValidationSchemas {
  body?: z.ZodObject;
  params?: z.ZodObject;
  query?: z.ZodObject;
}

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const cleanupUploadedFields = () => {
      void cleanupUploadedFilesFromRequest(req, ['icon', 'image', 'profilePhoto']);
    };

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
        cleanupUploadedFields();

        next(
          new ApiError(400, 'Validation error', {
            code: 'VALIDATION_ERROR',
            details: formatZodError(error),
          }),
        );
        return;
      }

      cleanupUploadedFields();

      next(error);
    }
  };
};
