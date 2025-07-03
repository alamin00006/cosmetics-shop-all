import mongoose, { Schema, Document, Model } from 'mongoose'
// import validator from 'validator'
import bcrypt from 'bcryptjs'
import config from '../../../config'
import { IUser } from './user.interface'

interface UserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'This email already exists!'],
      // validate: [validator.isEmail, 'Provide a valid email'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ['User'],
      default: 'User',
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiration: {
      type: Date,
      required: false,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    personalDetails: {
      fathersName: { type: String },
      mothersName: { type: String },
      birthDate: { type: Date },
      nidOrPassportNo: { type: String },
      nidOrPassportPhoto: { type: String },
      nidOrPassportBackSidePhoto: { type: String },
      userPhoto: { type: String },
    },
    address: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String, default: 'Bangladesh' },
    },
    status: {
      type: String,
      enum: ['active', 'deactive', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds),
      )
      next()
    } catch (error: any) {
      next(error)
    }
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

userSchema.statics.isUserExist = async function (
  id: string,
): Promise<IUser | null> {
  return await this.findOne({ _id: id })
}

const User = mongoose.model<IUser, UserModel>('User', userSchema)

export default User
