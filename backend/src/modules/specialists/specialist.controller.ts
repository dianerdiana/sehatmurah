import { NextFunction, Request, Response } from 'express';
import * as specialistService from './specialist.service';

export const listSpecialists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.listSpecialists(
      req.query.isActive as string | undefined,
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getSpecialistById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.getSpecialistById(
      String(req.params.id),
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createSpecialist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.createSpecialist(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateSpecialist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.updateSpecialist(
      String(req.params.id),
      req.body,
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await specialistService.deleteSpecialist(
      String(req.params.id),
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};
