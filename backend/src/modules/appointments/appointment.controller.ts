import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';

import {
  AppointmentIdDto,
  CreateAppointmentDto,
  ListAppointmentsDto,
  UpdateAppointmentStatusDto,
} from './appointment.schema';
import * as appointmentService from './appointment.service';

export const createAppointment = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const payload = req.body as CreateAppointmentDto;

  const data = await appointmentService.createAppointment(authUser, payload);

  res.status(201).json(HttpResponse.success({ data }));
};

export const listAppointments = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const payload = req.sanitizedQuery as ListAppointmentsDto;
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
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const params = req.sanitizedParams as AppointmentIdDto;
  const appointmentId = params.id;

  const data = await appointmentService.getAppointmentById(appointmentId, authUser);

  res.json(HttpResponse.success({ data }));
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const { status } = req.body as UpdateAppointmentStatusDto;
  const params = req.sanitizedParams as AppointmentIdDto;
  const appointmentId = params.id;

  const data = await appointmentService.updateAppointmentStatus(appointmentId, status, authUser);
  res.json(HttpResponse.success({ data }));
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const params = req.sanitizedParams as AppointmentIdDto;
  const appointmentId = params.id;

  await appointmentService.deleteAppointment(appointmentId, authUser);
  res.json(
    HttpResponse.success({
      message: 'Appointment deleted',
    }),
  );
};
