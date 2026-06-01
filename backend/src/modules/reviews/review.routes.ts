import { Router } from 'express';

import { UserRole } from '../../common/enums/user-role.enum';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validate-request.middleware';

import * as reviewController from './review.controller';
import {
  createReviewSchema,
  listReviewsSchema,
  reviewIdSchema,
  updateReviewSchema,
} from './review.schema';

export const reviewRouter = Router();

reviewRouter.use(authMiddleware);

reviewRouter.post(
  '/',
  roleMiddleware(UserRole.PATIENT),
  validateRequest({ body: createReviewSchema }),
  reviewController.createReview,
);

reviewRouter.get(
  '/',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ query: listReviewsSchema }),
  reviewController.listReviews,
);

reviewRouter.get(
  '/:id',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: reviewIdSchema }),
  reviewController.getReviewById,
);

reviewRouter.put(
  '/:id',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: reviewIdSchema, body: updateReviewSchema }),
  reviewController.updateReview,
);

reviewRouter.delete(
  '/:id',
  roleMiddleware(UserRole.ADMIN),
  validateRequest({ params: reviewIdSchema }),
  reviewController.deleteReview,
);
