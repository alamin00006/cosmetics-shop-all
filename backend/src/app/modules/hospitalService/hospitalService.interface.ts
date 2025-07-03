import { Types } from 'mongoose'

export type ServiceTimeDuration = '30' | '60'

export interface IPriceDetails {
  regularPrice: number;
  discount?: number;
  discountAmount?: number;
  finalAmount: number;
}

export interface IRating {
  userId: Types.ObjectId;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface IPackageContents {
  generalInformation?: string;
  includedInPackage?: string[];
  notIncludedInPackage?: string[];
  importantInformation?: string;
  aftercareInstructions?: string;
  necessaryPrecautions?: string;
  contraindications?: string[];
  possibleSideEffects?: string[];
  browliftFunction?: string;
  browliftProcedure?: string;
  locationInformation?: string;
  termsAndPolicies?: string;
}

export interface IHospitalService {
  hospitalId: Types.ObjectId;
  discountId?: Types.ObjectId;
  serviceTitle: string;
  serviceOverview: string;
  serviceCategory: string;
  serviceSpecialization: string;
  priceDetails: IPriceDetails;
  isApplicableForForeigners: boolean;
  serviceTimeDuration: ServiceTimeDuration;
  serviceImage: string[];
  status: 'pending' | 'running' | 'expired';
  isDeleted: boolean;
  doctors: Types.ObjectId[];
  packageContents: IPackageContents;
}
