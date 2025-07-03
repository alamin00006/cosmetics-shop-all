import { Types } from 'mongoose'

export interface IPriceDetails {
  regularPrice: number;
  discount?: number;
  discountAmount?: number;
  finalAmount: number;
}

export interface IPayment {
  amount: number;
  method: 'cash' | 'card' | 'bkash' | 'nagad' | 'rocket' | 'other';
  status: 'success' | 'failed' | 'pending';
  transactionId?: string;
  paidAt: Date;
  note?: string;
}

export interface IAppointments {
  hospitalId: Types.ObjectId;
  discountId: Types.ObjectId;
  serviceId: Types.ObjectId;
  userId: Types.ObjectId;
  doctorId: Types.ObjectId;

  appointments: {
    appointmentDate: string,
    timeSlot: string,
  };

  payments?: IPayment;
  priceDetails: IPriceDetails;
  paymentStatus?: 'paid' | 'unpaid';
  status: 'pending' | 'completed' | 'cancelled';
  isDeleted: boolean;
}
