import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'

import sendResponse from '../../../shared/sendResponse'

import { HospitalServices } from './hospitalService.service'

interface ISlot {
  doctorId: string;
  serviceId: string;
  date: string;
}

const createHospitalService = catchAsync(async (req, res) => {
  const result = await HospitalServices.createHospitalServiceIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital Service created successfully',
    data: result,
  })
})

const getSingleHospitalService = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const result =
    await HospitalServices.getSingleHospitalServiceFromDB(serviceId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single Hospital Service is retrieved successfully  `,
    data: result,
  })
})

const getSingleHospitalServiceForSlot = catchAsync(async (req, res) => {
  const doctorId = req.query.doctorId as string
  const serviceId = req.query.serviceId as string
  const date = req.query.date as string

  if (!doctorId || !serviceId || !date) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Please provide doctorId, serviceId, and date.',
    })
  }

  const slotData: ISlot = {
    doctorId,
    serviceId,
    date,
  }

  
  // console.log('controller', slotData)

  const result = await HospitalServices.getSingleServiceForSlotFromDB(slotData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Slot retrieved successfully',
    data: result,
  })
})


const getAllHospitalService = catchAsync(async (req, res) => {
  const result = await HospitalServices.getAllHospitalServiceFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Hospital Service are retrieved successfully',
    data: result,
  })
})

const updateSingleHospitalService = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const { admin } = req.body
  const result = await HospitalServices.updateHospitalServiceIntoDB(
    serviceId,
    admin,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Hospital Service is updated successfully',
    data: result,
  })
})

const deleteSingleHospitalService = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const result = await HospitalServices.deleteHospitalServiceFromDB(serviceId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital Service is deleted successfully',
    data: result,
  })
})

export const HospitalServiceControllers = {
  createHospitalService,
  getAllHospitalService,
  getSingleHospitalService,
  deleteSingleHospitalService,
  updateSingleHospitalService,
  getSingleHospitalServiceForSlot,
}
