import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';

import {
  CreateDoctorDto,
  ListDoctorsDto,
  UpdateDoctorDto,
  UpdateDoctorScheduleDto,
} from './doctor.schema';
import * as doctorService from './doctor.service';

export const listDoctors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query as unknown as ListDoctorsDto;
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

export const getDoctorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorId = String(req.params.id);

    const data = await doctorService.getDoctorById(doctorId);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as CreateDoctorDto;

    const data = await doctorService.createDoctor(payload);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorId = String(req.params.id);
    const payload = req.body as UpdateDoctorDto;
    const authUser = req.user as AuthUser;

    const data = await doctorService.updateDoctor(doctorId, payload, authUser);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateDoctorSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorId = String(req.params.id);
    const payload = req.body as UpdateDoctorScheduleDto;
    const schedule = payload.schedule;
    const authUser = req.user as AuthUser;

    const data = await doctorService.updateDoctorSchedule(doctorId, schedule, authUser);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorId = String(req.params.id);

    const data = await doctorService.deleteDoctor(doctorId);
    res.json(HttpResponse.success({ data, message: 'Doctor deleted' }));
  } catch (error) {
    next(error);
  }
};
