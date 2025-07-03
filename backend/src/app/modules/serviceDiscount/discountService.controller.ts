import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ServiceDiscounts } from './discountService.service'

const createServiceDiscounts = catchAsync(async (req, res) => {
  const result = await ServiceDiscounts.createServiceDiscountIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital service discount has been successfully created.',
    data: result,
  })
})

const getSingleServiceDiscounts = catchAsync(async (req, res) => {
  const { serviceDiscountId } = req.params
  const result = await ServiceDiscounts.getSingleServiceDiscountFromDB(serviceDiscountId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital service discount details retrieved successfully.',
    data: result,
  })
})

const getAllServiceDiscounts = catchAsync(async (req, res) => {
  const result = await ServiceDiscounts.getAllServiceDiscountFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All hospital service discounts have been retrieved successfully.',
    data: result,
  })
})

const updateSingleServiceDiscounts = catchAsync(async (req, res) => {
  const { serviceDiscountId } = req.params
  const { admin } = req.body
  const result = await ServiceDiscounts.updateServiceDiscountIntoDB(serviceDiscountId, admin)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital service discount has been updated successfully.',
    data: result,
  })
})

const deleteSingleServiceDiscounts = catchAsync(async (req, res) => {
  const { serviceDiscountId } = req.params
  const result = await ServiceDiscounts.deleteServiceDiscountFromDB(serviceDiscountId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital service discount has been deleted successfully.',
    data: result,
  })
})

export const ServiceDiscountsControllers = {
  createServiceDiscounts,
  getAllServiceDiscounts,
  getSingleServiceDiscounts,
  updateSingleServiceDiscounts,
  deleteSingleServiceDiscounts,
}
