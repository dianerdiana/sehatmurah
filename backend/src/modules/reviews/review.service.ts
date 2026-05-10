import { Types } from 'mongoose';

import { ApiError } from '../../common/api-error';
import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { ReviewModel } from '../../models/review.model';

interface AuthUser {
  id: string;
  role: UserRole;
}

interface CreateReviewInput {
  doctor: string;
  appointment?: string;
  rating: number;
  comment?: string;
}

const getPatientProfileId = async (userId: string): Promise<string> => {
  const patientProfile = await PatientProfileModel.findOne({ user: userId });

  if (!patientProfile) {
    throw new ApiError(404, 'Patient profile not found');
  }

  return patientProfile._id.toString();
};

const recalculateDoctorRating = async (doctorId: string): Promise<void> => {
  const doctorObjectId = new Types.ObjectId(doctorId);

  const [stats] = await ReviewModel.aggregate<{
    count: number;
    average: number;
  }>([
    { $match: { doctor: doctorObjectId } },
    {
      $group: {
        _id: '$doctor',
        count: { $sum: 1 },
        average: { $avg: '$rating' },
      },
    },
  ]);

  await DoctorProfileModel.findByIdAndUpdate(doctorId, {
    ratingCount: stats?.count ?? 0,
    ratingAverage: Number((stats?.average ?? 0).toFixed(2)),
  });
};

export const createReview = async (
  user: AuthUser,
  payload: CreateReviewInput,
) => {
  if (user.role !== UserRole.PATIENT) {
    throw new ApiError(403, 'Only PATIENT can create review');
  }

  const doctor = await DoctorProfileModel.findById(payload.doctor);
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  const patientId = await getPatientProfileId(user.id);

  if (payload.appointment) {
    const appointment = await AppointmentModel.findById(payload.appointment);

    if (!appointment) {
      throw new ApiError(404, 'Appointment not found');
    }

    if (appointment.patient.toString() !== patientId) {
      throw new ApiError(403, 'Forbidden');
    }

    if (appointment.doctor.toString() !== payload.doctor) {
      throw new ApiError(400, 'Appointment doctor does not match');
    }

    if (appointment.status !== AppointmentStatus.COMPLETED) {
      throw new ApiError(
        400,
        'Review is only allowed for completed appointment',
      );
    }
  }

  const review = await ReviewModel.create({
    patient: patientId,
    doctor: payload.doctor,
    appointment: payload.appointment,
    rating: payload.rating,
    comment: payload.comment,
  });

  await recalculateDoctorRating(payload.doctor);

  return review;
};

export const listReviewsByDoctor = async (doctorId: string) => {
  const doctor = await DoctorProfileModel.findById(doctorId);
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  return ReviewModel.find({ doctor: doctorId })
    .populate('patient', 'fullName')
    .sort({ createdAt: -1 });
};

export const deleteReview = async (reviewId: string) => {
  const review = await ReviewModel.findByIdAndDelete(reviewId);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await recalculateDoctorRating(review.doctor.toString());

  return review;
};
