import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IServiceDiscount } from './discountService.interface'
import ServiceDiscount from './discountService.model'
import mongoose from 'mongoose'
import HospitalService from '../hospitalService/hospitalService.model'

// ---------------------- Create -----------------

const createServiceDiscountIntoDB = async (
  payload: Partial<IServiceDiscount>,
) => {
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide service discount data.',
    )
  }
  console.log(payload)

  const { serviceId, priceDetails: discountPrice } = payload
  // console.log(discountPrice)

  const findService = await HospitalService.findById({ _id: serviceId })
  if (!findService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found.')
  }
  // console.log(findService);

  // Extract current price details and calculate new values
  const { priceDetails } = findService
  const { regularPrice } = priceDetails

  // Calculate discount amount and final amount
  const discountAmount = discountPrice?.discount
    ? (regularPrice * discountPrice?.discount) / 100
    : 0
  const finalAmount = regularPrice - discountAmount

  // Prepare updated price details
  const updatedPriceDetails = {
    ...priceDetails,
    discount: discountPrice?.discount || null,
    discountAmount,
    finalAmount,
  }
  // console.log(updatedPriceDetails)

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    //transaction 1
    // Create the service discount inside the transaction
    const result = await ServiceDiscount.create([payload], { session })
    if (!result) {
      throw new Error('Failed to create service discount.')
    }
    // console.log(result[0]);

    //transaction 2
    //update service --> discountPercentage,finalAmount,discountAmount,discountId
    await HospitalService.updateOne(
      { _id: serviceId },
      {
        $set: {
          priceDetails: updatedPriceDetails,

          discountId: result[0]?._id,
        },
      },
      { session },
    )

    //transaction 3
    //update discount amount and final amount in serviceDiscount
    await ServiceDiscount.updateOne(
      { _id: result[0]?._id },
      {
        $set: {
          priceDetails: updatedPriceDetails,
        },
      },
      { session },
    )

    await session.commitTransaction()
    session.endSession()

    return result[0] // Return the created service discount
    // return null
  } catch (error) {
    await session.abortTransaction()
    session.endSession()

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create service discount. Please try again later.',
    )
  }
}

// ---------------------- Get All -----------------
const getAllServiceDiscountFromDB = async () => {
  const result = await ServiceDiscount.find().populate('serviceId')

  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No service discounts found.')
  }

  return result
}

// ---------------------- Get Single -----------------
const getSingleServiceDiscountFromDB = async (serviceDiscountId: string) => {
  if (!serviceDiscountId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Service discount ID is required.',
    )
  }

  const result =
    await ServiceDiscount.findById(serviceDiscountId).populate('serviceId')

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Service discount not found with the provided ID.',
    )
  }

  return result
}

// ---------------------- Delete -----------------
const deleteServiceDiscountFromDB = async (serviceDiscountId: string) => {
  if (!serviceDiscountId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Service discount ID is required for deletion.',
    )
  }

  const deleted = await ServiceDiscount.findByIdAndDelete(serviceDiscountId)

  if (!deleted) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to delete service discount. It may not exist.',
    )
  }

  return deleted
}

// ---------------------- Update -----------------
const updateServiceDiscountIntoDB = async (
  serviceDiscountId: string,
  payload: Partial<IServiceDiscount>,
) => {
  if (!serviceDiscountId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Service discount ID is required for update.',
    )
  }

  const updateData: Record<string, unknown> = { ...payload }

  const result = await ServiceDiscount.findByIdAndUpdate(
    serviceDiscountId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Failed to update service discount. Please check the ID and try again.',
    )
  }

  return result
}

export const ServiceDiscounts = {
  createServiceDiscountIntoDB,
  getAllServiceDiscountFromDB,
  getSingleServiceDiscountFromDB,
  updateServiceDiscountIntoDB,
  deleteServiceDiscountFromDB,
}
