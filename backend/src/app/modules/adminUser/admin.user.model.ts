import mongoose, { Schema } from 'mongoose'

import bcrypt from 'bcryptjs'
import { IAdminUser } from './admin.user.interface'
import { Role } from '../../../enums/role'
import { Status } from '../../../enums/status'
import config from '../../../config'
import { IPermission } from '../userPermission/permission.interface'
const { ObjectId } = mongoose.Schema.Types

// Enum for role and status

// Interface for AdminUser document

const permissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    _id: false,
  },
)

// Schema Design
const adminUserSchema = new Schema<IAdminUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.USER,
      required: true,
    },
    hospital: {
      type: ObjectId,
      ref: 'Hospital',
    },
    doctor: {
      type: ObjectId,
      ref: 'Doctor',
    },
    admin: {
      type: ObjectId,
      ref: 'Admin',
    },
    SuperAdmin: {
      type: ObjectId,
      ref: 'SuperAdmin',
    },
    permissions: [
      {
        type: permissionSchema,
      },
    ],
    status: {
      type: String,
      enum: Status,
      default: Status.Active,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// Middleware to hash password before saving
adminUserSchema.pre<IAdminUser>('save', async function (next) {
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

// Method to compare passwords
adminUserSchema.methods.comparePassword = function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

// Static method to check if a user exists
adminUserSchema.statics.isUserExist = async function (
  id: string,
): Promise<IAdminUser | null> {
  return await AdminUser.findOne(
    { _id: id },
    { _id: 1, role: 1, clinic: 1, email: 1 },
  )
}

// Model
const AdminUser = mongoose.model<IAdminUser>('AdminUser', adminUserSchema)

export default AdminUser
