import { UserRole } from '../../common/enums/user-role.enum';
import { PatientProfileModel } from '../../models/patient-profile.model';
import { UserModel } from '../../models/user.model';
import { ApiError } from '../../middlewares/error.middleware';
import { comparePassword, hashPassword } from '../../utils/password';
import { signAccessToken } from '../../utils/jwt';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface LoginInput {
  email: string;
  password: string;
}

export const register = async (input: RegisterInput) => {
  const role = input.role ?? UserRole.PATIENT;

  const existingUser = await UserModel.findOne({
    email: input.email.toLowerCase(),
  });
  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role,
  });

  if (role === UserRole.PATIENT) {
    await PatientProfileModel.create({
      user: user._id,
      fullName: input.name,
    });
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

export const login = async (input: LoginInput) => {
  const user = await UserModel.findOne({
    email: input.email.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await comparePassword(input.password, user.password);
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
