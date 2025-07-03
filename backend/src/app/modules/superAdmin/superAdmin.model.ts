import mongoose, { Document, Schema, Types } from 'mongoose'
import { ISuperAdmin } from './superAdmin.interface'

// Schema Design
const SuperAdminSchema = new Schema<ISuperAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    address: {
      type: String,
    },
    userPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// Create and export the model with type `SuperAdminInterface`
const SuperAdmin = mongoose.model<ISuperAdmin>('SuperAdmin', SuperAdminSchema)

export default SuperAdmin
