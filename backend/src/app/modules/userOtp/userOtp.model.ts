import { Schema, model, Document } from 'mongoose'
import { IUserOtp } from './userOtp.interface'

const otpSchema = new Schema<IUserOtp>(
  {
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

const UserOtp = model<IUserOtp>('UserOtp', otpSchema)

export default UserOtp
