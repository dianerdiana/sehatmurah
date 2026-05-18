export type Review = {
  _id: string;
  patient: Patient;
  doctor: string;
  appointment: string;
  rating: number;
  comment: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type Patient = {
  _id: string;
  fullName: string;
};
