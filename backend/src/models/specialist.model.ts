import { Document, model, Schema } from 'mongoose';

export interface ISpecialist extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  countDoctors?: number;
}

const specialistSchema = new Schema<ISpecialist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

specialistSchema.index({ name: 1 });
specialistSchema.index({ isActive: 1 });
specialistSchema.index({ sortOrder: 1 });
specialistSchema.virtual('countDoctors', {
  ref: 'DoctorProfile',
  localField: '_id',
  foreignField: 'specialist',
  count: true,
});

export const SpecialistModel = model<ISpecialist>('Specialist', specialistSchema);
