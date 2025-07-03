import { Gender } from '../../../enums/gender';
import { IAdminUser } from '../adminUser/admin.user.interface';
import { Types } from 'mongoose';

export interface IDutyTime {
  start?: string;
  end?: string;
}

// Optional: replace these with actual interfaces if you have them
export interface IDepartment {
  _id: Types.ObjectId;
  name: string;
}

export interface ISubCategory {
  _id: Types.ObjectId;
  name: string;
}

export interface IDoctor extends IAdminUser {
  id: string;
  doctorMail: string;
  firstName: string;
  lastName: string;
  bmdcRegNumber: string;
  phoneNumber: string;
  yearsExperience: string;
  department: Types.ObjectId | IDepartment; // <-- populated or raw ObjectId
  specialization: string;
  additionalPhoneNumber?: string;
  gender?: Gender;
  address?: string;
  doctorPhoto?: string;
  dutyTime: IDutyTime;
  subCategory: (Types.ObjectId | ISubCategory)[]; // <-- array of ObjectIds or populated objects
  aboutDoctor: string;
  doctorsDegree: string[];
}
