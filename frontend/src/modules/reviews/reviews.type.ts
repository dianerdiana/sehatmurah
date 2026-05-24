export type Review = {
  _id: string;
  __v: number;
  patient: Patient;
  doctor: string;
  appointment: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type Patient = {
  _id: string;
  fullName: string;
};
