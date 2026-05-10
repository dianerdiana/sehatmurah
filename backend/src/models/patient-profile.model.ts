import { Document, model,Schema, Types } from 'mongoose';

import { Gender } from '../common/enums/gender.enum';

export interface IPatientProfile extends Document {
  user: Types.ObjectId;
  fullName: string;
  dateOfBirth?: Date;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
}

const patientProfileSchema = new Schema<IPatientProfile>(
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
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

patientProfileSchema.index({ phoneNumber: 1 });

export const PatientProfileModel = model<IPatientProfile>(
  'PatientProfile',
  patientProfileSchema,
);
