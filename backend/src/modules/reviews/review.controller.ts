import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../common/api-error';
import { HttpResponse } from '../../common/http-response';

import * as reviewService from './review.service';

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const data = await reviewService.createReview(req.user, req.body);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const listReviewsByDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await reviewService.listReviewsByDoctor(
      String(req.params.doctorId),
    );
    res.json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await reviewService.deleteReview(String(req.params.id));
    res.json(HttpResponse.success({ data, message: 'Review deleted' }));
  } catch (error) {
    next(error);
  }
};
