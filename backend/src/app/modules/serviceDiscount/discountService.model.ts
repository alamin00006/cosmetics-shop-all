import mongoose, { Schema, Model } from 'mongoose'
import { IServiceDiscount } from './discountService.interface'

const serviceDiscountSchema = new Schema<IServiceDiscount>(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'HospitalService',   
    },
    discountTitle: {
      type: String, 
      required: true,
    },


    priceDetails: {
      regularPrice: { type: Number,default:null },
      discount: { type: Number  },
      discountAmount: { type: Number,default:null },
      finalAmount: { type: Number,default:null},
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

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

const ServiceDiscount: Model<IServiceDiscount> =
  mongoose.model<IServiceDiscount>('ServiceDiscount', serviceDiscountSchema)

export default ServiceDiscount
