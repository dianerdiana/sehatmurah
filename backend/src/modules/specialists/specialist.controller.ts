import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';

import * as specialistService from './specialist.service';
import { ListSpecialistsQuery } from './specialist.schema';

export const listSpecialists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query as unknown as ListSpecialistsQuery;
    const result = await specialistService.listSpecialists(query);

    res.json(
      HttpResponse.success({
        data: result.items,
        meta: buildResponseMeta({
          ...query,
          totalItems: result.totalItems,
        }),
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const getSpecialistById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.getSpecialistById(
      String(req.params.id),
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const createSpecialist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.createSpecialist(req.body);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateSpecialist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.updateSpecialist(
      String(req.params.id),
      req.body,
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.deleteSpecialist(
      String(req.params.id),
    );
    res.json(HttpResponse.success({ data, message: 'Specialist deleted' }));
  } catch (error) {
    next(error);
  }
};
