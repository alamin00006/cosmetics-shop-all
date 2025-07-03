import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IDoctor } from './doctor.interface'
import httpStatus from 'http-status'
import { DoctorsService } from './doctor.service'
export const createDoctor = catchAsync(async (req, res) => {
  const doctorsData = req.body
  await DoctorsService.createDoctor(doctorsData)

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor created successfully',
  })
})
export const getDoctors = catchAsync(async (req, res) => {
  const doctors = await DoctorsService.getDoctors()

  sendResponse<IDoctor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor created successfully',
    data: doctors,
  })
})

export const DoctorsController = {
  createDoctor,
  getDoctors,
}
