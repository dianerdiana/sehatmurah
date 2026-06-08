import type { MongoAbility, MongoQuery } from '@casl/ability';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete';
export type PermissionSubject =
  | 'Auth'
  | 'User'
  | 'Appointment'
  | 'DoctorProfile'
  | 'GeneralDoctorProfile'
  | 'PatientProfile'
  | 'Review'
  | 'Specialist'
  | 'Dashboard'
  | 'PlatformTitle'
  | 'ListAppointment'
  | 'ListDoctor'
  | 'ListPatient'
  | 'ListSpecialist'
  | 'ListUser'
  | 'ListReview';

export type AbilityRule = {
  action: PermissionAction;
  subject: PermissionSubject;
};

export type AppAbility = MongoAbility<[PermissionAction, PermissionSubject], MongoQuery>;
