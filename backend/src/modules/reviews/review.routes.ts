import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as reviewController from './review.controller';
import { createReviewBodySchema, reviewIdParamSchema } from './review.schema';

export const reviewRouter = Router();

reviewRouter.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.PATIENT),
  validateRequest({ body: createReviewBodySchema }),
  reviewController.createReview,
);

reviewRouter.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: reviewIdParamSchema }),
  reviewController.deleteReview,
);
