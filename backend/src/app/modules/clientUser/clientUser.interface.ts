export type BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

  export interface IClientUser {
    clientUserId: string;
    clientName?: string;
    password: string;
    contactNumber: string;
    address?: string;
    dateOfBirth?: Date;
    age?: string;
    profilePicture?: string;
    gender?: 'male' | 'female' | 'other';
    bloodGroup?: BloodGroup;
    email?: string;
    nationality?: string;
    occupation?: string;
    bio?: string;
    role: string;
    status: 'active' | 'blocked';
    isDeleted: boolean;
  }
  
