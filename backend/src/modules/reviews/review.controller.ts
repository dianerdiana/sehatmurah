import { Request, Response } from 'express';

import { HttpResponse } from '../../common/http-response';
import { buildResponseMeta } from '../../common/pagination';
import { AuthUser } from '../../types/auth-user.type';

import {
  CreateReviewDto,
  DoctorIdDto,
  ListReviewsByDoctorDto,
  ListReviewsDto,
  ReviewIdDto,
  UpdateReviewDto,
} from './review.schema';
import * as reviewService from './review.service';

export const createReview = async (req: Request, res: Response) => {
  const authUser = req.user as AuthUser;
  const payload = req.body as CreateReviewDto;

  const data = await reviewService.createReview(authUser, payload);
  res.status(201).json(HttpResponse.success({ data }));
};

export const listReviewsByDoctor = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as DoctorIdDto;
  const doctorId = params.doctorId;
  const payload = req.sanitizedQuery as ListReviewsByDoctorDto;
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
};

export const listReviews = async (req: Request, res: Response) => {
  const payload = req.sanitizedQuery as ListReviewsDto;
  const result = await reviewService.listReviews(payload);

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

export const getReviewById = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as ReviewIdDto;
  const reviewId = params.id;

  const data = await reviewService.getReviewById(reviewId);
  res.json(HttpResponse.success({ data }));
};

export const getReviewByAppointmentId = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as { id: string };
  const appointmentId = params.id;

  const data = await reviewService.getReviewByAppointmentId(appointmentId);
  res.json(HttpResponse.success({ data }));
};

export const updateReview = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as ReviewIdDto;
  const reviewId = params.id;
  const payload = req.body as UpdateReviewDto;

  const data = await reviewService.updateReview(reviewId, payload);
  res.json(HttpResponse.success({ data }));
};

export const deleteReview = async (req: Request, res: Response) => {
  const params = req.sanitizedParams as ReviewIdDto;
  const reviewId = params.id;

  const data = await reviewService.deleteReview(reviewId);
  res.json(HttpResponse.success({ data, message: 'Review deleted' }));
};
