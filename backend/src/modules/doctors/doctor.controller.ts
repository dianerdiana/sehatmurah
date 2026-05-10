import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../common/http-response';
import { ApiError } from '../../middlewares/error.middleware';
import * as doctorService from './doctor.service';

export const listDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await doctorService.listDoctors({
      specialist: req.query.specialist as string | undefined,
      city: req.query.city as string | undefined,
      search: req.query.search as string | undefined,
    });

    res.json(HttpResponse.success({ data }));
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
