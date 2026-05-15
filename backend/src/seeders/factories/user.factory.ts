import bcryptjs from 'bcryptjs';

import { UserRole } from '../../common/enums/user-role.enum';

export interface IUserSeed {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

export async function generateUsers(): Promise<IUserSeed[]> {
  // Default password for all seeded users
  const defaultPassword = 'Password123!';
  const hashedPassword = await hashPassword(defaultPassword);

  const doctors = [
    {
      name: 'Dr. Ahmad Wijaya',
      email: 'ahmad.wijaya@sehatmurah.com',
      password: hashedPassword,
      role: UserRole.DOCTOR,
      isActive: true,
    },
    {
      name: 'Dr. Siti Nurhaliza',
      email: 'siti.nurhaliza@sehatmurah.com',
      password: hashedPassword,
      role: UserRole.DOCTOR,
      isActive: true,
    },
    {
      name: 'Dr. Budi Santoso',
      email: 'budi.santoso@sehatmurah.com',
      password: hashedPassword,
      role: UserRole.DOCTOR,
      isActive: true,
    },
    {
      name: 'Dr. Eka Putri',
      email: 'eka.putri@sehatmurah.com',
      password: hashedPassword,
      role: UserRole.DOCTOR,
      isActive: true,
    },
    {
      name: 'Dr. Roni Hermawan',
      email: 'roni.hermawan@sehatmurah.com',
      password: hashedPassword,
      role: UserRole.DOCTOR,
      isActive: true,
    },
  ];

  const patients = [
    {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Rini Kusuma',
      email: 'rini.kusuma@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Bambang Irawan',
      email: 'bambang.irawan@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Dina Marlina',
      email: 'dina.marlina@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Hendra Wijaya',
      email: 'hendra.wijaya@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Yuki Tanaka',
      email: 'yuki.tanaka@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
    {
      name: 'Lina Rahman',
      email: 'lina.rahman@email.com',
      password: hashedPassword,
      role: UserRole.PATIENT,
      isActive: true,
    },
  ];

  const admin = [
    {
      name: 'Admin Sehatmurah',
      email: 'admin@sehatmurah.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  ];

  return [...doctors, ...patients, ...admin];
}
