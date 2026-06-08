import { UserRole } from './enums/user-role.enum';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete';
export type PermissionSubject =
  | 'Auth'
  | 'User'
  | 'Appointment'
  | 'DoctorProfile'
  | 'GeneralDoctorProfile'
  | 'OwnDoctorProfile'
  | 'PatientProfile'
  | 'Review'
  | 'Specialist'
  | 'Dashboard'
  | 'PlatformTitle'
  | 'SettingTitle'
  | 'ListAppointment'
  | 'ListDoctor'
  | 'ListPatient'
  | 'ListSpecialist'
  | 'ListUser'
  | 'ListReview';

export type PermissionTuple = [PermissionAction, PermissionSubject];

export const permissionsByRole: Record<UserRole, PermissionTuple[]> = {
  [UserRole.ADMIN]: [
    ['create', 'Auth'],
    ['read', 'Auth'],

    ['read', 'ListUser'],
    ['create', 'User'],
    ['read', 'User'],
    ['update', 'User'],
    ['delete', 'User'],

    ['read', 'ListAppointment'],
    ['read', 'Appointment'],
    ['update', 'Appointment'],
    ['delete', 'Appointment'],

    ['read', 'ListDoctor'],
    ['create', 'DoctorProfile'],
    ['read', 'DoctorProfile'],
    ['update', 'DoctorProfile'],
    ['delete', 'DoctorProfile'],
    ['update', 'GeneralDoctorProfile'],

    ['read', 'ListPatient'],
    ['read', 'PatientProfile'],
    ['delete', 'PatientProfile'],

    ['read', 'ListReview'],
    ['read', 'Review'],
    ['update', 'Review'],
    ['delete', 'Review'],

    ['read', 'ListSpecialist'],
    ['create', 'Specialist'],
    ['read', 'Specialist'],
    ['update', 'Specialist'],
    ['delete', 'Specialist'],

    ['read', 'Dashboard'],

    ['read', 'PlatformTitle'],
  ],
  [UserRole.DOCTOR]: [
    ['create', 'Auth'],
    ['read', 'Auth'],

    ['read', 'ListAppointment'],
    ['read', 'Appointment'],
    ['update', 'Appointment'],

    ['read', 'ListDoctor'],
    ['read', 'DoctorProfile'],
    ['update', 'DoctorProfile'],
    ['update', 'OwnDoctorProfile'],

    ['read', 'Review'],

    ['read', 'ListSpecialist'],
    ['read', 'Specialist'],

    ['read', 'Dashboard'],

    ['read', 'PlatformTitle'],
    ['read', 'SettingTitle'],
  ],
  [UserRole.PATIENT]: [
    ['create', 'Auth'],
    ['read', 'Auth'],

    ['read', 'ListAppointment'],
    ['create', 'Appointment'],
    ['read', 'Appointment'],
    ['delete', 'Appointment'],

    ['read', 'DoctorProfile'],

    ['read', 'PatientProfile'],
    ['update', 'PatientProfile'],

    ['create', 'Review'],
    ['read', 'Review'],

    ['read', 'Specialist'],

    ['read', 'PlatformTitle'],
    ['read', 'SettingTitle'],
  ],
};

export type Permission = {
  action: PermissionAction;
  subject: PermissionSubject;
};

export const getPermissionsByRole = (role: UserRole): PermissionTuple[] => {
  return permissionsByRole[role] ?? [];
};

export const toPermissionObjects = (permissionTuples: PermissionTuple[]): Permission[] => {
  return permissionTuples.map(([action, subject]) => ({ action, subject }));
};

export const getPermissionObjectsByRole = (role: UserRole): Permission[] => {
  return toPermissionObjects(getPermissionsByRole(role));
};
