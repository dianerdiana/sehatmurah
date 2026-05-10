import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiError } from '../../middlewares/error.middleware';
import * as patientService from './patient.service';

export const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    if (req.user.role !== UserRole.PATIENT) {
      throw new ApiError(403, 'Only PATIENT can access this endpoint');
    }

    const data = await patientService.getMyProfile(req.user.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    if (req.user.role !== UserRole.PATIENT) {
      throw new ApiError(403, 'Only PATIENT can access this endpoint');
    }

    const data = await patientService.updateMyProfile(req.user.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await patientService.getPatientById(String(req.params.id));
    res.json(data);
  } catch (error) {
    next(error);
  }
};
