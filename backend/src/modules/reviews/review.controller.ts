import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../common/api-error';
import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';

import * as reviewService from './review.service';
import { ListReviewsByDoctorQuery } from './review.schema';

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
    const query = req.query as unknown as ListReviewsByDoctorQuery;
    const result = await reviewService.listReviewsByDoctor(
      String(req.params.doctorId),
      query,
    );

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
