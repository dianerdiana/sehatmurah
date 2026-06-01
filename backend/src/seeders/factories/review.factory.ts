import { Types } from 'mongoose';

import { ReviewStatus } from '../../common/enums/review-status.enum';

export interface IReviewSeed {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  appointment?: Types.ObjectId;
  rating: number;
  comment?: string;
  status: ReviewStatus;
}

export function generateReviews(
  patientProfileIds: Types.ObjectId[],
  doctorProfileIds: Types.ObjectId[],
  appointmentIds?: Types.ObjectId[],
): IReviewSeed[] {
  const comments = [
    'Excellent doctor, very professional and caring',
    'Great consultation, very helpful advice',
    'Professional service, clean facility',
    'Doctor listened carefully to my concerns',
    'Highly recommend this doctor',
    'Very satisfied with the treatment',
    'Good explanation about my condition',
    'Would definitely visit again',
    'Friendly and patient doctor',
    'Efficient appointment process',
  ];

  const reviews: IReviewSeed[] = [];
  const statuses = [ReviewStatus.PENDING, ReviewStatus.APPROVED, ReviewStatus.REJECTED];

  // Generate 8 reviews
  for (let i = 0; i < 8; i++) {
    reviews.push({
      patient: patientProfileIds[i % patientProfileIds.length],
      doctor: doctorProfileIds[i % doctorProfileIds.length],
      appointment: appointmentIds ? appointmentIds[i % appointmentIds.length] : undefined,
      rating: Math.floor(Math.random() * 2) + 4, // Rating 4-5
      comment: comments[i % comments.length],
      status: statuses[i % statuses.length],
    });
  }

  return reviews;
}
