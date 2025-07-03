import { Document } from 'mongoose'

// Interface for Admin
export interface IAdmin extends Document {
  id: string;
  phoneNumber: string;
  name?: string;
  gender?: 'Male' | 'Female';
  address?: string;
  userPhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
