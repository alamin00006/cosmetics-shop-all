import httpStatus from 'http-status'

import ApiError from '../../../errors/ApiError'
import mongoose from 'mongoose'
import { IAppointments } from './appointments.interface'
import Appointment from './appointments.model'
import ClientUser from '../clientUser/clientUser.model'

// ---------------------- Create -----------------
const createAppointmentIntoDB = async (payload: Partial<IAppointments>) => {
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide valid appointments data.',
    )
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const { userInfo, ...appointmentData } = payload as any

    // ✅ 1. Create appointment
    const createdAppointment = await Appointment.create([appointmentData], {
      session,
    })

    if (!createdAppointment || createdAppointment.length === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create appointment.',
      )
    }

    // ✅ 2. Update ClientUser
    try {
      const updatedUser = await ClientUser.findOneAndUpdate(
        { _id: appointmentData?.userId },
        {
          $set: {
            clientName: userInfo?.name,
            email: userInfo?.email,
            gender: userInfo?.gender,
            bloodGroup: userInfo?.bloodGroup,
            age: userInfo?.age,
            contactNumber: userInfo?.mobile,
          },
        },
        { new: true, session },
      )

      if (!updatedUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update user.')
      }
    } catch (error) {
      console.error('❌ Error updating user:', error)
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong while updating user.',
      )
    }

    // ✅ 3. Commit transaction
    await session.commitTransaction()
    session.endSession()

    return createdAppointment[0]
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

// ---------------------- Get All -----------------
const getAllAppointmentFromDB = async () => {
  const result = await Appointment.find()
    .populate('hospitalId')
    .populate('discountId')
    .populate('serviceId')
    .populate('doctorId')
    .populate('userId')

  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No appointments found.')
  }

  return result
}

// ---------------------- Get single -----------------
const getSingleAppointmentFromDB = async (appointmentId: string) => {
  if (!appointmentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Appointment ID is required.')
  }

  const result = await Appointment.findById({ _id: appointmentId })
    .populate('hospitalId')
    .populate('discountId')
    .populate('serviceId')
    .populate('doctorId')
    .populate('userId')

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Single Appointment data cant retrieved data!!',
    )
  }

  return result
}

// ---------------------- Delete -----------------
const deleteAppointmentFromDB = async (appointmentId: string) => {
  if (!appointmentId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Appointment ID is required for deletion.',
    )
  }

  const deleted = await Appointment.findByIdAndDelete(appointmentId)

  if (!deleted) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to delete Appointment. It may not exist.',
    )
  }

  return deleted
}

// ---------------------- Update -----------------
const updateAppointmentIntoDB = async (
  appointmentId: string,
  payload: Partial<IAppointments>,
) => {
  const updateData: Record<string, unknown> = { ...payload }

  const result = await Appointment.findOneAndUpdate(
    { _id: appointmentId },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to update Appointment. Please check the ID and try again.',
    )
  }

  return result
}

export const AppointmentServices = {
  createAppointmentIntoDB,
  getAllAppointmentFromDB,
  getSingleAppointmentFromDB,
  updateAppointmentIntoDB,
  deleteAppointmentFromDB,
}
