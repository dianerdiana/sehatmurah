import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';

import {
  ListPatientsDto,
  PatientIdDto,
  UpdateMyProfileDto,
  UpdatePatientDto,
} from './patient.schema';
import * as patientService from './patient.service';

export const getMyProfile = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;

  const data = await patientService.getMyProfile(authUser.id);
  res.json(HttpResponse.success({ data }));
};

export const updateMyProfile = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const payload = req.body as UpdateMyProfileDto;

  const data = await patientService.updateMyProfile(authUser.id, payload);
  res.json(HttpResponse.success({ data }));
};

export const getPatientById = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as PatientIdDto;
  const patientId = params.id;

  const data = await patientService.getPatientById(patientId);
  res.json(HttpResponse.success({ data }));
};

export const updatePatientById = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as PatientIdDto;
  const patientId = params.id;
  const payload = req.body as UpdatePatientDto;

  const data = await patientService.updatePatientById(patientId, payload);
  res.json(HttpResponse.success({ data }));
};

export const listPatients = async (req: Request, res: Response) => {
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
};

export const deletePatient = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as PatientIdDto;
  const patientId = params.id;

  const data = await patientService.deletePatient(patientId);
  res.json(HttpResponse.success({ data, message: 'Patient deleted' }));
};
