export interface Specialization {
  id: number;
  name: string;
}

export interface LawyerSpecialization {
  id: number;
  specializationId: number;
  specialization: Specialization;
}

export interface LawyerProfile {
  id: number;
  fullName: string;
  email: string;
  biography: string;
  averageRating: number;
  profilePhoto: string;
  registrationBody: string;
  registrationNumber: string;
  yearOfExperience: number;
  education?: string;
  languages?: string[];
  specializations: string[];
}

export interface User {
  id: number;
  fullName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Appointment {
  id: number;
  user_id: number;
  lawyer_id: number;
  appointment_date: Date;
  case_description: string;
  status: string;
  created_at: Date;
}

export interface LawyerSpecialization {
  id: number;
  lawyer_id: number;
  specialization_id: number;
}

export interface LawyerReview {
  id: number;
  user_id: number;
  lawyer_id: number;
  rating: number;
  comment: string;
  created_at: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  FullName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
