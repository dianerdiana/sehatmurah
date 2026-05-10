import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../common/api-error';
import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';

import * as appointmentService from './appointment.service';
import {
  CreateAppointmentSchema,
  ListAppointmentsSchema,
  UpdateAppointmentStatusSchema,
} from './appointment.schema';
import { AuthUser } from '../../types/auth-user.type';

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const payload = req.body as CreateAppointmentSchema;

    const data = await appointmentService.createAppointment(authUser, payload);

    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const listAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const payload = req.query as unknown as ListAppointmentsSchema;
    const result = await appointmentService.listAppointments(authUser, payload);

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

export const getAppointmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const appointmentId = String(req.params.id);

    const data = await appointmentService.getAppointmentById(appointmentId, authUser);

    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const { status } = req.body as UpdateAppointmentStatusSchema;
    const appointmentId = String(req.params.id);

    const data = await appointmentService.updateAppointmentStatus(appointmentId, status, authUser);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const appointmentId = String(req.params.id);

    await appointmentService.deleteAppointment(appointmentId, authUser);
    res.json(
      HttpResponse.success({
        message: 'Appointment deleted',
      }),
    );
  } catch (error) {
    next(error);
  }
};
