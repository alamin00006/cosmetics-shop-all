import mongoose from 'mongoose'
import { IAdminUser } from '../adminUser/admin.user.interface'
import AdminUser from '../adminUser/admin.user.model'
import { IDoctor } from './doctor.interface'
import { generateAdminUserId } from '../adminUser/admin.user.utils'
import Doctor from './doctor.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { Role } from '../../../enums/role'
const createDoctor = async (doctorsData: IDoctor): Promise<void> => {
  // Check if an admin user with the same email exists
  console.log(doctorsData);
  
  const findUser = await AdminUser.findOne({ email: doctorsData?.doctorMail })
  if (findUser) {
    throw new Error(
      `Sorry! An account with email ${doctorsData.email} already exists.`,
    )
  }
  const session = await mongoose.startSession()
  let newUserAllData: IAdminUser | null = null

  try {
    session.startTransaction()

    // Generate a new Admin ID
    const id = await generateAdminUserId()

    const newDoctorData = {
      ...doctorsData,
      id,
    }

    // Create a new Hospital entry
    const newDoctor = await Doctor.create([newDoctorData], { session })
    if (!newDoctor.length) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Failed to create Hospital.')
    }
    const userData = {
      id,
      doctor: newDoctor[0]._id,
      email: doctorsData?.doctorMail,
      password: doctorsData.password,
      role: Role.DOCTOR,
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

const getDoctors = async () => {
  try {
    const doctors = await Doctor.find({})
    .populate('department') 
    .populate('subCategory');

    if (!doctors || doctors.length === 0) {
      throw new Error('No doctors found')
    }

    return doctors
  } catch (error) {
    throw new Error(`Failed to fetch doctors: ${(error as Error).message}`)
  }
}

export const DoctorsService = {
  createDoctor,
  getDoctors,
}
