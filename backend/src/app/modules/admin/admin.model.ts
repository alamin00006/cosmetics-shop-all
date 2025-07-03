import mongoose, { Schema, Document } from 'mongoose'
import { IAdmin } from './admin.interface'

// Schema Design
const adminSchema: Schema = new Schema<IAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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

// Model
const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin
