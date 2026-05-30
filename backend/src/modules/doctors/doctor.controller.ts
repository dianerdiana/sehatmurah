import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';
import { deleteUploadFile } from '../../utils/delete-upload-file';
import {
  cleanupUploadedFilesFromRequest,
  getFirstUploadedFileByField,
} from '../../utils/uploaded-file-request';

import {
  CreateDoctorDto,
  ListDoctorsCitiesDto,
  ListDoctorsDto,
  UpdateDoctorDto,
  UpdateDoctorScheduleDto,
} from './doctor.schema';
import * as doctorService from './doctor.service';

export const listDoctors = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const listDoctorsCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

export const getMyDoctorProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;

    const data = await doctorService.getMyDoctorProfile(authUser.id);
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
  const uploadedProfilePhoto = getFirstUploadedFileByField(req, 'profilePhoto');

  try {
    const payload = req.body as CreateDoctorDto;

    const data = await doctorService.createDoctor(payload);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    if (uploadedProfilePhoto) {
      await cleanupUploadedFilesFromRequest(req, ['profilePhoto']);
    }

    next(error);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: NextFunction) => {
  const uploadedProfilePhoto = getFirstUploadedFileByField(req, 'profilePhoto');
  let isUpdated = false;

  try {
    const doctorId = String(req.params.id);
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
