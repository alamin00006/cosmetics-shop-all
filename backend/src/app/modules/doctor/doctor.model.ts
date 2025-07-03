import mongoose, { Schema, Types } from 'mongoose';
import { IDoctor, IDutyTime } from './doctor.interface';
import { Gender } from '../../../enums/gender';

// Duty Time Schema
const doctorDutyTimeSchema = new Schema<IDutyTime>(
  {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

// Main Doctor Schema
const doctorSchema = new Schema<IDoctor>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    doctorMail: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bmdcRegNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    additionalPhoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    address: {
      type: String,
    },
    // 🆕 Referenced department (ObjectId)
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    specialization: {
      type: String,
    },
    yearsExperience: {
      type: String,
    },
    dutyTime: {
      type: doctorDutyTimeSchema,
    },
    doctorPhoto: {
      type: String,
    },
    // 🆕 Referenced subCategories (Array of ObjectIds)
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: [],
      },
    ],
    aboutDoctor: {
      type: String,
    },
    doctorsDegree: {
      type: [String], // or reference another Degree model if needed
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Export Model
const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
