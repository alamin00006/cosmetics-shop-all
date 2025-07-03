import mongoose, { Schema, model, Model } from 'mongoose'
import {
  IAppointments,
  IPayment,
  IPriceDetails,
} from './appointments.interface'

// Price Details Schema
const priceDetailsSchema = new Schema<IPriceDetails>({
  regularPrice: { type: Number, required: true },
  discount: { type: Number, default: null },
  discountAmount: { type: Number, default: null },
  finalAmount: { type: Number, required: true },
})

// Payment Schema
const paymentSchema = new Schema<IPayment>({
  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ['cash', 'card', 'bkash', 'nagad', 'rocket', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    required: true,
  },
  transactionId: { type: String },
  paidAt: { type: Date,   },
  note: { type: String },
})

// Appointments Schema
const appointmentsSchema = new Schema<IAppointments>(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    discountId: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceDiscount',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'HospitalService',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'ClientUser',
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    appointments: {
      appointmentDate: { type: String, required: true },
      timeSlot: { type: String, required: true },
    },
    payments: {
      type: paymentSchema,
      default: {},
    },
    priceDetails: {
      type: priceDetailsSchema,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
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

// Create and export model
const Appointment: Model<IAppointments> = model<IAppointments>(
  'Appointment',
  appointmentsSchema,
)

export default Appointment
