export type PermissionAction = 'create' | 'read' | 'update' | 'delete';
export type PermissionSubject = 'Auth' | 'Appointment' | 'DoctorProfile' | 'PatientProfile' | 'Review' | 'Specialist';

export type AbilityRule = {
  action: PermissionAction;
  subject: PermissionSubject;
};
