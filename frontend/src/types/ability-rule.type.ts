import type { MongoAbility, MongoQuery } from '@casl/ability';

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

export type AbilityRule = {
  action: PermissionAction;
  subject: PermissionSubject;
};

export type AppAbility = MongoAbility<[PermissionAction, PermissionSubject], MongoQuery>;
