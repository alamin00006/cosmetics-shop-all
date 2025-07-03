import { Types } from 'mongoose'

export interface IPriceDetails {
  regularPrice?: number;
  discount: number;
  discountAmount?: number;
  finalAmount?: number;
}

export interface IServiceDiscount {
  serviceId: Types.ObjectId;
  discountTitle: string;

  priceDetails: IPriceDetails;

  startDate: string;
  endDate: string;
  status: 'pending' | 'running' | 'expired';
  isDeleted: boolean;
}
