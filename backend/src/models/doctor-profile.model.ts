import { Document, Schema, Types, model } from 'mongoose';

export interface IPracticeLocation {
  clinicName: string;
  address: string;
  city: string;
}

export interface IDoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface IDoctorProfile extends Document {
  user: Types.ObjectId;
  fullName: string;
  specialist: Types.ObjectId;
  profilePhoto?: string;
  experienceYears: number;
  description?: string;
  practiceLocation: IPracticeLocation;
  schedule: IDoctorSchedule[];
  consultationFee: number;
  ratingAverage: number;
  ratingCount: number;
  isAvailable: boolean;
}

const practiceLocationSchema = new Schema<IPracticeLocation>(
  {
    clinicName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const doctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    day: {
      type: String,
      required: true,
      enum: [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const doctorProfileSchema = new Schema<IDoctorProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    specialist: {
      type: Schema.Types.ObjectId,
      ref: 'Specialist',
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    practiceLocation: {
      type: practiceLocationSchema,
      required: true,
    },
    schedule: {
      type: [doctorScheduleSchema],
      default: [],
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

doctorProfileSchema.index({ specialist: 1 });
doctorProfileSchema.index({ isAvailable: 1 });
doctorProfileSchema.index({ ratingAverage: -1 });

export const DoctorProfileModel = model<IDoctorProfile>(
  'DoctorProfile',
  doctorProfileSchema,
);
