import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../common/http-response';
import * as appointmentService from './appointment.service';
import { ApiError } from '../../common/api-error';

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { doctor, appointmentDate, startTime, endTime, reason } = req.body;

    const data = await appointmentService.createAppointment(req.user, {
      doctor,
      appointmentDate,
      startTime,
      endTime,
      reason,
    });

    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const listAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const data = await appointmentService.listAppointments(req.user);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const data = await appointmentService.getAppointmentById(
      String(req.params.id),
      req.user,
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { status } = req.body;

    const data = await appointmentService.updateAppointmentStatus(
      String(req.params.id),
      status,
      req.user,
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    await appointmentService.deleteAppointment(String(req.params.id), req.user);
    res.json(
      HttpResponse.success({
        message: 'Appointment deleted',
      }),
    );
  } catch (error) {
    next(error);
  }
};
