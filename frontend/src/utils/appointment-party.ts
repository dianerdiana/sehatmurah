import type { AppointmentParty } from '@/modules/appointments/appointment.type';

export const getPartyName = (party: string | AppointmentParty | undefined) => {
  if (!party) {
    return 'Unknown';
  }

  return typeof party === 'string' ? party : party.fullName;
};

export const getPartyId = (party: string | AppointmentParty | undefined) => {
  if (!party) {
    return null;
  }

  return typeof party === 'string' ? party : party._id;
};
