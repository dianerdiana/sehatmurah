import mongoose from 'mongoose';

import { ApiError } from '../../common/api-error';
import { UserRole } from '../../common/enums/user-role.enum';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { UserModel } from '../../models/user.model';
import { signAccessToken } from '../../utils/jwt';
import { comparePassword, hashPassword } from '../../utils/password';

import { LoginDto, RegisterDto } from './auth.schema';

export const register = async (payload: RegisterDto) => {
  // 1. Mulai sesi
  const session = await mongoose.startSession();

  const role = payload.role ?? UserRole.PATIENT;

  const existingUser = await UserModel.findOne({
    email: payload.email.toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const hashedPassword = await hashPassword(payload.password);

  // 2. Mulai transaksi
  session.startTransaction();

  try {
    // 3. Eksekusi operasi dengan sesi

    const user = await UserModel.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role,
    });

    if (role === UserRole.PATIENT) {
      await PatientProfileModel.create({
        user: user._id,
        fullName: payload.name,
      });
    }

    // 4. Commit transaksi jika semua operasi berhasil
    await session.commitTransaction();

    const token = signAccessToken({
      sub: user._id.toString(),
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    // Batalkan transaksi jika ada kesalahan
    await session.abortTransaction();
    throw new ApiError(401, `Failed to register user: ${error}`);
  } finally {
    // Tutup sesi
    session.endSession();
  }
};

export const login = async (payload: LoginDto) => {
  const user = await UserModel.findOne({
    email: payload.email.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await comparePassword(payload.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const me = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
};
