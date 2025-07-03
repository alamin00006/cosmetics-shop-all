import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../../config'
import { IClientUser } from './clientUser.interface'

const clientUserSchema = new Schema<IClientUser>(
  {
    clientUserId: {
      type: String,
      required: true,
      unique: true,
    },
    clientName: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    age: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: null,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    nationality: {
      type: String,
      default: null,
    },
    occupation: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// Hash password before saving
clientUserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds))
      this.password = await bcrypt.hash(this.password, salt)
    } catch (err: any) {
      return next(err)
    }
  }
  next()
})

// Model
const ClientUser = mongoose.model<IClientUser>('ClientUser', clientUserSchema)

export default ClientUser
