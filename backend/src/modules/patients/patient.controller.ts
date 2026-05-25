import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';

import { ListPatientsDto, UpdateMyProfileDto } from './patient.schema';
import * as patientService from './patient.service';

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;

    const data = await patientService.getMyProfile(authUser.id);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const payload = req.body as UpdateMyProfileDto;

    const data = await patientService.updateMyProfile(authUser.id, payload);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = String(req.params.id);

    const data = await patientService.getPatientById(patientId);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const listPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.sanitizedQuery as ListPatientsDto;
    const result = await patientService.listPatients(payload);

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

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientId = String(req.params.id);

    const data = await patientService.deletePatient(patientId);
    res.json(HttpResponse.success({ data, message: 'Patient deleted' }));
  } catch (error) {
    next(error);
  }
};
