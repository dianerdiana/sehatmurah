import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { ApiError } from '../../common/api-error';
import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { toUploadUrl } from '../../middlewares/upload.middleware';

import { CreateSpecialistDto, ListSpecialistsDto, UpdateSpecialistDto } from './specialist.schema';
import * as specialistService from './specialist.service';

export const listSpecialists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.sanitizedQuery as ListSpecialistsDto;
    const result = await specialistService.listSpecialists(payload);

    res.json(
      HttpResponse.success({
        data: result.items,
        meta: buildResponseMeta({
          ...payload,
          totalItems: result.totalItems,
        }),
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const getSpecialistById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const specialistId = String(req.params.id);

    const data = await specialistService.getSpecialistById(specialistId);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const createSpecialist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as CreateSpecialistDto;

    const data = await specialistService.createSpecialist(payload);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateSpecialist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const specialistId = String(req.params.id);
    const payload = req.body as UpdateSpecialistDto;

    const data = await specialistService.updateSpecialist(specialistId, payload);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const specialistId = String(req.params.id);

    const data = await specialistService.deleteSpecialist(specialistId);
    res.json(HttpResponse.success({ data, message: 'Specialist deleted' }));
  } catch (error) {
    next(error);
  }
};

export const uploadSpecialistAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;

    if (!file) {
      throw new ApiError(400, 'file is required');
    }

    res.status(201).json(
      HttpResponse.success({
        data: {
          url: `${req.protocol}://${req.get('host')}${toUploadUrl(file.filename)}`,
          filename: file.filename,
        },
      }),
    );
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        next(new ApiError(400, 'File too large'));
        return;
      }
    }

    next(error);
  }
};
