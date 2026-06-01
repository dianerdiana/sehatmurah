import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';
import { deleteUploadFile } from '../../utils/delete-upload-file';
import {
  cleanupUploadedFilesFromRequest,
  getFirstUploadedFileByField,
} from '../../utils/uploaded-file-request';

import {
  ApproveDoctorDto,
  CreateDoctorDto,
  DoctorIdDto,
  ListPendingDoctorsDto,
  ListDoctorsCitiesDto,
  ListDoctorsDto,
  RejectDoctorDto,
  UpdateDoctorDto,
  UpdateDoctorScheduleDto,
} from './doctor.schema';
import * as doctorService from './doctor.service';

export const listDoctors = async (req: Request, res: Response) => {
  const query = req.sanitizedQuery as ListDoctorsDto;
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
};

export const listDoctorsCities = async (req: Request, res: Response) => {
  const query = req.sanitizedQuery as ListDoctorsCitiesDto;
  const result = await doctorService.listDoctorsCities(query);

  res.json(
    HttpResponse.success({
      data: result.items,
      meta: buildResponseMeta({
        ...query,
        totalItems: result.totalItems,
      }),
    }),
  );
};

export const listPendingDoctors = async (req: Request, res: Response) => {
  const query = req.sanitizedQuery as ListPendingDoctorsDto;
  const result = await doctorService.listPendingDoctors(query);

  res.json(
    HttpResponse.success({
      data: result.items,
      meta: buildResponseMeta({
        ...query,
        totalItems: result.totalItems,
      }),
    }),
  );
};

export const getDoctorById = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as DoctorIdDto;
  const doctorId = params.id;

  const data = await doctorService.getDoctorById(doctorId);
  res.json(HttpResponse.success({ data }));
};

export const getMyDoctorProfile = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;

  const data = await doctorService.getMyDoctorProfile(authUser.id);
  res.json(HttpResponse.success({ data }));
};

export const createDoctor = async (req: Request, res: Response) => {
  const uploadedProfilePhoto = getFirstUploadedFileByField(req, 'profilePhoto');

  try {
    const payload = req.body as CreateDoctorDto;

    const data = await doctorService.createDoctor(payload);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    if (uploadedProfilePhoto) {
      await cleanupUploadedFilesFromRequest(req, ['profilePhoto']);
    }

    throw error;
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  const uploadedProfilePhoto = getFirstUploadedFileByField(req, 'profilePhoto');
  let isUpdated = false;

  try {
    const params = req.sanitizedParams as DoctorIdDto;
    const doctorId = params.id;
    const payload = req.body as UpdateDoctorDto;
    const authUser = req.user as AuthUser;
    const existingDoctor = uploadedProfilePhoto
      ? await doctorService.getDoctorById(doctorId)
      : null;

    const data = await doctorService.updateDoctor(doctorId, payload, authUser);
    isUpdated = true;

    if (
      uploadedProfilePhoto &&
      existingDoctor?.profilePhoto &&
      existingDoctor.profilePhoto !== data.profilePhoto
    ) {
      try {
        await deleteUploadFile(existingDoctor.profilePhoto);
      } catch {
        // Ignore cleanup failure for old file so update response is not blocked.
      }
    }

    res.json(HttpResponse.success({ data }));
  } catch (error) {
    if (!isUpdated) {
      await cleanupUploadedFilesFromRequest(req, ['profilePhoto']);
    }

    throw error;
  }
};

export const updateDoctorSchedule = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as DoctorIdDto;
  const doctorId = params.id;
  const payload = req.body as UpdateDoctorScheduleDto;
  const schedule = payload.schedule;
  const authUser = req.user as AuthUser;

  const data = await doctorService.updateDoctorSchedule(doctorId, schedule, authUser);
  res.json(HttpResponse.success({ data }));
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as DoctorIdDto;
  const doctorId = params.id;

  const data = await doctorService.deleteDoctor(doctorId);
  res.json(HttpResponse.success({ data, message: 'Doctor deleted' }));
};

export const approveDoctor = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as DoctorIdDto;
  const doctorId = params.id;
  const payload = req.body as ApproveDoctorDto;
  const authUser = req.user as AuthUser;

  const data = await doctorService.approveDoctor(doctorId, payload, authUser);
  res.json(HttpResponse.success({ data, message: 'Doctor approved' }));
};

export const rejectDoctor = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as DoctorIdDto;
  const doctorId = params.id;
  const payload = req.body as RejectDoctorDto;
  const authUser = req.user as AuthUser;

  const data = await doctorService.rejectDoctor(doctorId, payload, authUser);
  res.json(HttpResponse.success({ data, message: 'Doctor rejected' }));
};
