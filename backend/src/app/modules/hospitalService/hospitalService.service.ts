import httpStatus from 'http-status'
import { IHospitalService } from './hospitalService.interface'
import HospitalService from './hospitalService.model'
import ApiError from '../../../errors/ApiError'
import mongoose from 'mongoose'
import moment from 'moment'
import Appointment from '../appointments/appointments.model'

// ---------------------- Create -----------------
const createHospitalServiceIntoDB = async (
  payload: Partial<IHospitalService>,
) => {
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide valid hospital service data.',
    )
  }
  if (payload.priceDetails && payload.priceDetails.regularPrice !== undefined) {
    payload.priceDetails.finalAmount = payload.priceDetails.regularPrice
  }

  const result = await HospitalService.create(payload)

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create hospital service. Please try again.',
    )
  }

  return result
}

// ---------------------- Get All -----------------
const getAllHospitalServiceFromDB = async () => {
  const result = await HospitalService.find()
    .populate('hospitalId')
    .populate('discountId')
    .populate('doctors') // 👈 populating doctors array

  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No hospital services found.')
  }

  return result
}

// ---------------------- Get single -----------------
const getSingleHospitalServiceFromDB = async (serviceId: string) => {
  if (!serviceId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Hospital service ID is required.',
    )
  }

  const serviceData = await HospitalService.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(serviceId),
      },
    },
    {
      $lookup: {
        from: 'hospitals',
        localField: 'hospitalId',
        foreignField: '_id',
        as: 'hospitalId',
      },
    },
    {
      $unwind: {
        path: '$hospitalId',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'servicediscounts',
        localField: 'discountId',
        foreignField: '_id',
        as: 'discountId',
      },
    },
    {
      $unwind: {
        path: '$discountId',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'doctors',
        localField: 'doctors',
        foreignField: '_id',
        as: 'doctors',
      },
    },
  ])

  if (!serviceData.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Hospital service not found with the provided ID.',
    )
  }

  const moment = require('moment') // Import moment to generate time slots

  // Post-process: add timeSlots using JS
  const service = serviceData[0]
  const duration = parseInt(service.serviceTimeDuration) // duration in minutes

  service.doctors = service.doctors.map((doc: any) => {
    const slots: string[] = []

    if (doc.dutyTime?.start && doc.dutyTime?.end && duration) {
      const format = 'HH:mm'
      let current = moment(doc.dutyTime.start, format)
      const endTime = moment(doc.dutyTime.end, format)

      while (current.clone().add(duration, 'minutes').isSameOrBefore(endTime)) {
        const slotStart = current.clone()
        const slotEnd = current.clone().add(duration, 'minutes')
        slots.push(`${slotStart.format(format)} - ${slotEnd.format(format)}`)
        current = current.add(duration, 'minutes')
      }
    }

    return {
      ...doc,
      timeSlots: slots,
    }
  })

  return service
}

// ---------------------- Get single for slot -----------------
const getSingleServiceForSlotFromDB = async (payload: any) => {
  // Validate input payload
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide valid hospital service id, doctor id and date.',
    )
  }

  // console.log(payload)

  const { doctorId, serviceId, date } = payload

  // Step 1: Get the hospital service and filter the matched doctor
  const serviceData = await HospitalService.aggregate([
    {
      // Match the specific hospital service by ID
      $match: {
        _id: new mongoose.Types.ObjectId(serviceId),
      },
    },
    {
      // Lookup the related doctors
      $lookup: {
        from: 'doctors',
        localField: 'doctors',
        foreignField: '_id',
        as: 'doctors',
      },
    },
    {
      // Filter only the doctor whose ID matches the input doctorId
      $addFields: {
        doctors: {
          $filter: {
            input: '$doctors',
            as: 'doc',
            cond: {
              $eq: ['$$doc._id', new mongoose.Types.ObjectId(doctorId)],
            },
          },
        },
      },
    },
  ])

  // Step 2: Validate that both the service and doctor exist
  if (!serviceData.length || !serviceData[0].doctors.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Hospital service or doctor not found with the provided ID.',
    )
  }

  const service = serviceData[0]
  const duration = 15 // Each time slot will be 15 minutes

  const doctor = service.doctors[0]
  const slots: { time: string, status: 'available' | 'booked' }[] = []

  if (doctor.dutyTime?.start && doctor.dutyTime?.end) {
    const format = 'HH:mm'
    let current = moment(doctor.dutyTime.start, format)
    const endTime = moment(doctor.dutyTime.end, format)

    // Step 3: Fetch appointments for the doctor on the given date
    const existingAppointments = await Appointment.find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      serviceId: new mongoose.Types.ObjectId(serviceId),
      'appointments.appointmentDate': date,
      isDeleted: false,
      status: 'pending',
    })

    // Extract the already booked time slots
    const bookedSlots = existingAppointments.map(a => a.appointments?.timeSlot)

    // Step 4: Generate all slots from duty start to end time
    while (current.clone().add(duration, 'minutes').isSameOrBefore(endTime)) {
      const slotStart = current.clone()
      const slotEnd = current.clone().add(duration, 'minutes')
      const slotLabel = `${slotStart.format(format)} - ${slotEnd.format(format)}`

      // Step 5: Determine slot status (booked or available)
      slots.push({
        time: slotLabel,
        status: bookedSlots.map(s => s.trim()).includes(slotLabel.trim())
          ? 'booked'
          : 'available',
      })

      // Move to the next slot
      current = current.add(duration, 'minutes')
    }
  }

  // Step 6: Return only relevant doctor data with time slots
  return {
    doctor: {
      _id: doctor?._id,
      timeSlots: slots,
    },
  }
}

 



// ---------------------- Delete -----------------
const deleteHospitalServiceFromDB = async (serviceId: string) => {
  if (!serviceId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Hospital service ID is required for deletion.',
    )
  }

  const deleted = await HospitalService.findByIdAndDelete(serviceId)

  if (!deleted) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to delete hospital service. It may not exist.',
    )
  }

  return deleted
}

// ---------------------- Update -----------------
const updateHospitalServiceIntoDB = async (
  serviceId: string,
  payload: Partial<IHospitalService>,
) => {
  const updateData: Record<string, unknown> = { ...payload }

  const result = await HospitalService.findOneAndUpdate(
    { _id: serviceId },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to update hospital service. Please check the ID and try again.',
    )
  }

  return result
}

export const HospitalServices = {
  createHospitalServiceIntoDB,
  getAllHospitalServiceFromDB,
  getSingleHospitalServiceFromDB,
  updateHospitalServiceIntoDB,
  deleteHospitalServiceFromDB,
  getSingleServiceForSlotFromDB,
}
