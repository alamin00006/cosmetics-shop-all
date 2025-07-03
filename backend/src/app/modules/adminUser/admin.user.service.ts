import mongoose, { ClientSession, ObjectId } from 'mongoose'
import httpStatus from 'http-status'

import { generateAdminUserId } from './admin.user.utils'
import ApiError from '../../../errors/ApiError'
import { IAdminUser } from './admin.user.interface'
import SuperAdmin from '../superAdmin/superAdmin.model'
import AdminUser from './admin.user.model'
import Doctor from '../doctor/doctor.model'
import Admin from '../admin/admin.model'
import { ISuperAdmin } from '../superAdmin/superAdmin.interface'

const createAdminUser = async (
  adminUserData: ISuperAdmin,
  user: IAdminUser,
): Promise<IAdminUser | null> => {
  // Check exists email
  const findUser = await AdminUser.findOne({ email: user.email })
  if (findUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sorry! An account already exists with this email.',
    )
  }

  const session: ClientSession = await mongoose.startSession()
  let newUserAllData: IAdminUser | null = null

  try {
    session.startTransaction()

    // Generate a new Admin ID
    const id = await generateAdminUserId()
    user.id = id
    adminUserData.id = id

    // Create a new Doctor or SuperAdmin based on role
    let newAdminUser
    if (user.role === 'SuperAdmin') {
      newAdminUser = await SuperAdmin.create([adminUserData], { session })
    } else if (user.role === 'admin') {
      newAdminUser = await Admin.create([adminUserData], { session })
    } else {
      newAdminUser = await Doctor.create([adminUserData], { session })
    }

    if (!newAdminUser || newAdminUser.length === 0) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Failed to create Doctor or SuperAdmin or Admin',
      )
    }

    // role-based user create
    if (user.role === 'SuperAdmin') {
      user.SuperAdmin = newAdminUser[0]._id as ObjectId
    } else if (user.role === 'admin') {
      user.admin = newAdminUser[0]._id as ObjectId
    } else {
      user.doctor = newAdminUser[0]._id as ObjectId
    }

    // Create a new AdminUser
    const newUser = await AdminUser.create([user], { session })
    if (!newUser || newUser.length === 0) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Failed to create AdminUser.')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }

  return newUserAllData
}

const getLoginUserByEmail = async (email: string) => {
  if (!email) {
    throw new Error('Email is required')
  }

  const adminUser = await AdminUser.findOne({ email }).populate(
    'PRManager company SuperAdmin',
  )
  if (!adminUser) {
    throw new Error('No account found with this email')
  }

  const { password: pwd, ...others } = adminUser.toObject()
  return others
}

export const AdminUserService = {
  createAdminUser,
  getLoginUserByEmail,
}
