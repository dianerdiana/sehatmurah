import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../common/api-error';
import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';

import * as doctorService from './doctor.service';
import { ListDoctorsQuery } from './doctor.schema';

export const listDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query as unknown as ListDoctorsQuery;
    const result = await doctorService.listDoctors(query);

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

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await doctorService.getDoctorById(String(req.params.id));
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await doctorService.createDoctor(req.body);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const data = await doctorService.updateDoctor(
      String(req.params.id),
      req.body,
      req.user,
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateDoctorSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const schedule = req.body.schedule;
    if (!Array.isArray(schedule)) {
      throw new ApiError(400, 'schedule must be an array');
    }

    const data = await doctorService.updateDoctorSchedule(
      String(req.params.id),
      schedule,
      req.user,
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await doctorService.deleteDoctor(String(req.params.id));
    res.json(HttpResponse.success({ data, message: 'Doctor deleted' }));
  } catch (error) {
    next(error);
  }
};
