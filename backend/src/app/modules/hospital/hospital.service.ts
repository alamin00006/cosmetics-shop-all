import mongoose from 'mongoose'
import { IAdminUser } from '../adminUser/admin.user.interface'
import AdminUser from '../adminUser/admin.user.model'
import { IHospital } from './hospital.interface'
import { generateAdminUserId } from '../adminUser/admin.user.utils'
import Hospital from './hospital.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { Role } from '../../../enums/role'

import HospitalServiceModal from '../hospitalService/hospitalService.model'

const createHospital = async (hospitalData: IHospital): Promise<void> => {
  // Check if an admin user with the same email exists
  const findUser = await AdminUser.findOne({ email: hospitalData.email })
  if (findUser) {
    throw new Error(
      `Sorry! An account with email ${hospitalData.email} already exists.`,
    )
  }

  const session = await mongoose.startSession()
  let newUserAllData: IAdminUser | null = null

  try {
    session.startTransaction()

    // Generate a new Admin ID
    const id = await generateAdminUserId()

    const newHospitalData = {
      ...hospitalData,
      id,
    }

    // Create a new Hospital entry
    const newHospital = await Hospital.create([newHospitalData], { session })
    if (!newHospital.length) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Failed to create Hospital.')
    }

    const userData = {
      id,
      hospital: newHospital[0]._id,
      email: hospitalData.email,
      password: hospitalData.password,
      role: Role.HOSPITAL,
    }

    // Create a new AdminUser
    const newUser = await AdminUser.create([userData], { session })
    if (!newUser.length) {
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
}

// -------------------Get All Hospital -----------------
const getHospitals = async () => {
  const findHospital = await Hospital.find({})
  if (!findHospital) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Failed to retrieve all hospital data.',
    )
  }
  return findHospital
}

// ---------------------- Get Single -----------------
const getSingleHospitalFromDB = async (hospitalId: string) => {
  if (!hospitalId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Hospital   ID is required.')
  }

  const result = await Hospital.findOne({ _id: hospitalId })

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Hospital  not found with the provided ID.',
    )
  }

  return result
}

// ---------------------- Get All Services for a Single Hospital -----------------
const getSingleHospitalAllServiceFromDB = async (hospitalId: string) => {
  if (!hospitalId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Hospital ID is required.')
  }

  const findAllService = await HospitalServiceModal.find({
    hospitalId: hospitalId,
  }).populate('hospitalId')
  // console.log(findAllService)

  if (!findAllService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'All Service not found.')
  }

  return findAllService
}

export const HospitalService = {
  createHospital,
  getHospitals,
  getSingleHospitalFromDB,
  getSingleHospitalAllServiceFromDB,
}
