import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';

import { CreateReviewDto, ListReviewsByDoctorDto } from './review.schema';
import * as reviewService from './review.service';

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as AuthUser;
    const payload = req.body as CreateReviewDto;

    const data = await reviewService.createReview(authUser, payload);
    res.status(201).json(HttpResponse.success({ data }));
  } catch (error) {
    next(error);
  }
};

export const listReviewsByDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorId = String(req.params.doctorId);
    const payload = req.query as unknown as ListReviewsByDoctorDto;
    const result = await reviewService.listReviewsByDoctor(doctorId, payload);

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

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewId = String(req.params.id);

    const data = await reviewService.deleteReview(reviewId);
    res.json(HttpResponse.success({ data, message: 'Review deleted' }));
  } catch (error) {
    next(error);
  }
};
