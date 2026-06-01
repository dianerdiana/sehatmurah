import { PipelineStage, Types } from 'mongoose';

import { ApiError } from '../../common/api-error';
import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { normalizePagination } from '../../common/pagination';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorProfileModel } from '../../models/doctor-profile.model';
import { ReviewModel } from '../../models/review.model';
import { SpecialistModel } from '../../models/specialist.model';
import { AuthUser } from '../../types/auth-user.type';
import { escapeRegex } from '../../utils/escape-regex';
import { getPatientProfileId } from '../patients/patient.port';

import {
  CreateReviewDto,
  ListReviewsByDoctorDto,
  ListReviewsDto,
  UpdateReviewDto,
} from './review.schema';

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

export const createReview = async (user: AuthUser, payload: CreateReviewDto) => {
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
      throw new ApiError(400, 'Review is only allowed for completed appointment');
    }
  }

  const review = await ReviewModel.updateOne(
    { patient: patientId, appointment: payload.appointment, __v: { $lt: 2 } },
    {
      patient: patientId,
      doctor: payload.doctor,
      appointment: payload.appointment,
      rating: payload.rating,
      comment: payload.comment,
      status: payload.status,
    },
    { upsert: true },
  );

  await recalculateDoctorRating(payload.doctor);

  return review;
};

export const listReviewsByDoctor = async (doctorId: string, query: ListReviewsByDoctorDto) => {
  const doctor = await DoctorProfileModel.findById(doctorId);

  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }

  const { page, limit, skip } = normalizePagination(query);
  const totalItems = await ReviewModel.countDocuments({ doctor: doctorId });

  const items = await ReviewModel.find({ doctor: doctorId })
    .populate('patient', 'fullName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return { items, totalItems, page, limit };
};

export const listReviews = async (query: ListReviewsDto) => {
  const { page, limit, skip } = normalizePagination(query);

  const reviewFilter: Record<string, unknown> = {};

  if (query.rating !== 'all') {
    reviewFilter.rating = Number(query.rating);
  }

  if (query.status !== 'all') {
    reviewFilter.status = query.status;
  }

  if (query.startDate || query.endDate) {
    const createdAtFilter: Record<string, Date> = {};

    if (query.startDate) {
      const startDate = new Date(query.startDate);

      if (!Number.isNaN(startDate.getTime())) {
        startDate.setHours(0, 0, 0, 0);
        createdAtFilter.$gte = startDate;
      }
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);

      if (!Number.isNaN(endDate.getTime())) {
        endDate.setHours(23, 59, 59, 999);
        createdAtFilter.$lte = endDate;
      }
    }

    if (Object.keys(createdAtFilter).length > 0) {
      reviewFilter.createdAt = createdAtFilter;
    }
  }

  const matchStages: PipelineStage[] = [];

  if (Object.keys(reviewFilter).length > 0) {
    matchStages.push({ $match: reviewFilter });
  }

  if (query.specialist.trim()) {
    const specialistKeyword = query.specialist.trim();
    const specialistRegex = new RegExp(escapeRegex(specialistKeyword), 'i');
    const specialistMatches = await SpecialistModel.find({
      $or: [{ name: specialistRegex }, { slug: specialistRegex }],
    })
      .select('_id')
      .lean();

    const specialistIds = specialistMatches.map((specialist) => specialist._id);

    if (specialistIds.length === 0) {
      return { items: [], totalItems: 0, page, limit };
    }

    const doctors = await DoctorProfileModel.find({ specialist: { $in: specialistIds } })
      .select('_id')
      .lean();
    const doctorIds = doctors.map((doctor) => doctor._id);

    if (doctorIds.length === 0) {
      return { items: [], totalItems: 0, page, limit };
    }

    matchStages.push({
      $match: {
        doctor: { $in: doctorIds },
      },
    });
  }

  const searchText = query.search.trim();

  const searchMatch: PipelineStage.Match | null = searchText
    ? {
        $match: {
          $or: [
            { 'patient.fullName': new RegExp(escapeRegex(searchText), 'i') },
            { 'doctor.fullName': new RegExp(escapeRegex(searchText), 'i') },
            { 'doctor.specialist.name': new RegExp(escapeRegex(searchText), 'i') },
            { comment: new RegExp(escapeRegex(searchText), 'i') },
          ],
        },
      }
    : null;

  const lookupStages: PipelineStage[] = [
    {
      $lookup: {
        from: 'patientprofiles',
        localField: 'patient',
        foreignField: '_id',
        as: 'patient',
      },
    },
    {
      $unwind: {
        path: '$patient',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'doctorprofiles',
        localField: 'doctor',
        foreignField: '_id',
        as: 'doctor',
      },
    },
    {
      $unwind: {
        path: '$doctor',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'specialists',
        localField: 'doctor.specialist',
        foreignField: '_id',
        as: 'doctorSpecialist',
      },
    },
    {
      $unwind: {
        path: '$doctorSpecialist',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        'doctor.specialist': '$doctorSpecialist',
      },
    },
  ];

  const sharedPipeline: PipelineStage[] = [...matchStages, ...lookupStages];

  if (searchMatch) {
    sharedPipeline.push(searchMatch);
  }

  const [{ totalItems = 0 } = { totalItems: 0 }] = await ReviewModel.aggregate<{
    totalItems: number;
  }>([...sharedPipeline, { $count: 'totalItems' }]);

  if (totalItems === 0) {
    return { items: [], totalItems, page, limit };
  }

  const sortDirection = query.sort === 'asc' ? 1 : -1;
  const sortByColumn: Record<ListReviewsDto['column'], string> = {
    patientName: 'patient.fullName',
    doctorName: 'doctor.fullName',
    rating: 'rating',
    createdAt: 'createdAt',
  };

  const sortField = sortByColumn[query.column];

  const items = await ReviewModel.aggregate([
    ...sharedPipeline,
    {
      $sort: {
        [sortField]: sortDirection,
        _id: 1,
      },
    },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        __v: 1,
        appointment: 1,
        rating: 1,
        comment: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        patient: {
          _id: '$patient._id',
          fullName: '$patient.fullName',
        },
        doctor: {
          _id: '$doctor._id',
          fullName: '$doctor.fullName',
          specialist: {
            _id: '$doctor.specialist._id',
            name: '$doctor.specialist.name',
            slug: '$doctor.specialist.slug',
          },
        },
      },
    },
  ]);

  return { items, totalItems, page, limit };
};

export const getReviewById = async (reviewId: string) => {
  const review = await ReviewModel.findById(reviewId)
    .populate('patient', 'fullName')
    .populate({
      path: 'doctor',
      select: 'fullName specialist',
      populate: {
        path: 'specialist',
        select: 'name slug',
      },
    });

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  return review;
};

export const getReviewByAppointmentId = async (appointmentId: string) => {
  const review = await ReviewModel.findOne({ appointment: appointmentId })
    .populate('patient', 'fullName')
    .populate({
      path: 'doctor',
      select: 'fullName specialist',
      populate: {
        path: 'specialist',
        select: 'name slug',
      },
    });

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  return review;
};

export const updateReview = async (reviewId: string, payload: UpdateReviewDto) => {
  const review = await ReviewModel.findById(reviewId);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  if (typeof payload.rating === 'number') {
    review.rating = payload.rating;
  }

  if (typeof payload.comment === 'string') {
    review.comment = payload.comment;
  }

  if (typeof payload.status === 'string') {
    review.status = payload.status;
  }

  await review.save();
  await recalculateDoctorRating(review.doctor.toString());

  return getReviewById(reviewId);
};

export const deleteReview = async (reviewId: string) => {
  const review = await ReviewModel.findByIdAndDelete(reviewId);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  await recalculateDoctorRating(review.doctor.toString());

  return review;
};
