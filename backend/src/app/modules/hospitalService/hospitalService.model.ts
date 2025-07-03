import mongoose, { Schema, Model } from 'mongoose'
import {
  IHospitalService,
  IRating,
  IPackageContents,
} from './hospitalService.interface'

// Rating Schema (uncomment if needed)
const ratingSchema = new Schema<IRating>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
})

// Package Contents Schema
const packageContentsSchema = new Schema<IPackageContents>({
  generalInformation: { type: String },
  includedInPackage: { type: [String] },
  notIncludedInPackage: { type: [String] },
  importantInformation: { type: String },
  aftercareInstructions: { type: String },
  necessaryPrecautions: { type: String },
  contraindications: { type: [String] },
  possibleSideEffects: { type: [String] },
  browliftFunction: { type: String },
  browliftProcedure: { type: String },
  locationInformation: { type: String },
  termsAndPolicies: { type: String },
})

// Hospital Service Schema
const hospitalServiceSchema = new Schema<IHospitalService>(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Hospital',
    },
    discountId: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceDiscount',
      default: null,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    serviceOverview: {
      type: String,
      required: true,
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    serviceSpecialization: {
      type: String,
      required: true,
    },
    priceDetails: {
      regularPrice: { type: Number, required: true },
      discount: { type: Number, default: null },
      discountAmount: { type: Number, default: null },
      finalAmount: { type: Number, required: true },
    },
    isApplicableForForeigners: {
      type: Boolean,
      default: false,
    },
    serviceTimeDuration: {
      type: String,
      enum: ['30', '60'],
      required: true,
    },
    serviceImage: {
      type: [String],
      required: true,
    },
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
      },
    ],
    packageContents: packageContentsSchema,
    status: {
      type: String,
      enum: ['pending', 'running', 'expired'],
      default: 'running',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

// Create and export the model
const HospitalService: Model<IHospitalService> =
  mongoose.model<IHospitalService>('HospitalService', hospitalServiceSchema)

export default HospitalService
