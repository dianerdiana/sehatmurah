import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import {
  cleanupUploadedFilesFromRequest,
  getFirstUploadedFileByField,
} from '../../utils/uploaded-file-request';

import {
  CreateSpecialistDto,
  ListSpecialistsDto,
  SpecialistIdDto,
  UpdateSpecialistDto,
} from './specialist.schema';
import * as specialistService from './specialist.service';

export const listSpecialists = async (req: Request, res: Response) => {
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
};

export const getSpecialistById = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as SpecialistIdDto;
  const specialistId = params.id;

  const data = await specialistService.getSpecialistById(specialistId);
  res.json(HttpResponse.success({ data }));
};

export const createSpecialist = async (req: Request, res: Response) => {
  const uploadedImage = getFirstUploadedFileByField(req, 'image');
  const uploadedIcon = getFirstUploadedFileByField(req, 'icon');

  try {
    const payload = req.body as CreateSpecialistDto;

    const data = await specialistService.createSpecialist(payload);

    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    if (uploadedImage || uploadedIcon) {
      await cleanupUploadedFilesFromRequest(req, ['image', 'icon']);
    }

    throw error;
  }
};

export const updateSpecialist = async (req: Request, res: Response) => {
  const uploadedImage = getFirstUploadedFileByField(req, 'image');
  const uploadedIcon = getFirstUploadedFileByField(req, 'icon');

  try {
    const params = req.sanitizedParams as SpecialistIdDto;
    const specialistId = params.id;
    const payload = req.body as UpdateSpecialistDto;

    const data = await specialistService.updateSpecialist(specialistId, payload);

    res.json(HttpResponse.success({ data }));
  } catch (error) {
    if (uploadedImage || uploadedIcon) {
      await cleanupUploadedFilesFromRequest(req, ['image', 'icon']);
    }

    throw error;
  }
};

export const deleteSpecialist = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as SpecialistIdDto;
  const specialistId = params.id;

  const data = await specialistService.deleteSpecialist(specialistId);
  res.json(HttpResponse.success({ data, message: 'Specialist deleted' }));
};
