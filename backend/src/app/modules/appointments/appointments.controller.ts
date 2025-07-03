import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AppointmentServices } from './appointments.service'

const createAppointment = catchAsync(async (req, res) => {
  const result = await AppointmentServices.createAppointmentIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment has been created successfully.',
    data: result,
  })
})

const getSingleAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const result =
    await AppointmentServices.getSingleAppointmentFromDB(appointmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment details retrieved successfully.',
    data: result,
  })
})

const getAllAppointment = catchAsync(async (req, res) => {
  const result = await AppointmentServices.getAllAppointmentFromDB()

  // console.log(req.headers);
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All appointments fetched successfully.',
    data: result,
  })
})

const updateSingleAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const { admin } = req.body
  const result = await AppointmentServices.updateAppointmentIntoDB(
    appointmentId,
    admin,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment has been updated successfully.',
    data: result,
  })
})

const deleteSingleAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const result =
    await AppointmentServices.deleteAppointmentFromDB(appointmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment has been deleted successfully.',
    data: result,
  })
})

export const AppointmentControllers = {
  createAppointment,
  getAllAppointment,
  getSingleAppointment,
  updateSingleAppointment,
  deleteSingleAppointment,
}
