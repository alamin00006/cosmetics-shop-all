import mongoose, { Model } from 'mongoose'

import { IPermission } from './permission.interface'

const permissionSchema = new mongoose.Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const Permission: Model<IPermission> = mongoose.model(
  'Permission',
  permissionSchema,
)
export default Permission
