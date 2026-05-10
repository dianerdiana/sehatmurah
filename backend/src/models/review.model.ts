import { Document, model,Schema, Types } from 'mongoose';

export interface IReview extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  appointment?: Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema<IReview>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'PatientProfile',
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'DoctorProfile',
      required: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ doctor: 1 });
reviewSchema.index(
  { patient: 1, doctor: 1, appointment: 1 },
  { unique: true, sparse: true },
);

export const ReviewModel = model<IReview>('Review', reviewSchema);
