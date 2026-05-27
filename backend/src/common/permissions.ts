import { UserRole } from './enums/user-role.enum';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete';
export type PermissionSubject =
  | 'Auth'
  | 'Appointment'
  | 'DoctorProfile'
  | 'PatientProfile'
  | 'Review'
  | 'Specialist'
  | 'Dashboard'
  | 'ListAppointment'
  | 'ListDoctor'
  | 'ListPatient'
  | 'ListSpecialist';

export type PermissionTuple = [PermissionAction, PermissionSubject];

export const permissionsByRole: Record<UserRole, PermissionTuple[]> = {
  [UserRole.ADMIN]: [
    ['create', 'Auth'],
    ['read', 'Auth'],
    ['read', 'Appointment'],
    ['update', 'Appointment'],
    ['delete', 'Appointment'],
    ['create', 'DoctorProfile'],
    ['read', 'DoctorProfile'],
    ['update', 'DoctorProfile'],
    ['delete', 'DoctorProfile'],
    ['read', 'PatientProfile'],
    ['delete', 'PatientProfile'],
    ['read', 'Review'],
    ['delete', 'Review'],
    ['create', 'Specialist'],
    ['read', 'Specialist'],
    ['update', 'Specialist'],
    ['delete', 'Specialist'],

    ['read', 'Dashboard'],
    ['read', 'ListAppointment'],
    ['read', 'ListDoctor'],
    ['read', 'ListPatient'],
    ['read', 'ListSpecialist'],
  ],
  [UserRole.DOCTOR]: [
    ['create', 'Auth'],
    ['read', 'Auth'],
    ['read', 'Appointment'],
    ['update', 'Appointment'],
    ['read', 'DoctorProfile'],
    ['update', 'DoctorProfile'],
    ['read', 'Review'],
    ['read', 'Specialist'],

    ['read', 'Dashboard'],
    ['read', 'ListAppointment'],
    ['read', 'ListSpecialist'],
  ],
  [UserRole.PATIENT]: [
    ['create', 'Auth'],
    ['read', 'Auth'],
    ['create', 'Appointment'],
    ['read', 'Appointment'],
    ['delete', 'Appointment'],
    ['read', 'DoctorProfile'],
    ['read', 'PatientProfile'],
    ['update', 'PatientProfile'],
    ['create', 'Review'],
    ['read', 'Review'],
    ['read', 'Specialist'],
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
